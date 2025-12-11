// backend/src/models/QueryHistory.js
import mongoose from "mongoose";

const queryHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  documentsUsed: [
    {
      documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
      documentName: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const QueryHistory = mongoose.model("QueryHistory", queryHistorySchema);
export default QueryHistory;
