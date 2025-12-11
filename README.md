# DocuMind Hub — Document Intelligence & Knowledge Search

A complete, full-stack project that lets users upload PDFs, parse them, and ask questions using a generative AI model. Includes a React frontend (Vite), Node.js/Express backend, and MongoDB for persistent storage.



## 1) Project overview

DocuMind Hub is a document intelligence workspace that:

* Lets users sign up / log in.
* Upload PDF documents (stored on disk or S3 if enabled).
* Extracts text from PDFs and stores it in MongoDB.
* Optionally creates embeddings (Gemini/Gecko) and runs RAG queries.
* Provides a chat UI to ask questions against uploaded documents.

This README explains how to run the backend, frontend, and MongoDB from scratch and how to test the app locally.

---

## 2) What’s included (high-level file map)

backend/
 ├── src/
 │   ├── app.js
 │   ├── server.js
 │   ├── config/
 │   │   ├── db.js
 │   │   └── aiClient.js
 │   ├── controllers/
 │   │   ├── authController.js
 │   │   ├── documentController.js
 │   │   ├── searchController.js
 │   │   ├── userController.js
 │   │   ├── supportController.js
 │   │   └── historyController.js
 │   ├── middleware/
 │   │   └── auth.js
 │   ├── models/
 │   │   ├── User.js
 │   │   ├── Document.js
 │   │   └── QueryHistory.js
 │   ├── routes/
 │   │   ├── authRoutes.js
 │   │   ├── documentRoutes.js
 │   │   ├── searchRoutes.js
 │   │   ├── historyRoutes.js
 │   │   └── supportRoutes.js
 │   ├── services/
 │   │   ├── pdfParser.js
 │   │   └── storageService.js
 │   └── utils/
 │       └── fileUtils.js
 ├── uploads/
 ├── .env
 └── package.json


frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── Landing.jsx
 │   │   ├── Login.jsx
 │   │   ├── Register.jsx
 │   │   ├── Dashboard.jsx
 │   │   └── Support.jsx
 │   ├── components/
 │   │   ├── Sidebar.jsx
 │   │   ├── DocumentCard.jsx
 │   │   ├── ChatPanel.jsx
 │   │   └── PdfPreviewPanel.jsx
 │   ├── api.js
 │   ├── App.jsx
 │   ├── main.jsx
 │   └── styles.css
 ├── index.html
 └── package.json


uploads/                # Uploaded files (local)

```

---

## 3) Prerequisites

Install the following on your machine:

* Node.js (recommended v18+ / tested with v22)
* npm (comes with Node) or yarn
* MongoDB (local or a hosted MongoDB Atlas cluster)
* (Optional) Google Cloud / Generative AI API key if you want embeddings/LLM answers

---

## 4) Environment variables (.env)

Create a `.env` file in `backend/` with the following keys (example):

```
# Server
PORT=4000
MONGO_URI=mongodb://localhost:27017/document_intel
JWT_SECRET=supersecretjwtkey

# Gemini / Generative AI (optional)
GEMINI_API_KEY=your_google_api_key_here
LLM_MODEL=gemini-2.5-flash        # or whichever model your key permits
EMBED_MODEL=models/embedding-gecko-001

# Storage
STORAGE_DIR=./uploads
USE_S3=false

# Chunking
MAX_CHUNK_CHARS=1000
```

Notes:

* If you don’t want to use Google Generative API (Gemini) or billing, you can leave `GEMINI_API_KEY` empty — the system will still parse PDFs and store text in MongoDB; however **LLM answers and embeddings will not work**.
* If you use Google APIs, **billing is required** for embeddings and some models; free-tier quotas are limited.

---

## 5) Backend — install & run (step-by-step)

Open a terminal and run:

1. `cd backend`

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` (see Section 4).

4. Start MongoDB if not running. For local default install:

   * macOS / Linux: `sudo service mongod start` (or `brew services start mongodb-community`)
   * Windows (with installed MongoDB): start the MongoDB service from Services or run `mongod`.

5. Run the backend in development mode (nodemon):

   ```bash
   npm run dev
   ```

6. You should see (sample):

   * `✅ MongoDB connected`
   * `🚀 Backend running on http://localhost:4000`

If the server crashes with `EADDRINUSE` (port in use):

* Find the process using the port and stop it.

  * On Windows PowerShell: `Get-NetTCPConnection -LocalPort 4000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`
  * On macOS / Linux: `lsof -i :4000` then `kill -9 <PID>`

---

## 6) Frontend — install & run (step-by-step)

1. `cd frontend`

2. Install dependencies:

   ```bash
   npm install
   ```

   Ensure `axios`, `react`, `react-router-dom`, and `vite` are present in `package.json`.

3. Start frontend dev server:

   ```bash
   npm run dev
   ```

4. Open the app in the browser at `http://localhost:5173/` (Vite default). If you changed the port, use the one printed by Vite.

---

## 7) MongoDB setup

* Local: default `mongodb://localhost:27017` works with the instructions.
* Atlas: create a free cluster and use the provided connection string as `MONGO_URI`.

  * Replace `<username>`, `<password>`, and `<dbname>` in the connection string.

Ensure your IP is allowed for Atlas (Network Access) while testing.

---

## 8) Postman / API smoke tests (examples)

API Endpoints
/api/auth/signup
/api/auth/login
/api/documents/upload
/api/documents/:id (GET, DELETE)
/api/search/query
/api/history
/api/support

Use Postman (or curl) to verify the backend endpoints.

### 1) Signup

POST `http://localhost:4000/api/auth/signup`

Body (JSON):

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

Response: `token` and `user` object.

---

### 2) Login

POST `http://localhost:4000/api/auth/login`

Body (JSON):

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response: `{ token, user }` — copy the token.

Add header for protected endpoints:

```
Authorization: Bearer <token>
```

---

### 3) Upload a PDF

POST `http://localhost:4000/api/documents/upload`

* Use form-data

  * Key: `file` (type: File) → choose a `.pdf`
* Include the Authorization header.

Response: Document object (status `uploaded` or `processed`).

---

### 4) List documents

GET `http://localhost:4000/api/documents` (Auth required)

---

### 5) Query (RAG)

POST `http://localhost:4000/api/search/query` (Auth required)

Body (JSON):

```json
{
  "question": "What is the exam date mentioned in the hall ticket?",
  "documentIds": ["<optional document id array>"]
}
```

Response: `{ answer, documentsUsed, historyId }` or an error message if LLM/Embeddings are not configured.

---

## 9) Common issues & troubleshooting

**1. API key invalid / 400 error**

* Ensure `GEMINI_API_KEY` is correct. Use the API key from Google Cloud (API & Services → API Keys). For embeddings and some models, billing **must** be enabled.
* If you don’t want billing, keep `GEMINI_API_KEY` empty — the app will still store and preview PDFs but not generate AI answers.

**2. 404: model not found**

* The model name in `.env` may be incorrect or unsupported for your API version. Example valid names change over time; check Google’s `ListModels` or their docs.
* Try using a known-working model or remove custom `LLM_MODEL` to let the code fallback.

**3. 429 Too Many Requests / Quota**

* Free-tier quotas may be zero for some accounts. This can be solved by enabling billing or switching to a model with available quota.

**4. EADDRINUSE (port 4000 in use)**

* Kill the process using the port (see Section 5).

**5. PDF not previewing (404 on /uploads/FILE.pdf)**

* Confirm that `STORAGE_DIR` matches where multer saved uploaded files (default `./uploads` in backend root) and that `app.use('/uploads', express.static(...))` path points to that folder.

**6. CORS problems**

* The backend uses `cors()` by default. If you get CORS errors, ensure frontend origin ([http://localhost:5173](http://localhost:5173)) is not blocked, or add `app.use(cors({ origin: 'http://localhost:5173' }))`.

---

## 10) Security notes

* **Do not commit** `.env` to source control. `.env` contains secrets.
* Use strong `JWT_SECRET` in production.
* Validate uploaded files and sanitize all inputs before enabling public access.

---

## 11) Known limitations & assumptions

(Concise list — use this when demonstrating live)

* Gemini/embedding usage depends on API key + billing / quotas.
* PDF extraction is best for text-based PDFs. Scanned images need OCR (not included).
* No collaborative editing or advanced PDF search in this version.
* Supports only PDF uploads by default.

(Full details available in the project documentation.)

---

## 12) Future extensions

* Add OCR for scanned PDFs (Tesseract or Google Vision).
* Add document highlights & keyword search inside the PDF viewer.
* Support DOCX/PPTX/TXT upload.
* Add admin UI for support tickets.
* Implement image generation & other response formats in the "Forms" feature.

---

## 13) Contact / credits

* Built by: Maheshbabu (example)
* Core libraries: Express, Mongoose, React, Vite, @google/generative-ai

---

### Quick checklist (run-before-demo)

1. Start MongoDB
2. `cd backend` → `npm install` → `.env` → `npm run dev`
3. `cd frontend` → `npm install` → `npm run dev`
4. Signup & Login → Upload PDF → Ask question

