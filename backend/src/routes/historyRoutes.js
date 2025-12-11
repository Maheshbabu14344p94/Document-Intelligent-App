// backend/src/routes/historyRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  listHistory,
  getHistoryItem
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", auth, listHistory);
router.get("/:id", auth, getHistoryItem);

export default router;
