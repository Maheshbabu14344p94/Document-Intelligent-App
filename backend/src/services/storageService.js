// backend/src/services/storageService.js
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const STORAGE_DIR =
  process.env.STORAGE_DIR ||
  path.join(process.cwd(), "uploads");

// ensure uploads directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
  console.log("📁 Created uploads directory at", STORAGE_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `file-${ts}${ext}`);
  }
});

// only allow pdf / txt
function fileFilter(req, file, cb) {
  const allowed = ["application/pdf", "text/plain"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and TXT files are allowed"), false);
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

export function getStoragePath(filename) {
  // what is exposed via Express static
  return `/uploads/${filename}`;
}

export { STORAGE_DIR };
