#!/usr/bin/env python3
"""
backend/run.py - Universal Python Server Launcher for Story Deep Dive
Runs FastAPI with Uvicorn if installed, or falls back seamlessly to a zero-dependency HTTP server.
"""

import os
import sys
import json
import urllib.parse
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

PROJECT_ROOT = Path(__file__).resolve().parent.parent
os.chdir(str(PROJECT_ROOT))
sys.path.insert(0, str(PROJECT_ROOT / "backend"))

from ai_service import ai_service

PORT = int(os.environ.get("PORT", 8000))

class StandaloneHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-API-Key, Authorization")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            data = {
                "status": "online",
                "backend": "python-standalone",
                "active_provider": ai_service.provider,
                "has_api_key": ai_service.has_api_key(),
                "supported_providers": ["gemini", "openai", "anthropic", "groq", "deepseek", "openrouter", "custom"],
                "available_lenses": ["summary", "annotations", "vocabulary", "storymap", "deepdive", "studyprep"]
            }
            self.wfile.write(json.dumps(data).encode("utf-8"))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        
        try:
            req_data = json.loads(body) if body else {}
        except Exception:
            req_data = {}

        api_key = self.headers.get("X-API-Key", "") or req_data.get("apiKey", "")
        provider = req_data.get("provider", "")
        model = req_data.get("model", "")
        base_url = req_data.get("baseUrl", "")

        if parsed.path == "/api/analyze":
            lens = req_data.get("lens", "all")
            title = req_data.get("title", "Literary Work")
            author = req_data.get("author", "")
            text = req_data.get("text", "")

            if lens == "all" or not lens:
                result = {}
                for l in ["summary", "annotations", "vocabulary", "storymap", "deepdive", "studyprep"]:
                    result.update(ai_service.analyze_lens(
                        lens=l,
                        title=title,
                        author=author,
                        text=text,
                        client_key=api_key,
                        client_provider=provider,
                        client_model=model,
                        client_base_url=base_url
                    ))
            else:
                result = ai_service.analyze_lens(
                    lens=lens,
                    title=title,
                    author=author,
                    text=text,
                    client_key=api_key,
                    client_provider=provider,
                    client_model=model,
                    client_base_url=base_url
                )

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(result).encode("utf-8"))
            return

        if parsed.path == "/api/quiz/regenerate":
            title = req_data.get("title", "Literary Work")
            author = req_data.get("author", "")
            res = ai_service.analyze_lens(
                lens="studyprep",
                title=title,
                author=author,
                text="",
                client_key=api_key,
                client_provider=provider,
                client_model=model,
                client_base_url=base_url
            )
            quiz = res.get("studyPrep", {}).get("quiz", [])

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"quiz": quiz}).encode("utf-8"))
            return

        self.send_response(404)
        self._send_cors_headers()
        self.end_headers()

def run_server():
    try:
        import uvicorn
        print("=" * 60)
        print(f"🚀 Starting Story Deep Dive Multi-Provider API on http://localhost:{PORT}")
        print("=" * 60)
        uvicorn.run("backend.main:app", host="0.0.0.0", port=PORT, reload=True)
    except ImportError:
        print("=" * 60)
        print(f"⚡ Running Story Deep Dive Standalone Python Server on http://localhost:{PORT}")
        print("=" * 60)
        server = HTTPServer(("0.0.0.0", PORT), StandaloneHandler)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            server.server_close()

if __name__ == "__main__":
    run_server()
