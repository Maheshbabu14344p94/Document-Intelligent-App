📄 DocuMind Hub – AI Document Intelligence & Knowledge Search

DocuMind Hub is an advanced AI-powered document analysis platform that allows users to upload PDFs, chat with their documents, preview content, and get intelligent responses extracted from files.
Built using React + Express + MongoDB + Gemini AI, it delivers a modern, fast, and visually appealing experience.

🚀 Features
🔍 1. Upload & Process PDFs

Upload PDFs through a neon-themed interface

Files are stored in /uploads/ on the backend

Automatically extracted and processed for AI use

💬 2. AI Chat With Documents

Ask questions related to uploaded PDFs

Uses Gemini AI to extract insights, summaries, explanations

Intelligent context-based chat

Chat panel fully scrollable and responsive

📑 3. PDF Preview Panel

View uploaded documents on the right side

Auto-updates when selecting different files

Smooth and fast iframe-based preview

📚 4. Source Management

Select multiple sources for AI to read

Delete documents

Displays file status, timestamp, and metadata

🧭 5. Support Page (New)

Includes a full customer support form:

Name

Email

Message

Sends the request to backend route /support

Redirects back to dashboard after submission

🎨 6. Modern Neon UI

Full dark neon gradient background

Glassmorphism panels

Floating glow effects

Smooth animations

🛠️ Tech Stack
Frontend

React (Vite / JSX)

React Router

Axios

Custom neon CSS UI

Backend

Node.js + Express

MongoDB + Mongoose

Multer for PDF uploads

Gemini AI SDK (Gemini 2.5 Flash Model)

📁 Project Structure
document-intelligence-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/       <-- PDF files stored here
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── public/
    ├── index.html
    └── package.json

⚙️ Environment Variables

Create backend/.env:

MONGO_URI=your_mongodb_connection_string
PORT=4000
GEMINI_API_KEY=your_gemini_api_key
LLM_MODEL=gemini-2.5-flash

🔧 Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/yourusername/document-intelligence-app.git
cd document-intelligence-app

2️⃣ Install Backend
cd backend
npm install
npm run dev


The server runs at:

http://localhost:4000

3️⃣ Install Frontend
cd ../frontend
npm install
npm run dev


The app runs at:

http://localhost:5173

🧪 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
Documents
Method	Endpoint	Description
POST	/api/documents/upload	Upload PDF
GET	/api/documents	Get all documents
DELETE	/api/documents/:id	Delete one document
Search / AI
Method	Endpoint	Description
POST	/api/search/query	Ask question to AI
Support
Method	Endpoint	Description
POST	/support	Submit support message
🎯 Usage Flow

Login / Sign up

Upload one or more PDFs

Select the file(s)

Ask questions in chat

See AI results instantly

View the PDF in preview panel

Visit Support page for help

🎨 UI Features

Floating animated neon blobs

Soft glassmorphism panels

Fully responsive layout

Smooth scrolling in chat

Highlight effects on hover

Beautiful gradients

🔐 Security

JWT authentication

Protected routes

Sanitized file uploads

CORS enabled

🧹 Future Enhancements

Multi-page PDF extraction

AI-based document classification

History of chats

Admin dashboard

Email notifications for support requests

🤝 Contributing

Pull requests are welcome!
Feel free to open issues or suggest improvements.

📜 License

MIT License © 2025