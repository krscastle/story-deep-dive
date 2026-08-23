# Story Deep Dive - Python AI Backend

A Python server powering the **Story Deep Dive** literary analysis platform with **Google Gemini AI** integration, multi-lens sequential pipeline execution, and document parsing.

---

## Architecture Overview

1. **`ai_service.py`**:
   - Manages Google Gemini API integration using structured JSON schemas.
   - Provides scholarly prompts for each of the 6 analytical lenses:
     - Lens 1: Summary, metadata, historical/author context, and comparative connections.
     - Lens 2: Paragraph extraction with 5-category inline color-coded annotations.
     - Lens 3: High-yield academic vocabulary with contextual sentences.
     - Lens 4: Freytag's Pyramid 6-stage narrative map with tension ratings.
     - Lens 5: 5-node deep dive structural, psychological, and stylistic analysis.
     - Lens 6: Essay thesis templates, Socratic discussion questions, and mastery quizzes.
   - Includes an offline fallback synthesizer so the server functions seamlessly without an API key.

2. **`main.py`**:
   - FastAPI REST API with CORS middleware for browser requests.
   - Endpoints:
     - `GET /api/status`: Health check & Gemini connectivity state.
     - `POST /api/analyze`: Multi-lens or lens-specific analysis endpoint.
     - `POST /api/upload`: Server-side document text extraction.
     - `POST /api/quiz/regenerate`: Fresh quiz formulation.

3. **`run.py`**:
   - Universal server launcher: runs `uvicorn backend.main:app` if installed, or automatically falls back to a zero-dependency Python HTTP server (`http.server`) on `http://localhost:8000`.

---

## How to Run the Backend

### Quick Start (Zero-dependency Standalone):
```bash
python3 backend/run.py
```
*Starts the server on `http://localhost:8000` with CORS and REST API routing.*

---

### Running with Full FastAPI & Gemini Dependencies:

1. **Install Dependencies:**
```bash
pip install -r backend/requirements.txt
```

2. **Set your Google Gemini API Key:**
```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
```

3. **Start the FastAPI Server:**
```bash
python3 backend/run.py
```
*Or directly via Uvicorn:*
```bash
uvicorn backend.main:app --reload --port 8000
```

---

## Automatic Frontend Integration
When the Python server is running on `http://localhost:8000`, the frontend SPA automatically detects it, updates the top header badge to **`● Python AI Backend Connected`**, and offloads multi-lens AI analysis directly to the Python backend!
