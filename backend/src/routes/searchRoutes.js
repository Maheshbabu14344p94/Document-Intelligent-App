// backend/src/routes/searchRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import { queryDocuments } from "../controllers/searchController.js";

const router = express.Router();

router.post("/query", auth, queryDocuments);

export default router;
