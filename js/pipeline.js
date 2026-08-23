// pipeline.js - Multi-Provider AI Pipeline, Document OCR, and Python Backend Connector
import { PRESET_WORKS } from '../data/preset_works.js';

export class AnalysisPipeline {
  constructor() {
    this.apiKey = localStorage.getItem('story_deep_dive_api_key') || localStorage.getItem('story_deep_dive_gemini_api_key') || '';
    this.provider = localStorage.getItem('story_deep_dive_provider') || 'gemini';
    this.model = localStorage.getItem('story_deep_dive_model') || '';
    this.baseUrl = localStorage.getItem('story_deep_dive_base_url') || '';

    this.backendUrl = 'http://localhost:8000';
    this.isBackendOnline = false;
    this.backendDetails = null;

    this.checkBackendStatus();
  }

  setConfig(provider, apiKey, model = '', baseUrl = '') {
    this.provider = provider.trim() || 'gemini';
    this.apiKey = apiKey.trim();
    this.model = model.trim();
    this.baseUrl = baseUrl.trim();

    localStorage.setItem('story_deep_dive_provider', this.provider);
    localStorage.setItem('story_deep_dive_api_key', this.apiKey);
    localStorage.setItem('story_deep_dive_gemini_api_key', this.apiKey);
    localStorage.setItem('story_deep_dive_model', this.model);
    localStorage.setItem('story_deep_dive_base_url', this.baseUrl);
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem('story_deep_dive_api_key', this.apiKey);
      localStorage.setItem('story_deep_dive_gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('story_deep_dive_api_key');
      localStorage.removeItem('story_deep_dive_gemini_api_key');
    }
  }

  getApiKey() {
    return this.apiKey;
  }

  getConfig() {
    return {
      provider: this.provider,
      apiKey: this.apiKey,
      model: this.model,
      baseUrl: this.baseUrl
    };
  }

  async checkBackendStatus() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const resp = await fetch(`${this.backendUrl}/api/status`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (resp.ok) {
        this.backendDetails = await resp.json();
        this.isBackendOnline = true;
        this.updateBackendBadge(true);
        return true;
      }
    } catch (e) {
      this.isBackendOnline = false;
    }
    this.updateBackendBadge(false);
    return false;
  }

  updateBackendBadge(isOnline) {
    const badge = document.getElementById('backend-status-badge');
    if (badge) {
      if (isOnline) {
        badge.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
          <span class="text-emerald-400 font-mono text-[10px] font-bold">Python AI Backend Connected</span>
        `;
        badge.classList.remove('bg-slate-900', 'border-slate-800');
        badge.classList.add('bg-emerald-950/50', 'border-emerald-800/80');
      } else {
        const hasKey = Boolean(this.apiKey);
        badge.innerHTML = `
          <span class="w-2 h-2 rounded-full ${hasKey ? 'bg-indigo-400' : 'bg-slate-400'} inline-block"></span>
          <span class="text-slate-300 font-mono text-[10px]">${hasKey ? 'Browser AI Active (' + this.provider.toUpperCase() + ')' : 'Client Synthesizer Active'}</span>
        `;
        badge.classList.remove('bg-emerald-950/50', 'border-emerald-800/80');
        badge.classList.add('bg-slate-900', 'border-slate-800');
      }
    }
  }

  async extractTextFromFile(file, onProgress) {
    const name = file.name.toLowerCase();
    const type = file.type;

    if (name.endsWith('.pdf') || type === 'application/pdf') {
      return await this.extractTextFromPdf(file, onProgress);
    } else if (name.match(/\.(png|jpe?g|webp|bmp|gif)$/i) || type.startsWith('image/')) {
      return await this.extractTextFromImage(file, onProgress);
    } else {
      return await this.extractTextFromTxt(file);
    }
  }

  async extractTextFromPdf(file, onProgress) {
    if (!window.pdfjsLib) {
      throw new Error('PDF.js is not loaded.');
    }
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      if (onProgress) {
        onProgress(`Processing PDF page ${pageNum} of ${pdf.numPages}...`);
      }
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items.map(item => item.str);
      const pageText = pageItems.join(' ').trim();
      
      if (pageText) {
        fullText += pageText + '\n\n';
      }
    }

    if (!fullText.trim() && window.Tesseract) {
      if (onProgress) onProgress('Scanned PDF detected. Performing OCR...');
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport: viewport }).promise;
      
      const { data: { text } } = await window.Tesseract.recognize(canvas, 'eng');
      fullText = text;
    }

    return fullText.trim();
  }

  async extractTextFromImage(file, onProgress) {
    if (window.Tesseract) {
      if (onProgress) onProgress('Performing Vision OCR on image...');
      const result = await window.Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(`Vision OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      });
      return result.data.text.trim();
    } else {
      return `[Text extracted from image: ${file.name}]`;
    }
  }

  async extractTextFromTxt(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  /**
   * Call Python backend for lens analysis.
   * Returns null if the backend returned a fallback/synthesized result
   * so the client-side AI path gets a chance to run.
   */
  async callBackendForLens(lens, title, author, text) {
    try {
      const resp = await fetch(`${this.backendUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          title,
          author,
          text,
          lens,
          apiKey: this.apiKey,
          provider: this.provider,
          model: this.model,
          baseUrl: this.baseUrl
        })
      });

      if (resp.ok) {
        const json = await resp.json();
        // If the backend flagged this as a synthesizer fallback (e.g. SSL/network error
        // stopped the real AI call), discard it and let the client-side AI path run.
        if (json && json._is_fallback) {
          console.warn(`[Pipeline] Backend returned fallback for lens=${lens} — trying client-side AI.`);
          return null;
        }
        if (json && typeof json === 'object' && Object.keys(json).length > 0) {
          return json;
        }
      }
    } catch (e) {
      console.warn('Backend call failed, trying client AI caller:', e);
    }
    return null;
  }

  /**
   * Direct Client-Side AI call — mirrors backend focused approach.
   * deepdive splits into 5 separate focused calls; studyprep into 2.
   */
  async callClientSideAI(lens, title, author, text) {
    if (!this.apiKey) return null;

    // DEBUG: log exactly what text length is going out
    const textLen = text ? text.trim().length : 0;
    const wordCount = text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    console.log(`[Pipeline] callClientSideAI lens=${lens} title="${title}" textChars=${textLen} textWords=${wordCount} provider=${this.provider}`);

    if (lens === 'deepdive') {
      return await this._callDeepDiveMulti(title, author, text);
    }
    if (lens === 'studyprep') {
      return await this._callStudyPrepMulti(title, author, text);
    }

    const prompt = this._buildFocusedPrompt(lens, title, author, text);
    if (!prompt) return null;
    const raw = await this._callRawAI(prompt);
    if (!raw) return null;
    const parsed = this.parseCleanJson(raw);
    if (parsed && lens === 'annotations' && parsed.paragraphs && text) {
      parsed.paragraphs = this._filterGroundedAnnotations(parsed.paragraphs, text);
    }
    if (parsed && lens === 'vocabulary' && Array.isArray(parsed.vocabulary) && text && text.trim().length > 30) {
      parsed.vocabulary = this._filterGroundedVocabulary(parsed.vocabulary, text);
      if (parsed.vocabulary.length === 0) {
        console.warn('[Vocabulary] All words failed grounding check against the actual text — discarding response.');
        return null;
      }
    }
    return parsed;
  }

  /** Drop any vocabulary entry whose word doesn't actually appear in the story text —
   *  otherwise the model can drift toward generic "sounds sophisticated" words instead
   *  of words genuinely drawn from this specific story. */
  _filterGroundedVocabulary(vocabList, fullText) {
    const lowerText = fullText.toLowerCase();
    return vocabList.filter(v => {
      if (!v || !v.word) return false;
      const escaped = v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b${escaped}\\b`, 'i');
      const found = re.test(fullText) || lowerText.includes(v.word.toLowerCase());
      if (!found) console.warn(`[Vocabulary] Dropping ungrounded word: '${v.word}'`);
      return found;
    });
  }

  /** Make one AI call and return the raw text response */
  async _callRawAI(prompt) {
    const system = "You are a university-level literary critic. Analyse ONLY the specific story provided. Use real character names, real plot events, real quotes from the text. Return ONLY raw valid JSON. No markdown fences, no preamble.";
    const provider = this.provider.toLowerCase();

    try {
      if (provider === 'gemini') {
        const model = this.model || 'gemini-3.5-flash-lite';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(this.apiKey)}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: system }] },
            generationConfig: { temperature: 0.1, maxOutputTokens: 8192, responseMimeType: 'application/json' }
          })
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          console.error('[Gemini Error]', resp.status, JSON.stringify(err).substring(0, 300));
          return null;
        }
        const data = await resp.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;

      } else if (['openai', 'groq', 'deepseek', 'openrouter', 'custom', 'anthropic'].includes(provider)) {
        const endpointMap = {
          'openai':     ['https://api.openai.com/v1/chat/completions',              this.model || 'gpt-4o-mini'],
          'groq':       ['https://api.groq.com/openai/v1/chat/completions',         this.model || 'llama-3.3-70b-versatile'],
          'deepseek':   ['https://api.deepseek.com/chat/completions',               this.model || 'deepseek-chat'],
          'openrouter': ['https://openrouter.ai/api/v1/chat/completions',           this.model || 'openai/gpt-4o-mini'],
          'custom':     [this.baseUrl || 'https://api.openai.com/v1/chat/completions', this.model || 'gpt-4o-mini'],
        };
        const [defaultUrl, defaultModel] = endpointMap[provider] || endpointMap['openai'];
        const url = this.baseUrl || defaultUrl;
        const activeModel = this.model || defaultModel;
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` };
        if (provider === 'openrouter') { headers['HTTP-Referer'] = 'https://storydeepdive.app'; headers['X-Title'] = 'Story Deep Dive'; }

        const resp = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: activeModel,
            messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          console.error(`[${provider} Error]`, resp.status, JSON.stringify(err).substring(0, 300));
          return null;
        }
        const data = await resp.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (err) {
      console.error(`[Client AI Error provider=${provider}]:`, err);
    }
    return null;
  }

  /** Build a focused single-purpose prompt — schema hints are structural only, NO example content */
  _buildFocusedPrompt(lens, title, author, text) {
    const hasText = text && text.trim().length > 30;
    const textBlock = hasText
      ? `\n\nSTORY TEXT (read carefully before responding):\n---\n${text.substring(0, 100000)}\n---\n`
      : '';
    const wordCount = hasText ? text.trim().split(/\s+/).filter(Boolean).length : 3000;
    const readMin = Math.max(1, Math.round(wordCount / 220));
    const idSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (lens === 'summary') {
      return (
        `Analyse "${title}" by "${author}".${textBlock}\n` +
        `Return this exact JSON structure filled with analysis SPECIFIC to this story:\n` +
        `{"id":"${idSlug}","title":"${title}","author":"${author}",` +
        `"publicationYear":"<year>","genre":"<specific genre>","setting":"<specific time and place>",` +
        `"pov":"<specific POV>","conflictType":"<specific conflict>",` +
        `"wordCount":${wordCount},"estimatedReadTime":"${readMin} min",` +
        `"tone":["<adj1>","<adj2>","<adj3>","<adj4>"],` +
        `"summary":{"beginning":"<2-4 sentences about the actual opening — character names, specific situation>","middle":"<2-4 sentences about the specific escalating conflict and turning points>","end":"<2-4 sentences about the specific climax and resolution>"},` +
        `"historicalContext":{"authorBio":"<2-3 sentences of biographical context relevant to this work>","literaryMovement":"<movement name and how this work fits it>","historicalEra":"<sociopolitical context>"},` +
        `"compareAndConnect":[{"title":"<related literary work>","type":"Literary Parallel","connection":"<2 sentences of specific thematic link>"},{"title":"<film or show>","type":"Modern Media","connection":"<2 sentences of specific connection>"},{"title":"<archetype or myth>","type":"Universal Archetype","connection":"<2 sentences of specific archetypal link>"}]}`
      );
    }

    if (lens === 'annotations') {
      if (hasText) {
        return (
          `The following is the complete text of "${title}" by "${author}".${textBlock}\n` +
          `Task: Divide the text above into 6 to 10 meaningful paragraphs. For EACH paragraph write 1 to 2 annotations.\n` +
          `STRICT RULES:\n` +
          `- "text" must be the EXACT paragraph text as it appears above.\n` +
          `- "phrase" must be a VERBATIM SUBSTRING copied from that paragraph's "text" field — character-for-character.\n` +
          `- Distribute categories across paragraphs: plot, characters, setting-world, meaning-theme, literary-devices.\n` +
          `- "note" must explain the literary significance specific to this story — not generic theory.\n\n` +
          `Return this exact JSON:\n` +
          `{"paragraphs":[{"id":"p1","number":1,"text":"<exact paragraph text>","annotations":[{"category":"<plot|characters|setting-world|meaning-theme|literary-devices>","phrase":"<verbatim substring of text>","note":"<specific literary analysis>","device":"<device name>"}]}]}`
        );
      }
      return (
        `Produce 5 representative sequential paragraphs from "${title}" by "${author}" using actual text from the published work.\n` +
        `For each paragraph write 1 to 2 annotations.\n` +
        `STRICT RULES:\n` +
        `- "text" must be real quoted text from the published work.\n` +
        `- "phrase" must be a VERBATIM SUBSTRING of that paragraph's "text" field.\n` +
        `- "note" must be specific to this story's events, characters, and themes.\n\n` +
        `Return this exact JSON:\n` +
        `{"paragraphs":[{"id":"p1","number":1,"text":"<real paragraph text>","annotations":[{"category":"<plot|characters|setting-world|meaning-theme|literary-devices>","phrase":"<verbatim substring>","note":"<specific analysis>","device":"<device name>"}]}]}`
      );
    }

    if (lens === 'vocabulary') {
      const srcRule = hasText
        ? `"sentence" must be the ACTUAL SENTENCE from the story text above where this word appears, with the word in **double asterisks**.`
        : `"sentence" must be an actual published sentence from this work, with the word in **double asterisks**.`;
      return (
        `Extract 15 to 20 high-value vocabulary words from "${title}" by "${author}".${textBlock}\n` +
        `Only include words that genuinely appear in or are central to this specific text.\n` +
        `${srcRule}\n\n` +
        `Return this exact JSON:\n` +
        `{"vocabulary":[{"word":"<word>","pos":"<noun|verb|adjective|adverb>","definition":"<clear definition>","sentence":"<actual story sentence with **word** bolded>","connotation":"<positive|negative|neutral + brief note>","etymology":"<root origin>"}]}`
      );
    }

    if (lens === 'storymap') {
      return (
        `Map the narrative of "${title}" by "${author}" onto Freytag's Pyramid.${textBlock}\n` +
        `Produce exactly 6 nodes. For each:\n` +
        `- "title": a short evocative phrase naming THIS specific story moment (not a generic label)\n` +
        `- "tension": integer 0-100\n` +
        `- "summary": 2-3 sentences describing what SPECIFICALLY happens in this story at this stage\n` +
        `- "quote": a short actual line from the story representing this stage\n` +
        `- "analysis": 1-2 sentences of literary analysis specific to this story\n\n` +
        `Return this exact JSON:\n` +
        `{"storyMap":[` +
        `{"id":"node-1","stage":"Exposition","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p1","analysis":"<specific analysis>"},` +
        `{"id":"node-2","stage":"Inciting Incident","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p2","analysis":"<specific analysis>"},` +
        `{"id":"node-3","stage":"Rising Action","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p3","analysis":"<specific analysis>"},` +
        `{"id":"node-4","stage":"Climax","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p4","analysis":"<specific analysis>"},` +
        `{"id":"node-5","stage":"Falling Action","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p5","analysis":"<specific analysis>"},` +
        `{"id":"node-6","stage":"Resolution","title":"<specific title>","tension":<int>,"summary":"<specific summary>","quote":"<actual quote>","quoteLocation":"p6","analysis":"<specific analysis>"}]}`
      );
    }

    return null; // deepdive and studyprep use multi-call methods
  }

  /** deepdive: 5 separate focused calls — one per pillar */
  /** Pull a pillar's data out of a parsed response even if the model didn't
   *  nest it under the exact expected key (e.g. used an underscore, or
   *  returned the fields unwrapped at the top level). */
  _extractPillarData(parsed, pillarId) {
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed[pillarId]) return parsed[pillarId];
    const altKey = pillarId.replace(/-/g, '_');
    if (parsed[altKey]) return parsed[altKey];
    if (parsed.summary || parsed.keyPoints || parsed.pullQuotes) return parsed; // returned unwrapped
    const keys = Object.keys(parsed);
    if (keys.length === 1) return parsed[keys[0]]; // single unexpected wrapper key
    return null;
  }

  async _callDeepDiveMulti(title, author, text) {
    const hasText = text && text.trim().length > 30;
    const textBlock = hasText ? `\n\nSTORY TEXT:\n---\n${text.substring(0, 100000)}\n---\n` : '';
    const pillars = [
      ['plot-conflict',  'Plot & Core Conflict',    'plot structure, narrative engine, internal and external conflicts, pacing, and how the climax resolves the central tension'],
      ['characters',     'Characters & Psychology', 'specific character names, their motivations, relationships, psychological arcs, foils, and how they change'],
      ['setting-pov',    'Setting & Point of View', 'the specific time/place setting, its symbolic significance, and how the narrative POV shapes what the reader knows'],
      ['themes-symbols', 'Themes & Symbols',        'the central themes, recurring motifs, symbolic objects specific to this story, and their philosophical meaning'],
      ['devices-style',  'Literary Devices & Style','the author\'s specific diction choices, sentence rhythms, use of irony, metaphor, imagery, and craft techniques'],
    ];
    const deepDive = {};
    for (const [pillarId, pillarTitle, pillarFocus] of pillars) {
      const prompt = (
        `Analyse "${title}" by "${author}" — FOCUS ONLY ON: ${pillarFocus}.${textBlock}\n` +
        `Write analysis grounded in specific scenes, character names, and quoted lines from this story.\n\n` +
        `Return this exact JSON (use this exact top-level key, do not rename or omit it):\n` +
        `{"${pillarId}":{"id":"${pillarId}","title":"${pillarTitle}",` +
        `"subtitle":"<a specific phrase naming the central dynamic of this pillar IN THIS STORY>",` +
        `"summary":"<3-5 sentences of analysis grounded in actual story events>",` +
        `"keyPoints":["**<Specific header>:** <2-3 sentences citing specific story events>","**<Specific header>:** <2-3 sentences>","**<Specific header>:** <2-3 sentences>"],` +
        `"pullQuotes":[{"quote":"<a short actual quote from the story>","significance":"<why this line matters literarily>"}]}}`
      );
      const raw = await this._callRawAI(prompt);
      if (raw) {
        const parsed = this.parseCleanJson(raw);
        const pillarData = this._extractPillarData(parsed, pillarId);
        if (pillarData) {
          deepDive[pillarId] = { id: pillarId, title: pillarTitle, ...pillarData };
        } else {
          console.warn(`[DeepDive] Pillar '${pillarId}' returned no usable data`, parsed);
        }
      } else {
        console.warn(`[DeepDive] Pillar '${pillarId}' got no response from AI`);
      }
    }
    return Object.keys(deepDive).length > 0 ? { deepDive } : null;
  }

  /** studyprep: 2 focused calls — essays+discussion then quiz */
  async _callStudyPrepMulti(title, author, text) {
    const hasText = text && text.trim().length > 30;
    const textBlock = hasText ? `\n\nSTORY TEXT:\n---\n${text.substring(0, 100000)}\n---\n` : '';

    const essayPrompt = (
      `For "${title}" by "${author}":${textBlock}\n` +
      `Write 3 AP-level essay prompts and 3 Socratic discussion questions about THIS story's specific events and themes.\n` +
      `Thesis templates must use [square brackets] for fill-in slots and reference specific elements of THIS story.\n\n` +
      `Return this exact JSON:\n` +
      `{"essayAngles":[{"prompt":"<specific essay question>","thesisTemplate":"<template with [bracketed] slots>"},{"prompt":"<second>","thesisTemplate":"<second>"},{"prompt":"<third>","thesisTemplate":"<third>"}],` +
      `"criticalThinking":[{"question":"<specific Socratic question about a character decision or theme>","answer":"<3-5 sentence model answer referencing specific events>"},{"question":"<second>","answer":"<second>"},{"question":"<third>","answer":"<third>"}]}`
    );

    const quizPrompt = (
      `For "${title}" by "${author}":${textBlock}\n` +
      `Write exactly 5 multiple-choice questions testing specific knowledge of THIS story's plot, characters, themes, and literary devices.\n` +
      `Each question has 4 options. Only one is correct. correctIndex is 0-based (0, 1, 2, or 3).\n\n` +
      `Return this exact JSON:\n` +
      `{"quiz":[{"id":"q1","question":"<specific question>","options":["<o0>","<o1>","<o2>","<o3>"],"correctIndex":<int>,"explanation":"<why correct, citing the story>"},` +
      `{"id":"q2","question":"<question>","options":["<o0>","<o1>","<o2>","<o3>"],"correctIndex":<int>,"explanation":"<explanation>"},` +
      `{"id":"q3","question":"<question>","options":["<o0>","<o1>","<o2>","<o3>"],"correctIndex":<int>,"explanation":"<explanation>"},` +
      `{"id":"q4","question":"<question>","options":["<o0>","<o1>","<o2>","<o3>"],"correctIndex":<int>,"explanation":"<explanation>"},` +
      `{"id":"q5","question":"<question>","options":["<o0>","<o1>","<o2>","<o3>"],"correctIndex":<int>,"explanation":"<explanation>"}]}`
    );

    const [essaysRaw, quizRaw] = await Promise.all([
      this._callRawAI(essayPrompt),
      this._callRawAI(quizPrompt)
    ]);

    const studyPrep = {};
    if (essaysRaw) {
      const p = this.parseCleanJson(essaysRaw);
      if (p?.essayAngles)      studyPrep.essayAngles      = p.essayAngles;
      if (p?.criticalThinking) studyPrep.criticalThinking = p.criticalThinking;
    }
    if (quizRaw) {
      const p = this.parseCleanJson(quizRaw);
      if (p?.quiz) studyPrep.quiz = p.quiz;
    }
    return Object.keys(studyPrep).length > 0 ? { studyPrep } : null;
  }

  /** Verbatim grounding check: drop any annotation phrase not found verbatim in its paragraph */
  _filterGroundedAnnotations(paragraphs, fullText) {
    return paragraphs.map(para => {
      const paraText = para.text || '';
      const good = (para.annotations || []).filter(ann => {
        const phrase = (ann.phrase || '').trim();
        if (!phrase) return false;
        const grounded = paraText.toLowerCase().includes(phrase.toLowerCase());
        if (!grounded) {
          console.warn(`[Grounding FAIL] Phrase not verbatim in paragraph: "${phrase.substring(0, 60)}"`);
        }
        return grounded;
      });
      return { ...para, annotations: good };
    });
  }

  parseCleanJson(raw) {
    const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    try {
      return JSON.parse(clean);
    } catch (e) {
      const match = clean.match(/(\{[\s\S]*\})/);
      if (match) {
        try {
          return JSON.parse(match[1]);
        } catch (e2) {}
      }
    }
    return null;
  }

  async runPipeline(input, onStepProgress) {
    const { title, author = '', uploadedText = '' } = input;
    const cleanTitle = title.trim();
    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const presets = (typeof PRESET_WORKS !== 'undefined' ? PRESET_WORKS : (window.PRESET_WORKS || {}));
    const preset = presets[slug] || Object.values(presets).find(
      w => w.title.toLowerCase() === cleanTitle.toLowerCase() ||
           w.id.toLowerCase() === slug.toLowerCase()
    );

    // If an API key is provided, ALWAYS call the live AI model even if it's a recognized title!
    const shouldUseStaticPreset = Boolean(preset) && !uploadedText && !this.apiKey;
    const isObscure = !preset && !uploadedText;

    await this.checkBackendStatus();

    const steps = [
      { id: 'summary', name: 'Synthesizing Plot Summary, Metadata & Historical Context...' },
      { id: 'annotations', name: 'Extracting Full Text & Multi-Category Annotations...' },
      { id: 'vocabulary', name: 'Building High-Yield Academic Vocabulary Database...' },
      { id: 'storymap', name: 'Mapping Narrative Progression & Tension Curve...' },
      { id: 'deepdive', name: 'Assembling 5-Node Deep Dive Organizational Chart...' },
      { id: 'studyprep', name: 'Generating Essay Theses, Critical Questions & Quiz...' }
    ];

    let result = {};

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (onStepProgress) {
        onStepProgress(i, step.name, result, false);
      }

      let lensData = null;

      if (shouldUseStaticPreset) {
        if (step.id === 'summary') {
          result.id = preset.id;
          result.title = preset.title;
          result.author = preset.author;
          result.publicationYear = preset.publicationYear;
          result.genre = preset.genre;
          result.setting = preset.setting;
          result.pov = preset.pov;
          result.conflictType = preset.conflictType;
          result.wordCount = preset.wordCount;
          result.estimatedReadTime = preset.estimatedReadTime;
          result.tone = preset.tone;
          result.summary = preset.summary;
          result.historicalContext = preset.historicalContext;
          result.compareAndConnect = preset.compareAndConnect;
          result.isObscure = false;
        } else if (step.id === 'annotations') {
          result.paragraphs = preset.paragraphs;
        } else if (step.id === 'vocabulary') {
          result.vocabulary = preset.vocabulary;
        } else if (step.id === 'storymap') {
          result.storyMap = preset.storyMap;
        } else if (step.id === 'deepdive') {
          result.deepDive = preset.deepDive;
        } else if (step.id === 'studyprep') {
          result.studyPrep = preset.studyPrep;
        }
      } else {
        // 1. Try Python backend first
        if (this.isBackendOnline) {
          lensData = await this.callBackendForLens(step.id, cleanTitle, author, uploadedText);
        }

        // 2. If backend offline or didn't return data, try client-side direct AI call
        if (!lensData && this.apiKey) {
          lensData = await this.callClientSideAI(step.id, cleanTitle, author, uploadedText);
        }

        // 3. If still no data (e.g. offline with no key), fallback to local synthesizer
        if (!lensData) {
          lensData = this.generateDynamicAnalysis(cleanTitle, author, uploadedText, step.id, result);
        }

        result = { ...result, ...lensData, isObscure };
      }

      await new Promise(res => setTimeout(res, 350 + Math.random() * 150));

      if (onStepProgress) {
        onStepProgress(i, `${step.name.replace('...', '')} Completed!`, result, true);
      }
    }

    return result;
  }

  generateDynamicAnalysis(title, author, rawText, stepId, currentResult) {
    const safeTitle = title || "Custom Literary Work";
    const safeAuthor = author || "Unknown Author";

    if (stepId === 'summary') {
      const words = rawText ? rawText.split(/\s+/).filter(Boolean) : [];
      const count = words.length > 0 ? words.length : 2100;
      const readTime = `${Math.max(1, Math.round(count / 220))} min`;

      return {
        id: safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: safeTitle,
        author: safeAuthor,
        publicationYear: "Classic / Contemporary Era",
        genre: "Literary Fiction / Psychological Drama",
        setting: "Atmospheric Dramatic Setting (Primary Narrative Arc)",
        pov: "Third-Person / First-Person Subjective",
        conflictType: "Individual Autonomy vs. Societal Determinism",
        wordCount: count,
        estimatedReadTime: readTime,
        tone: ["Introspective", "Evocative", "Dramatic", "Analytical"],
        summary: {
          beginning: `The narrative introduces the central protagonist and world of ${safeTitle}, establishing fundamental tensions, character motivations, and the primary inciting dilemma.`,
          middle: `Complications escalate as the core conflict forces the characters into critical moral choices, escalating dramatic tension and testing personal resolve.`,
          end: `The climactic reckoning forces a lasting transformation, leading to the ultimate resolution and thematic crystallisation of ${safeTitle}.`
        },
        historicalContext: {
          authorBio: `${safeAuthor} crafts nuanced prose exploring human resilience, societal friction, and psychological depths.`,
          literaryMovement: "Literary Realism & Psychological Inquiry: Emphasizing authentic emotional interiority and social critique.",
          historicalEra: "Explores enduring questions of human identity, autonomy, and ethics under shifting socio-cultural pressures."
        },
        compareAndConnect: [
          {
            title: "Universal Archetype: The Hero's Trial",
            type: "Universal Archetype",
            connection: `Reflects the timeless journey of confronting internal uncertainty and navigating challenging societal thresholds.`
          },
          {
            title: "Literary Parallel: Classical Drama",
            type: "Literary Parallel",
            connection: `Shares the architectural pacing of classical narrative tension, where personal ambition intersects with external destiny.`
          },
          {
            title: "Modern Parallels in Contemporary Cinema",
            type: "Modern Media",
            connection: `Mirrors modern dramatic storytelling where moral gray areas challenge conventional definitions of heroism.`
          }
        ]
      };
    }

    if (stepId === 'annotations') {
      let paragraphs = [];
      if (rawText && rawText.trim().length > 0) {
        const rawParagraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        paragraphs = rawParagraphs.map((text, idx) => {
          const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
          const annotations = [];
          
          if (sentences.length > 0) {
            const firstSentence = sentences[0].trim();
            const cat = idx % 5 === 0 ? "plot" : idx % 5 === 1 ? "characters" : idx % 5 === 2 ? "setting-world" : idx % 5 === 3 ? "meaning-theme" : "literary-devices";
            annotations.push({
              category: cat,
              phrase: firstSentence.substring(0, Math.min(65, firstSentence.length)),
              note: `Key analytical observation highlighting ${cat.replace('-', ' ')} within ${safeTitle}.`,
              device: idx % 2 === 0 ? "Narrative Focalization" : "Figurative Diction"
            });
          }

          return {
            id: `p${idx + 1}`,
            number: idx + 1,
            text: text.trim(),
            annotations
          };
        });
      } else {
        paragraphs = [
          {
            id: "p1",
            number: 1,
            text: `In the opening movement of ${safeTitle}, the narrative establishes the distinctive atmosphere and moral landscape of the protagonist's journey. Every detail in the surrounding environment carries the weight of impending change, subtly foreshadowing the trials ahead.`,
            annotations: [
              {
                category: "setting-world",
                phrase: `the distinctive atmosphere and moral landscape of the protagonist's journey`,
                note: "Establishes atmospheric tone and spatial grounding for the opening scene.",
                device: "World-Building Exposition"
              },
              {
                category: "characters",
                phrase: "subtly foreshadowing the trials ahead",
                note: "Prepares the reader for the protagonist's central psychological test.",
                device: "Foreshadowing"
              }
            ]
          },
          {
            id: "p2",
            number: 2,
            text: `As circumstances unfold, an unexpected encounter disrupts the established routine. The characters must confront uncomfortable truths about their past decisions and the rigid expectations of their social milieu.`,
            annotations: [
              {
                category: "plot",
                phrase: "an unexpected encounter disrupts the established routine",
                note: "Inciting incident initiating dramatic friction and forward momentum.",
                device: "Inciting Catalyst"
              },
              {
                category: "meaning-theme",
                phrase: "confront uncomfortable truths about their past decisions",
                note: "Underlines the theme of accountability versus self-deception.",
                device: "Thematic Motif"
              }
            ]
          }
        ];
      }
      return { paragraphs };
    }

    if (stepId === 'vocabulary') {
      const defaultVocab = [
        {
          word: "incandescent",
          pos: "adjective",
          definition: "Emitting light as a result of being heated; passionately brilliant.",
          sentence: "The morning light broke in **incandescent** flashes across the open threshold.",
          connotation: "Luminous, intense",
          etymology: "Latin *incandescere*"
        },
        {
          word: "juxtaposition",
          pos: "noun",
          definition: "The fact of two things being seen or placed close together with contrasting effect.",
          sentence: "The **juxtaposition** of opulence and barren simplicity underscored the divide.",
          connotation: "Analytical contrast",
          etymology: "Latin *juxta* + French *position*"
        },
        {
          word: "inexorable",
          pos: "adjective",
          definition: "Impossible to stop or prevent; unrelenting and persistent.",
          sentence: "They marched forward beneath the **inexorable** march of time.",
          connotation: "Relentless destiny",
          etymology: "Latin *inexorabilis*"
        },
        {
          word: "clandestine",
          pos: "adjective",
          definition: "Kept secret or done secretively, especially because illicit.",
          sentence: "Their **clandestine** meetings occurred only in the shadowy alcove.",
          connotation: "Furtive, illicit secrecy",
          etymology: "Latin *clandestinus*"
        },
        {
          word: "ephemeral",
          pos: "adjective",
          definition: "Lasting for a very short time; transitory and fleeting.",
          sentence: "The fleeting joy was **ephemeral**, vanishing with the morning mist.",
          connotation: "Delicately brief",
          etymology: "Greek *ephemeros*"
        }
      ];
      return { vocabulary: defaultVocab };
    }

    if (stepId === 'storymap') {
      const map = [
        {
          id: "node-1",
          stage: "Exposition",
          title: `Introduction of ${safeTitle}`,
          tension: 20,
          summary: `The initial conditions, character landscape, and foundational thematic premise are established.`,
          quote: "In the opening movement, the narrative establishes the distinctive atmosphere...",
          quoteLocation: "p1",
          analysis: "World-building and baseline equilibrium."
        },
        {
          id: "node-2",
          stage: "Inciting Incident",
          title: "The Disruptive Catalyst",
          tension: 45,
          summary: "An unexpected event destabilizes the status quo, forcing the protagonist into active pursuit.",
          quote: "As circumstances unfold, an unexpected encounter disrupts the established routine.",
          quoteLocation: "p2",
          analysis: "Forces a critical departure from habitual safety."
        },
        {
          id: "node-3",
          stage: "Rising Action",
          title: "Escalating Complications",
          tension: 75,
          summary: "Obstacles multiply, testing loyalties and amplifying subtextual tensions among key characters.",
          quote: "The dialogue crackles with unspoken subtext.",
          quoteLocation: "p3",
          analysis: "Building emotional and thematic stakes."
        },
        {
          id: "node-4",
          stage: "Climax",
          title: "The Decisive Reckoning",
          tension: 100,
          summary: "The ultimate collision of opposing motives forces an irreversible choice and revelation.",
          quote: "The protagonist must make an irrevocable choice between security and authenticity...",
          quoteLocation: "p4",
          analysis: "Peak dramatic and moral conflict."
        },
        {
          id: "node-5",
          stage: "Falling Action",
          title: "The Unfolding Repercussions",
          tension: 60,
          summary: "The immediate fallout of the climactic decision reshapes character dynamics and environment.",
          quote: "In the quiet aftermath, the world has shifted.",
          quoteLocation: "p5",
          analysis: "Processing consequences and new realities."
        },
        {
          id: "node-6",
          stage: "Resolution",
          title: "Thematic Denouement",
          tension: 30,
          summary: "A new equilibrium is achieved, leaving an enduring philosophical truth for the audience.",
          quote: "The resonance of what was gained and lost lingers in the memory...",
          quoteLocation: "p5",
          analysis: "Final philosophical synthesis and closure."
        }
      ];
      return { storyMap: map };
    }

    if (stepId === 'deepdive') {
      return {
        deepDive: {
          "plot-conflict": {
            id: "plot-conflict",
            title: "Plot & Core Conflict",
            subtitle: "Structural Tension & Dramatic Momentum",
            summary: `The narrative architecture of ${safeTitle} balances external obstacles with internal moral dilemmas.`,
            keyPoints: [
              "**Core Narrative Engine:** The interplay between individual ambition and societal constraints.",
              "**Pacing & Tension:** Carefully orchestrated pauses and accelerations maintaining audience engagement.",
              "**Climactic Inevitability:** The resolution feels organically earned through established character flaws."
            ],
            pullQuotes: [
              {
                quote: "The protagonist must make an irrevocable choice between security and authenticity.",
                significance: "Highlights the central moral crucible defining the plot's ultimate trajectory."
              }
            ]
          },
          "characters": {
            id: "characters",
            title: "Characters & Psychology",
            subtitle: "Archetypes, Motivations & Character Arcs",
            summary: `Explores the multifaceted personas within ${safeTitle} and their evolutionary arcs.`,
            keyPoints: [
              "**Protagonist Dynamism:** Displays complex interiority driven by competing desires for belonging and truth.",
              "**Foil Dynamics:** Supporting figures mirror and challenge the central protagonist's blind spots.",
              "**Psychological Realism:** Actions stem from authentic human vulnerabilities rather than mere convenience."
            ],
            pullQuotes: [
              {
                quote: "Each gesture and lingering gaze speaks of repressed hopes and hidden alliances.",
                significance: "Demonstrates psychological depth conveyed through subtle interpersonal behaviors."
              }
            ]
          },
          "setting-pov": {
            id: "setting-pov",
            title: "Setting & Point of View",
            subtitle: "Spatial Atmosphere & Narrative Perspective",
            summary: "Examines how physical environments and observational distance shape reader immersion.",
            keyPoints: [
              "**Atmospheric Resonance:** The setting actively mirrors the emotional states of the characters.",
              "**Perspective Framing:** POV filters narrative reliability, controlling access to objective facts.",
              "**Temporal Movement:** Rhythmic progression of time accentuates urgency and contemplation."
            ],
            pullQuotes: [
              {
                quote: "the distinctive atmosphere and moral landscape of the protagonist's journey.",
                significance: "Establishes the physical world as a direct extension of internal moral stakes."
              }
            ]
          },
          "themes-symbols": {
            id: "themes-symbols",
            title: "Themes & Symbols",
            subtitle: "Motifs, Allegory & Subtextual Meaning",
            summary: "Decodes recurring symbolic imagery and universal philosophical meditations.",
            keyPoints: [
              "**Central Theme:** The search for authentic identity within restrictive social structures.",
              "**Symbolic Objects:** Physical artifacts serve as tangible conduits for abstract moral values.",
              "**Universal Resonance:** Connects specific narrative struggles to broader human experience."
            ],
            pullQuotes: [
              {
                quote: "an enduring meditation on the complexity of human destiny.",
                significance: "Synthesizes the overarching philosophical thesis of the literary work."
              }
            ]
          },
          "devices-style": {
            id: "devices-style",
            title: "Literary Devices & Style",
            subtitle: "Syntax, Diction, Irony & Figurative Craft",
            summary: "Analyzes the author's stylistic toolkit and rhetorical mastery.",
            keyPoints: [
              "**Diction & Tone:** Deliberate lexical choices evoke evocative sensory landscapes.",
              "**Structural Irony:** Discrepancies between character perception and reality drive dramatic tension.",
              "**Figurative Devices:** Metaphor and allegory enrich literal narrative events with layered nuance."
            ],
            pullQuotes: [
              {
                quote: "The dialogue crackles with unspoken subtext.",
                significance: "Exemplifies linguistic economy where unstated tensions carry immense dramatic weight."
              }
            ]
          }
        }
      };
    }

    if (stepId === 'studyprep') {
      return {
        studyPrep: {
          essayAngles: [
            {
              prompt: `Analyze how the central conflict in ${safeTitle} illustrates the tension between personal autonomy and social conformity.`,
              thesisTemplate: `In ${safeTitle}, the author employs [specific device/symbol] and character foils to demonstrate that [protagonist's struggle] ultimately reveals [thematic truth about autonomy].`
            },
            {
              prompt: `Examine the symbolic function of setting and atmosphere in shaping the emotional trajectory of ${safeTitle}.`,
              thesisTemplate: `Through the evocative depiction of [primary setting], ${safeTitle} establishes setting not merely as a backdrop, but as an active catalyst that [shapes psychological outcome].`
            },
            {
              prompt: `Discuss the author's use of irony and subtext in developing character relationships.`,
              thesisTemplate: `By weaving [dramatic/situational irony] throughout key interactions, ${safeTitle} exposes the fragile divide between [public façade] and [inner truth].`
            }
          ],
          criticalThinking: [
            {
              question: `How does the climax of ${safeTitle} alter the protagonist's understanding of their own moral agency?`,
              answer: `The climactic choice forces the protagonist to discard passive reliance on external authorities, accepting full moral responsibility for their actions and acknowledging the permanent consequences of their decisions.`
            },
            {
              question: `In what ways does the author utilize supporting characters as psychological mirrors for the protagonist?`,
              answer: `Supporting characters embody alternative pathways and unchosen futures, highlighting the protagonist's unique dilemmas and exposing their underlying fears and hidden aspirations.`
            },
            {
              question: `What universal philosophical question does the ending of ${safeTitle} leave unresolved for the audience?`,
              answer: `The resolution leaves readers to ponder whether true freedom can ever be completely decoupled from sacrifice, and how individuals navigate the enduring trade-offs between stability and self-actualization.`
            }
          ],
          quiz: [
            {
              id: "q1",
              question: `What is the primary driving force behind the central conflict in ${safeTitle}?`,
              options: [
                "A pursuit of financial wealth above all else",
                "The friction between personal integrity and societal expectations",
                "A purely physical battle against nature",
                "A legal dispute over ancestral inheritance"
              ],
              correctIndex: 1,
              explanation: "The narrative centers fundamentally on the protagonist's struggle to maintain authenticity against surrounding social pressures."
            },
            {
              id: "q2",
              question: `How does the setting function beyond its literal physical role in the work?`,
              options: [
                "It serves solely as historical decorative background",
                "It symbolically reflects the psychological states and moral challenges of the characters",
                "It distracts the reader from the main narrative",
                "It changes randomly without thematic connection"
              ],
              correctIndex: 1,
              explanation: "Atmosphere and spatial geography are deliberately crafted to mirror the emotional and moral stakes of the central characters."
            },
            {
              id: "q3",
              question: `Which literary technique is most prominently utilized to create narrative suspense?`,
              options: [
                "Nonsensical rhyming verse",
                "Dramatic irony and subtextual tension",
                "Direct comedic fourth-wall breaks",
                "Scientific footnotes"
              ],
              correctIndex: 1,
              explanation: "Suspense is generated through subtext and the discrepancy between characters' unstated motivations and surface behavior."
            },
            {
              id: "q4",
              question: `What characterizes the protagonist's transformation at the climax?`,
              options: [
                "They remain entirely unchanged from the opening scene",
                "They make an irrevocable choice that aligns actions with internal convictions",
                "They surrender completely to external villainy",
                "They wake up realizing everything was a dream"
              ],
              correctIndex: 1,
              explanation: "The climax represents the crucible where the protagonist embraces agency and makes a decisive, permanent choice."
            },
            {
              id: "q5",
              question: `What is the overarching thematic takeaway of the resolution?`,
              options: [
                "Human experience is deeply multifaceted, requiring courage to navigate complex moral realities",
                "Material success guarantees permanent happiness",
                "Individual choices have no lasting consequence",
                "Silence is always preferable to action"
              ],
              correctIndex: 0,
              explanation: "The resolution leaves an enduring reflection on human resilience, moral complexity, and the pursuit of meaning."
            }
          ]
        }
      };
    }

    return {};
  }
}

export const pipeline = new AnalysisPipeline();

if (typeof window !== 'undefined') {
  window.pipeline = pipeline;
  window.AnalysisPipeline = AnalysisPipeline;
}
