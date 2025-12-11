// backend/src/routes/documentRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  uploadDocument,
  listDocuments,
  getDocument,
  deleteDocument
} from "../controllers/documentController.js";
import { upload } from "../services/storageService.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadDocument);
router.get("/", auth, listDocuments);
router.get("/:id", auth, getDocument);
router.delete("/:id", auth, deleteDocument);

export default router;
