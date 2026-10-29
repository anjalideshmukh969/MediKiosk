# MediKiosk: AI-Powered Patient Case-Taking Software

Smart India Hackathon 2026 | Problem Statement **SIH26047** | Ministry of Ayush

MediKiosk is a web platform for hospital OPDs. Before meeting the doctor, a patient answers history questions by voice or touch and uploads old reports. AI models read the documents and flag emergency symptoms, and the system generates a structured summary that the doctor reviews and edits.

> **Disclaimer:** This is a student prototype. It does not diagnose or prescribe. All summaries are drafts for a doctor to review. Use only fake or sample data, never real patient records.

## Problem

- Doctors in busy OPDs get only 2-5 minutes per patient, so history-taking is rushed.
- AYUSH (Ayurveda) history is much longer than normal intake.
- Patient records are scattered across handwritten papers.
- There is no easy patient-facing tool that feeds structured history into the ABDM ecosystem.

## Features

- Patient and doctor login with role-based access (JWT)
- Consent management before any data is captured
- Voice and touch history interview, in multiple languages
- Upload of prescriptions and reports, with OCR and medicine extraction
- Emergency (red-flag) detection using ML plus rule-based checks
- Structured, editable summary for the doctor
- Mock ABHA login and FHIR-style JSON export (ABDM sandbox)

## Architecture

```
Patient / Doctor
      |
React + Tailwind (client)
      |
Node.js + Express API (server)  <---->  MongoDB, file storage
      |
Python FastAPI AI service (ai-service)
  - Pre-trained tools: Whisper, LLM API, Tesseract
  - Our trained models: red-flag classifier, medicine NER, Prakriti classifier
```

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, react-i18next |
| Backend | Node.js, Express, JWT, bcrypt, multer |
| Database | MongoDB (Mongoose) |
| AI service | Python, FastAPI |
| ML | scikit-learn, PyTorch / Hugging Face, spaCy |
| Speech and OCR | Whisper, Tesseract, OpenCV |
| Integration | ABDM sandbox (mock), FHIR JSON |

## Folder structure

```
medikiosk/
  client/        React frontend
  server/        Node + Express backend
  ai-service/    FastAPI service and ML code
  docs/          API contract, report, diagrams
  .gitignore
  README.md
```

## Getting started

**Prerequisites:** Node.js 18+, Python 3.10+, a MongoDB Atlas account (or local MongoDB).

```bash
# 1. Clone
git clone <your-repo-url>
cd medikiosk

# 2. Backend
cd server
cp .env.example .env      # then fill in the values
npm install
npm run dev

# 3. Frontend (new terminal)
cd client
npm install
npm run dev

# 4. AI service (new terminal)
cd ai-service
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Environment variables

Create `server/.env` from `server/.env.example`:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
```

## Team

| Name | Role |
|---|---|
| Anjali Deshmukh | Full-Stack Developer |
| Garima Kapoor | AI / ML Engineer |
| Rishika Chouksey | UI/UX and Documentation |
