// backend/src/server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();

    console.log("👉 MODEL LOADED:", process.env.LLM_MODEL);
    console.log("🔑 GEMINI KEY LOADED:", process.env.GEMINI_API_KEY ? "YES" : "NO");

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
