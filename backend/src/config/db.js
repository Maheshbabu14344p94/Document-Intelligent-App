// backend/src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/document_intel";

  if (!uri) {
    throw new Error("MONGO_URI not set in .env");
  }

  await mongoose.connect(uri, { dbName: "document_intel" });
  console.log("✅ MongoDB connected");
}
