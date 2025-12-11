// backend/src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

const app = express();

// ESM dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ⭐ ABSOLUTE FIX (works on Windows/Mac/Linux)
const uploadsPath = path.resolve(__dirname, "../uploads");
console.log("📂 Serving uploads from:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/history", historyRoutes);

// Health API
app.get("/api/health", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global error handler:", err);
  res.status(500).json({
    error: err.message || "Server error"
  });
});

export default app;
