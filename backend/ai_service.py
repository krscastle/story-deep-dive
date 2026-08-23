# backend/ai_service.py - Multi-Provider AI Engine with Focused Calls & Verbatim Grounding
import os
import json
import re
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, Optional, List

import ssl

def _get_ssl_context():
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        pass
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx
    except Exception:
        return ssl._create_unverified_context()

SSL_CONTEXT = _get_ssl_context()

class AIService:
    def __init__(self):
        self.api_key = os.environ.get("AI_API_KEY", os.environ.get("GEMINI_API_KEY", os.environ.get("OPENAI_API_KEY", "")))
        self.provider = os.environ.get("AI_PROVIDER", "gemini").lower()
        self.model_name = os.environ.get("AI_MODEL", "")
        self.base_url = os.environ.get("AI_BASE_URL", "")

    def set_config(self, provider: str, api_key: str, model: str = "", base_url: str = ""):
        self.provider = provider.lower().strip() or "gemini"
        self.api_key = api_key.strip()
        self.model_name = model.strip()
        self.base_url = base_url.strip()

    def get_api_key(self) -> str:
        return self.api_key

    def has_api_key(self) -> bool:
        return bool(self.api_key)

    def auto_detect_provider(self, key: str) -> str:
        key = key.strip()
        if key.startswith("AIzaSy"):
            return "gemini"
        elif key.startswith("sk-ant-"):
            return "anthropic"
        elif key.startswith("gsk_"):
            return "groq"
        elif key.startswith("sk-or-"):
            return "openrouter"
        elif key.startswith("sk-"):
            return "openai"
        return self.provider or "gemini"

    # ─── Raw AI Call ──────────────────────────────────────────────────────────

    def call_ai(self, prompt: str, system: str, client_provider: str, client_key: str, client_model: str, client_base_url: str) -> Optional[Dict[str, Any]]:
        active_key = client_key or self.api_key
        if not active_key:
            return None
        provider = (client_provider or self.auto_detect_provider(active_key)).lower()
        model = client_model or self.model_name

        if provider == "gemini":
            return self._call_gemini(prompt, system, active_key, model)
        elif provider == "anthropic":
            return self._call_anthropic(prompt, system, active_key, model)
        else:
            base_url = client_base_url or self.base_url
            return self._call_openai_compat(prompt, system, active_key, provider, model, base_url)

    def _call_gemini(self, prompt: str, system: str, api_key: str, model: str = "") -> Optional[Dict[str, Any]]:
        models_to_try = [m for m in [model, "gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"] if m]
        for m in models_to_try:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={urllib.parse.quote(api_key)}"
                payload: Dict[str, Any] = {
                    "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                    "generationConfig": {"temperature": 0.1, "maxOutputTokens": 8192, "responseMimeType": "application/json"}
                }
                if system:
                    payload["systemInstruction"] = {"parts": [{"text": system}]}
                req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"})
                with urllib.request.urlopen(req, timeout=55, context=SSL_CONTEXT) as resp:
                    data = json.loads(resp.read().decode())
                    raw = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                    result = self._parse_json(raw)
                    if result:
                        return result
            except urllib.error.HTTPError as e:
                body = e.read().decode("utf-8", errors="ignore")
                print(f"[Gemini HTTPError {e.code} model={m}]: {body[:300]}")
            except Exception as e:
                print(f"[Gemini Error model={m}]: {e}")
        return None

    def _call_openai_compat(self, prompt: str, system: str, api_key: str, provider: str, model: str = "", base_url: str = "") -> Optional[Dict[str, Any]]:
        endpoints = {
            "openai":    ("https://api.openai.com/v1/chat/completions",              model or "gpt-4o-mini"),
            "groq":      ("https://api.groq.com/openai/v1/chat/completions",         model or "llama-3.3-70b-versatile"),
            "deepseek":  ("https://api.deepseek.com/chat/completions",               model or "deepseek-chat"),
            "openrouter":("https://openrouter.ai/api/v1/chat/completions",           model or "openai/gpt-4o-mini"),
            "custom":    (base_url or "https://api.openai.com/v1/chat/completions",  model or "gpt-4o-mini"),
        }
        default_url, default_model = endpoints.get(provider, endpoints["openai"])
        url = base_url if base_url else default_url
        active_model = model or default_model
        try:
            messages = []
            if system:
                messages.append({"role": "system", "content": system})
            messages.append({"role": "user", "content": prompt})
            payload: Dict[str, Any] = {"model": active_model, "messages": messages, "temperature": 0.1, "response_format": {"type": "json_object"}}
            headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}
            if provider == "openrouter":
                headers.update({"HTTP-Referer": "https://storydeepdive.app", "X-Title": "Story Deep Dive"})
            req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers)
            with urllib.request.urlopen(req, timeout=55, context=SSL_CONTEXT) as resp:
                data = json.loads(resp.read().decode())
                raw = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                return self._parse_json(raw)
        except urllib.error.HTTPError as e:
            print(f"[{provider} HTTPError {e.code}]: {e.read().decode('utf-8','ignore')[:300]}")
        except Exception as e:
            print(f"[{provider} Error]: {e}")
        return None

    def _call_anthropic(self, prompt: str, system: str, api_key: str, model: str = "") -> Optional[Dict[str, Any]]:
        try:
            payload = {
                "model": model or "claude-3-5-sonnet-20241022",
                "max_tokens": 6144, "temperature": 0.1,
                "system": (system or "You are an expert literary critic.") + "\nReturn valid JSON only.",
                "messages": [{"role": "user", "content": prompt}]
            }
            headers = {"Content-Type": "application/json", "x-api-key": api_key, "anthropic-version": "2023-06-01"}
            req = urllib.request.Request("https://api.anthropic.com/v1/messages", data=json.dumps(payload).encode(), headers=headers)
            with urllib.request.urlopen(req, timeout=55, context=SSL_CONTEXT) as resp:
                data = json.loads(resp.read().decode())
                raw = "".join(p.get("text","") for p in data.get("content",[]) if p.get("type")=="text")
                return self._parse_json(raw)
        except Exception as e:
            print(f"[Anthropic Error]: {e}")
        return None

    def _parse_json(self, raw: str) -> Optional[Dict[str, Any]]:
        if not raw:
            return None
        clean = re.sub(r"^```(?:json)?\s*", "", raw.strip())
        clean = re.sub(r"\s*```$", "", clean)
        try:
            return json.loads(clean)
        except Exception:
            m = re.search(r'(\{[\s\S]*\})', clean)
            if m:
                try:
                    return json.loads(m.group(1))
                except Exception:
                    pass
        print(f"[JSON parse failed] Raw snippet: {raw[:200]}")
        return None

    # ─── Verbatim Grounding Check ─────────────────────────────────────────────

    def _check_phrase_grounded(self, phrase: str, text: str) -> bool:
        """Return True if phrase is a verbatim substring of text (case-insensitive)."""
        if not phrase or not text:
            return False
        return phrase.lower().strip() in text.lower()

    def _filter_annotations(self, paragraphs: List[Dict], full_text: str) -> List[Dict]:
        """Drop any annotation whose phrase is not found verbatim in the paragraph text."""
        if not full_text:
            return paragraphs
        for para in paragraphs:
            para_text = para.get("text", "")
            good_annotations = []
            for ann in para.get("annotations", []):
                phrase = ann.get("phrase", "")
                if self._check_phrase_grounded(phrase, para_text):
                    good_annotations.append(ann)
                else:
                    print(f"[Grounding FAIL] Phrase not found in paragraph: '{phrase[:60]}'")
            para["annotations"] = good_annotations
        return paragraphs

    # ─── Main Entry Point ─────────────────────────────────────────────────────

    def analyze_lens(self, lens: str, title: str, author: str = "", text: str = "",
                     client_key: str = "", client_provider: str = "", client_model: str = "", client_base_url: str = "") -> Dict[str, Any]:
        safe_title = title or "Uploaded Literary Work"
        safe_author = author or "Unknown Author"
        active_key = client_key or self.api_key

        # Log text length so we can verify document arrived
        text_len = len(text.strip()) if text else 0
        word_count = len(text.split()) if text else 0
        print(f"[Lens={lens}] title={safe_title!r} text_chars={text_len} text_words={word_count} key_present={bool(active_key)} provider={client_provider or self.provider}")

        if active_key:
            result = self._run_lens(lens, safe_title, safe_author, text, client_key, client_provider, client_model, client_base_url)
            if result and isinstance(result, dict) and len(result) > 0:
                return result
            # AI call failed (e.g. network error) — tell the frontend so it can try client-side
            print(f"[Warning] Lens '{lens}' AI call returned no usable data. Returning fallback marker so client can retry.")
            fallback = self._synthesize_local_lens(lens, safe_title, safe_author, text)
            fallback["_is_fallback"] = True
            return fallback

        # No key at all — return pure fallback
        fallback = self._synthesize_local_lens(lens, safe_title, safe_author, text)
        fallback["_is_fallback"] = True
        return fallback

    def _run_lens(self, lens: str, title: str, author: str, text: str,
                  client_key: str, client_provider: str, client_model: str, client_base_url: str) -> Optional[Dict[str, Any]]:
        """Dispatch to focused, single-purpose AI calls per lens."""
        kwargs = dict(client_provider=client_provider, client_key=client_key, client_model=client_model, client_base_url=client_base_url)

        if lens == "summary":
            return self._call_summary(title, author, text, **kwargs)
        elif lens == "annotations":
            return self._call_annotations(title, author, text, **kwargs)
        elif lens == "vocabulary":
            return self._call_vocabulary(title, author, text, **kwargs)
        elif lens == "storymap":
            return self._call_storymap(title, author, text, **kwargs)
        elif lens == "deepdive":
            return self._call_deepdive(title, author, text, **kwargs)
        elif lens == "studyprep":
            return self._call_studyprep(title, author, text, **kwargs)
        return None

    # ─── Focused Single-Purpose Lens Callers ──────────────────────────────────

    def _text_block(self, text: str) -> str:
        """Return the story text section for injection into prompts. Truncated to 100k chars."""
        text = text.strip() if text else ""
        if len(text) < 30:
            return ""
        return f"\n\nSTORY TEXT (read carefully before responding):\n---\n{text[:100000]}\n---\n"

    def _system(self) -> str:
        return (
            "You are a university-level literary critic. "
            "Analyse ONLY the specific story provided. "
            "Use real character names, real plot events, real quotes from the text. "
            "Return ONLY raw valid JSON. No markdown fences, no preamble, no commentary."
        )

    def _call_summary(self, title, author, text, **kwargs) -> Optional[Dict]:
        tb = self._text_block(text)
        word_count = len(text.split()) if text.strip() else 3000
        read_min = max(1, round(word_count / 220))
        prompt = (
            f"Analyse \"{title}\" by \"{author}\".{tb}\n\n"
            "Return this exact JSON structure, filled with analysis specific to THIS story:\n"
            "{\n"
            f'  "id": "{title.lower().replace(" ","-")}",\n'
            f'  "title": "{title}",\n'
            f'  "author": "{author}",\n'
            '  "publicationYear": "<year as string>",\n'
            '  "genre": "<specific genre classification>",\n'
            '  "setting": "<specific time period and place>",\n'
            '  "pov": "<specific narrative POV>",\n'
            '  "conflictType": "<specific conflict type>",\n'
            f'  "wordCount": {word_count},\n'
            f'  "estimatedReadTime": "{read_min} min",\n'
            '  "tone": ["<adj1>", "<adj2>", "<adj3>", "<adj4>"],\n'
            '  "summary": {\n'
            '    "beginning": "<2-4 sentences describing who/what/where at the story\'s opening, using character names and specific events>",\n'
            '    "middle": "<2-4 sentences describing the escalating conflict and turning points specific to this story>",\n'
            '    "end": "<2-4 sentences describing the specific climax and resolution of this story>"\n'
            '  },\n'
            '  "historicalContext": {\n'
            '    "authorBio": "<2-3 sentences of biographical context relevant to this work>",\n'
            '    "literaryMovement": "<name and description of the movement this work belongs to>",\n'
            '    "historicalEra": "<sociopolitical context of when this was written or set>"\n'
            '  },\n'
            '  "compareAndConnect": [\n'
            '    {"title": "<title of a related literary work>", "type": "Literary Parallel", "connection": "<2 sentences explaining the thematic or structural link>"},\n'
            '    {"title": "<title of a film/show>", "type": "Modern Media", "connection": "<2 sentences explaining the connection>"},\n'
            '    {"title": "<name of archetype or myth>", "type": "Universal Archetype", "connection": "<2 sentences explaining the archetypal link>"}\n'
            '  ]\n'
            '}'
        )
        return self.call_ai(prompt, self._system(), **kwargs)

    def _call_annotations(self, title, author, text, **kwargs) -> Optional[Dict]:
        """Split annotations into one call per category to keep each call focused."""
        tb = self._text_block(text)
        has_text = len(text.strip()) > 30

        if has_text:
            # Single focused call: segment the actual text into paragraphs and annotate
            prompt = (
                f"The following is the complete text of \"{title}\" by \"{author}\".{tb}\n\n"
                "Task: Divide the text above into 6 to 10 meaningful paragraphs. "
                "For EACH paragraph write 1 to 2 annotations. "
                "RULES:\n"
                "- The 'text' field must contain the EXACT paragraph text as it appears above.\n"
                "- The 'phrase' field must be a VERBATIM SUBSTRING copied from that same paragraph's text (not paraphrased).\n"
                "- Distribute categories across paragraphs: plot, characters, setting-world, meaning-theme, literary-devices.\n"
                "- The 'note' field must explain the literary significance specific to this story, not general theory.\n\n"
                "Return this exact JSON with no other text:\n"
                '{"paragraphs": [\n'
                '  {"id": "p1", "number": 1, "text": "<exact paragraph text>", "annotations": [\n'
                '    {"category": "<one of: plot|characters|setting-world|meaning-theme|literary-devices>",\n'
                '     "phrase": "<verbatim substring of the paragraph text>",\n'
                '     "note": "<specific literary analysis of this phrase in this story>",\n'
                '     "device": "<name of literary device>"}\n'
                '  ]}\n'
                ']}'
            )
        else:
            # No uploaded text: produce representative paragraphs from known text
            prompt = (
                f"Produce 5 representative sequential paragraphs from \"{title}\" by \"{author}\", "
                "using the actual text of the work.\n"
                "For each paragraph write 1 to 2 annotations.\n"
                "RULES:\n"
                "- 'text' must be actual quoted text from the work.\n"
                "- 'phrase' must be a VERBATIM SUBSTRING copied from that paragraph's 'text' field.\n"
                "- 'note' must be specific to this story's plot, characters, and themes.\n\n"
                "Return this exact JSON:\n"
                '{"paragraphs": [\n'
                '  {"id": "p1", "number": 1, "text": "<real paragraph text>", "annotations": [\n'
                '    {"category": "<plot|characters|setting-world|meaning-theme|literary-devices>",\n'
                '     "phrase": "<verbatim substring of paragraph text>",\n'
                '     "note": "<specific analysis>",\n'
                '     "device": "<device name>"}\n'
                '  ]}\n'
                ']}'
            )

        result = self.call_ai(prompt, self._system(), **kwargs)
        if result and "paragraphs" in result:
            # Verbatim grounding check: drop any phrase not found in its paragraph
            result["paragraphs"] = self._filter_annotations(result["paragraphs"], text)
            return result
        return None

    def _call_vocabulary(self, title, author, text, **kwargs) -> Optional[Dict]:
        tb = self._text_block(text)
        has_text = len(text.strip()) > 30
        source_instruction = (
            "The 'sentence' field must be the ACTUAL SENTENCE from the story text above where this word appears, "
            "with the word wrapped in **double asterisks**."
            if has_text else
            "The 'sentence' field must be an actual sentence from the published text of this work, with the word in **double asterisks**."
        )
        prompt = (
            f"Extract 15 to 20 high-value vocabulary words from \"{title}\" by \"{author}\".{tb}\n\n"
            "Only include words that genuinely appear in or are central to this specific text.\n"
            f"{source_instruction}\n\n"
            "Return this exact JSON:\n"
            '{"vocabulary": [\n'
            '  {"word": "<word>",\n'
            '   "pos": "<noun|verb|adjective|adverb>",\n'
            '   "definition": "<clear definition>",\n'
            '   "sentence": "<actual story sentence with **word** bolded>",\n'
            '   "connotation": "<positive|negative|neutral + brief note>",\n'
            '   "etymology": "<Latin/Greek/etc root>"}\n'
            ']}'
        )
        return self.call_ai(prompt, self._system(), **kwargs)

    def _call_storymap(self, title, author, text, **kwargs) -> Optional[Dict]:
        tb = self._text_block(text)
        prompt = (
            f"Map the narrative of \"{title}\" by \"{author}\" onto Freytag's Pyramid.{tb}\n\n"
            "Produce exactly 6 nodes. For each node:\n"
            "- 'stage' must be one of: Exposition, Inciting Incident, Rising Action, Climax, Falling Action, Resolution\n"
            "- 'title': a short evocative phrase naming this specific story moment (not a generic label)\n"
            "- 'tension': integer 0-100 representing narrative tension at this stage\n"
            "- 'summary': 2-3 sentences describing what SPECIFICALLY happens in this story at this stage\n"
            "- 'quote': a SHORT actual line from the story that best represents this stage\n"
            "- 'analysis': 1-2 sentences of literary analysis specific to this story\n\n"
            "Return this exact JSON:\n"
            '{"storyMap": [\n'
            '  {"id": "node-1", "stage": "Exposition", "title": "<specific stage title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p1",\n'
            '   "analysis": "<specific analysis>"},\n'
            '  {"id": "node-2", "stage": "Inciting Incident", "title": "<specific title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p2", "analysis": "<specific analysis>"},\n'
            '  {"id": "node-3", "stage": "Rising Action", "title": "<specific title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p3", "analysis": "<specific analysis>"},\n'
            '  {"id": "node-4", "stage": "Climax", "title": "<specific title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p4", "analysis": "<specific analysis>"},\n'
            '  {"id": "node-5", "stage": "Falling Action", "title": "<specific title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p5", "analysis": "<specific analysis>"},\n'
            '  {"id": "node-6", "stage": "Resolution", "title": "<specific title>",\n'
            '   "tension": <int>, "summary": "<specific summary>",\n'
            '   "quote": "<actual quote>", "quoteLocation": "p6", "analysis": "<specific analysis>"}\n'
            ']}'
        )
        return self.call_ai(prompt, self._system(), **kwargs)

    def _call_deepdive(self, title, author, text, **kwargs) -> Optional[Dict]:
        """
        FIX: Split into 5 separate focused calls (one per pillar) instead of one massive call.
        This keeps each call single-purpose and produces much more specific output.
        """
        tb = self._text_block(text)
        pillars = [
            ("plot-conflict",  "Plot & Core Conflict",    "plot structure, narrative engine, internal and external conflicts, pacing, and how the climax resolves the central tension"),
            ("characters",     "Characters & Psychology", "specific character names, their motivations, relationships, psychological arcs, foils, and how they change across the story"),
            ("setting-pov",    "Setting & Point of View", "the specific time/place setting, its symbolic significance, and how the narrative POV shapes what the reader knows and feels"),
            ("themes-symbols", "Themes & Symbols",        "the central themes, recurring motifs, symbolic objects and images specific to this story, and their philosophical meaning"),
            ("devices-style",  "Literary Devices & Style","the author's specific diction choices, sentence rhythms, use of irony, metaphor, imagery, and other craft techniques"),
        ]

        deep_dive: Dict[str, Any] = {}
        for pillar_id, pillar_title, pillar_focus in pillars:
            prompt = (
                f"Analyse \"{title}\" by \"{author}\" — FOCUS ONLY ON: {pillar_focus}.{tb}\n\n"
                "Write analysis grounded in specific scenes, character names, and quoted lines from this story.\n\n"
                f"Return this exact JSON (for the '{pillar_id}' pillar only):\n"
                "{\n"
                f'  "{pillar_id}": {{\n'
                f'    "id": "{pillar_id}",\n'
                f'    "title": "{pillar_title}",\n'
                '    "subtitle": "<a specific phrase that names the central dynamic of this pillar in this story>",\n'
                '    "summary": "<3-5 sentences of specific analysis grounded in this story>",\n'
                '    "keyPoints": [\n'
                '      "**<Specific header>:** <2-3 sentences of analysis referencing specific story events>",\n'
                '      "**<Specific header>:** <2-3 sentences of analysis>",\n'
                '      "**<Specific header>:** <2-3 sentences of analysis>"\n'
                '    ],\n'
                '    "pullQuotes": [\n'
                '      {"quote": "<a short actual quote from the story>", "significance": "<why this line matters literarily>"}\n'
                '    ]\n'
                '  }\n'
                '}'
            )
            result = self.call_ai(prompt, self._system(), **kwargs)
            if result and pillar_id in result:
                deep_dive[pillar_id] = result[pillar_id]
            else:
                print(f"[DeepDive] Pillar '{pillar_id}' returned no data.")

        return {"deepDive": deep_dive} if deep_dive else None

    def _call_studyprep(self, title, author, text, **kwargs) -> Optional[Dict]:
        """Split into two focused calls: essay+discussion, then quiz."""
        tb = self._text_block(text)

        # Call 1: Essay angles + critical thinking
        prompt_essays = (
            f"For \"{title}\" by \"{author}\":{tb}\n\n"
            "Write 3 AP-level essay prompts and 3 Socratic discussion questions grounded in the specific events and themes of this story.\n\n"
            "For each thesis template, use [square brackets] for student fill-in slots.\n\n"
            "Return this exact JSON:\n"
            '{"essayAngles": [\n'
            '  {"prompt": "<specific essay question about this story>",\n'
            '   "thesisTemplate": "<template with [bracketed] slots, citing specific elements of this story>"},\n'
            '  {"prompt": "<second specific essay question>",\n'
            '   "thesisTemplate": "<second template>"},\n'
            '  {"prompt": "<third specific essay question>",\n'
            '   "thesisTemplate": "<third template>"}\n'
            '],\n'
            '"criticalThinking": [\n'
            '  {"question": "<specific Socratic question about a character decision or theme in this story>",\n'
            '   "answer": "<3-5 sentence model answer referencing specific events>"},\n'
            '  {"question": "<second question>", "answer": "<second model answer>"},\n'
            '  {"question": "<third question>", "answer": "<third model answer>"}\n'
            ']}'
        )

        # Call 2: Quiz
        prompt_quiz = (
            f"For \"{title}\" by \"{author}\":{tb}\n\n"
            "Write exactly 5 multiple-choice questions testing specific knowledge of this story's plot, characters, themes, and literary devices.\n"
            "Each question must have 4 options. Only one is correct. correctIndex is 0-based.\n\n"
            "Return this exact JSON:\n"
            '{"quiz": [\n'
            '  {"id": "q1", "question": "<specific question about this story>",\n'
            '   "options": ["<option 0>", "<option 1>", "<option 2>", "<option 3>"],\n'
            '   "correctIndex": <0-3>,\n'
            '   "explanation": "<why the correct answer is right, citing the story>"},\n'
            '  {"id": "q2", "question": "<question>", "options": ["<o0>","<o1>","<o2>","<o3>"], "correctIndex": <int>, "explanation": "<explanation>"},\n'
            '  {"id": "q3", "question": "<question>", "options": ["<o0>","<o1>","<o2>","<o3>"], "correctIndex": <int>, "explanation": "<explanation>"},\n'
            '  {"id": "q4", "question": "<question>", "options": ["<o0>","<o1>","<o2>","<o3>"], "correctIndex": <int>, "explanation": "<explanation>"},\n'
            '  {"id": "q5", "question": "<question>", "options": ["<o0>","<o1>","<o2>","<o3>"], "correctIndex": <int>, "explanation": "<explanation>"}\n'
            ']}'
        )

        essays_result = self.call_ai(prompt_essays, self._system(), **kwargs)
        quiz_result = self.call_ai(prompt_quiz, self._system(), **kwargs)

        study_prep: Dict[str, Any] = {}
        if essays_result:
            if "essayAngles" in essays_result:
                study_prep["essayAngles"] = essays_result["essayAngles"]
            if "criticalThinking" in essays_result:
                study_prep["criticalThinking"] = essays_result["criticalThinking"]
        if quiz_result and "quiz" in quiz_result:
            study_prep["quiz"] = quiz_result["quiz"]

        return {"studyPrep": study_prep} if study_prep else None

    # ─── Local Synthesizer Fallback ───────────────────────────────────────────

    def _synthesize_local_lens(self, lens: str, title: str, author: str, raw_text: str) -> Dict[str, Any]:
        words = raw_text.split() if raw_text else []
        count = len(words) if words else 2100
        read_time = f"{max(1, round(count / 220))} min"

        if lens == "summary":
            return {
                "id": re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-"),
                "title": title, "author": author,
                "publicationYear": "Unknown",
                "genre": "Literary Fiction",
                "setting": "Setting not determined — add an API key for full analysis",
                "pov": "Unknown",
                "conflictType": "Unknown — add an API key for full analysis",
                "wordCount": count, "estimatedReadTime": read_time,
                "tone": ["Analytical", "Scholarly", "Evocative", "Precise"],
                "summary": {
                    "beginning": f"Add an API key in AI Settings to generate a specific summary of \"{title}\" by {author}.",
                    "middle": "Without an API key, only static preset analyses are available.",
                    "end": "Configure your API key to unlock live AI-generated analysis for any work."
                },
                "historicalContext": {
                    "authorBio": f"Configure an API key to generate biographical context for {author}.",
                    "literaryMovement": "API key required.",
                    "historicalEra": "API key required."
                },
                "compareAndConnect": [
                    {"title": "API key required", "type": "Literary Parallel", "connection": "Add an API key in AI Settings to generate comparisons."},
                    {"title": "API key required", "type": "Modern Media", "connection": "Add an API key in AI Settings to generate comparisons."},
                    {"title": "API key required", "type": "Universal Archetype", "connection": "Add an API key in AI Settings to generate comparisons."}
                ]
            }

        if lens == "annotations":
            if raw_text and raw_text.strip():
                paras = [p.strip() for p in raw_text.split("\n\n") if p.strip()]
                paragraphs = []
                cats = ["plot", "characters", "setting-world", "meaning-theme", "literary-devices"]
                for idx, p in enumerate(paras[:12]):
                    sentences = re.split(r'(?<=[.!?])\s+', p)
                    phrase = sentences[0].strip() if sentences else p[:60]
                    phrase = phrase[:80]
                    paragraphs.append({
                        "id": f"p{idx+1}", "number": idx+1, "text": p,
                        "annotations": [{"category": cats[idx % 5], "phrase": phrase,
                                         "note": f"[Add an API key to generate specific annotations for this passage]",
                                         "device": "Narrative Element"}]
                    })
                return {"paragraphs": paragraphs}
            return {"paragraphs": [{"id": "p1", "number": 1,
                                    "text": f"Paste or upload the text of \"{title}\" and add an API key to generate line-by-line annotations.",
                                    "annotations": [{"category": "plot", "phrase": f"Paste or upload the text",
                                                     "note": "Upload the story text and configure an API key to unlock live annotations.",
                                                     "device": "Instruction"}]}]}

        if lens == "vocabulary":
            return {"vocabulary": [
                {"word": "API key required", "pos": "—",
                 "definition": f"Add an API key in AI Settings to extract vocabulary specific to \"{title}\".",
                 "sentence": "Navigate to AI Settings and enter your API key to unlock this feature.",
                 "connotation": "—", "etymology": "—"}
            ]}

        if lens == "storymap":
            stages = ["Exposition","Inciting Incident","Rising Action","Climax","Falling Action","Resolution"]
            tensions = [20,45,75,100,60,30]
            return {"storyMap": [
                {"id": f"node-{i+1}", "stage": s, "title": f"{s} — API key required",
                 "tension": tensions[i],
                 "summary": f"Add an API key to generate a specific story map for \"{title}\".",
                 "quote": "API key required", "quoteLocation": f"p{i+1}",
                 "analysis": "Configure an API key in AI Settings for live analysis."}
                for i, s in enumerate(stages)
            ]}

        if lens == "deepdive":
            pillars = ["plot-conflict","characters","setting-pov","themes-symbols","devices-style"]
            titles = ["Plot & Core Conflict","Characters & Psychology","Setting & Point of View","Themes & Symbols","Literary Devices & Style"]
            return {"deepDive": {
                pid: {"id": pid, "title": pt, "subtitle": "API key required",
                      "summary": f"Add an API key in AI Settings to generate deep-dive analysis of \"{title}\".",
                      "keyPoints": ["**API key required:** Configure your key to unlock this pillar."],
                      "pullQuotes": [{"quote": "—", "significance": "API key required."}]}
                for pid, pt in zip(pillars, titles)
            }}

        if lens == "studyprep":
            return {"studyPrep": {
                "essayAngles": [
                    {"prompt": f"Add an API key to generate essay prompts for \"{title}\".",
                     "thesisTemplate": "In [title], [author] uses [device] to argue that [claim]."}
                ],
                "criticalThinking": [
                    {"question": f"Add an API key to generate discussion questions for \"{title}\".",
                     "answer": "Configure your API key in AI Settings to unlock this feature."}
                ],
                "quiz": [
                    {"id": "q1", "question": f"Add an API key to generate quiz questions for \"{title}\".",
                     "options": ["Option A","Option B","Option C","Option D"],
                     "correctIndex": 0,
                     "explanation": "Configure your API key in AI Settings."}
                ]
            }}

        return {}

ai_service = AIService()
