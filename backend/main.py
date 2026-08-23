# backend/main.py - Story Deep Dive Multi-Provider FastAPI / Python Server
import os
import sys
import json
from typing import Optional, Dict, Any, List
from pathlib import Path

# Add backend dir to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from ai_service import ai_service

try:
    from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Header
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import JSONResponse, FileResponse
    from pydantic import BaseModel

    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False

if FASTAPI_AVAILABLE:
    app = FastAPI(
        title="Story Deep Dive Multi-Provider AI API",
        description="Comprehensive literary analysis backend supporting Gemini, OpenAI, Claude, Groq, DeepSeek, and OpenRouter.",
        version="2.1.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class AnalysisRequest(BaseModel):
        title: str
        author: Optional[str] = ""
        text: Optional[str] = ""
        lens: Optional[str] = "all"
        apiKey: Optional[str] = ""
        provider: Optional[str] = ""
        model: Optional[str] = ""
        baseUrl: Optional[str] = ""

    class QuizRegenRequest(BaseModel):
        title: str
        author: Optional[str] = ""
        apiKey: Optional[str] = ""
        provider: Optional[str] = ""
        model: Optional[str] = ""
        baseUrl: Optional[str] = ""

    @app.get("/api/status")
    async def get_status():
        return {
            "status": "online",
            "backend": "python-fastapi",
            "active_provider": ai_service.provider,
            "has_api_key": ai_service.has_api_key(),
            "supported_providers": ["gemini", "openai", "anthropic", "groq", "deepseek", "openrouter", "custom"],
            "available_lenses": ["summary", "annotations", "vocabulary", "storymap", "deepdive", "studyprep"]
        }

    @app.post("/api/analyze")
    async def analyze_endpoint(req: AnalysisRequest, x_api_key: Optional[str] = Header(None)):
        key = req.apiKey or x_api_key or ""
        provider = req.provider or ""
        model = req.model or ""
        base_url = req.baseUrl or ""

        if req.lens == "all" or not req.lens:
            lenses = ["summary", "annotations", "vocabulary", "storymap", "deepdive", "studyprep"]
            result = {}
            for lens_name in lenses:
                lens_data = ai_service.analyze_lens(
                    lens=lens_name,
                    title=req.title,
                    author=req.author or "",
                    text=req.text or "",
                    client_key=key,
                    client_provider=provider,
                    client_model=model,
                    client_base_url=base_url
                )
                result.update(lens_data)
            return result
        else:
            return ai_service.analyze_lens(
                lens=req.lens,
                title=req.title,
                author=req.author or "",
                text=req.text or "",
                client_key=key,
                client_provider=provider,
                client_model=model,
                client_base_url=base_url
            )

    @app.post("/api/upload")
    async def upload_file_endpoint(file: UploadFile = File(...)):
        content = await file.read()
        filename = file.filename.lower()
        extracted_text = ""

        try:
            if filename.endswith(".pdf"):
                try:
                    import pypdf
                    import io
                    reader = pypdf.PdfReader(io.BytesIO(content))
                    pages_text = [page.extract_text() or "" for page in reader.pages]
                    extracted_text = "\n\n".join(pages_text).strip()
                except Exception as e:
                    extracted_text = f"[PDF parsed: {file.filename}]"
            elif filename.endswith((".txt", ".md")):
                extracted_text = content.decode("utf-8", errors="ignore")
            else:
                extracted_text = f"[Uploaded file: {file.filename}]"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"File parsing error: {str(e)}")

        return {
            "filename": file.filename,
            "char_count": len(extracted_text),
            "word_count": len(extracted_text.split()),
            "extracted_text": extracted_text
        }

    @app.post("/api/quiz/regenerate")
    async def regen_quiz_endpoint(req: QuizRegenRequest, x_api_key: Optional[str] = Header(None)):
        key = req.apiKey or x_api_key or ""
        res = ai_service.analyze_lens(
            lens="studyprep",
            title=req.title,
            author=req.author or "",
            text="",
            client_key=key,
            client_provider=req.provider or "",
            client_model=req.model or "",
            client_base_url=req.baseUrl or ""
        )
        quiz_data = res.get("studyPrep", {}).get("quiz", [])
        return {"quiz": quiz_data}

    root_dir = Path(__file__).resolve().parent.parent
    if (root_dir / "index.html").exists():
        app.mount("/static", StaticFiles(directory=str(root_dir)), name="static")

        @app.get("/")
        async def serve_index():
            return FileResponse(str(root_dir / "index.html"))

else:
    app = None
