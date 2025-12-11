// backend/src/controllers/documentController.js
import path from "path";
import { fileURLToPath } from "url";

import Document from "../models/Document.js";
import { extractTextFromPdf } from "../services/pdfParser.js";
import { getStoragePath, STORAGE_DIR } from "../services/storageService.js";
import { safeUnlink } from "../utils/fileUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadDocument(req, res, next) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create DB record in "uploaded" state
    const doc = await Document.create({
      userId: req.user._id,
      name: file.originalname,
      filename: file.filename,
      storagePath: getStoragePath(file.filename),
      mimeType: file.mimetype,
      size: file.size,
      status: "uploaded"
    });

    // Absolute path to file
    const filePath = path.join(STORAGE_DIR, file.filename);

    try {
      let fullText = "";

      if (file.mimetype === "application/pdf") {
        fullText = await extractTextFromPdf(filePath);
      } else if (file.mimetype === "text/plain") {
        // simple TXT handling
        fullText = (await import("fs")).default.readFileSync(filePath, "utf8");
      }

      await Document.findByIdAndUpdate(doc._id, {
        fullText,
        status: "processed"
      });

    } catch (parseErr) {
      console.error("❌ Document parsing failed:", parseErr);
      await Document.findByIdAndUpdate(doc._id, { status: "failed" });
    }

    const updated = await Document.findById(doc._id);
    res.json({ doc: updated });
  } catch (err) {
    next(err);
  }
}

export async function listDocuments(req, res, next) {
  try {
    const docs = await Document
      .find({ userId: req.user._id })
      .sort({ uploadedAt: -1 });

    res.json({ docs });
  } catch (err) {
    next(err);
  }
}

export async function getDocument(req, res, next) {
  try {
    const doc = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    const doc = await Document.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!doc) {
      return res.status(404).json({ error: "Not found" });
    }

    // delete file from disk
    const absolutePath = path.join(STORAGE_DIR, doc.filename);
    safeUnlink(absolutePath);

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
