// backend/src/models/Document.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },          // original filename
  filename: { type: String, required: true },      // stored filename
  storagePath: { type: String, required: true },   // /uploads/...
  mimeType: { type: String },
  size: { type: Number },

  fullText: { type: String, default: "" },         // extracted text

  status: {
    type: String,
    enum: ["uploaded", "processed", "failed"],
    default: "uploaded"
  },

  uploadedAt: { type: Date, default: Date.now }
});

const Document = mongoose.model("Document", documentSchema);
export default Document;
