import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

console.log("🟦 aiClient.js LOADED");
console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "YES" : "NO");
console.log("📌 LLM_MODEL:", process.env.LLM_MODEL);

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiEndpoint: "https://generativelanguage.googleapis.com/v1"
});

export function getTextModel() {
  console.log("👉 Using LLM model:", process.env.LLM_MODEL);
  return genAI.getGenerativeModel({
    model: process.env.LLM_MODEL
  });
  
}
// IMAGE MODEL
export function getImageModel() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro-vision"  // Supports image generation
  });
}
