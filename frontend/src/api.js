// src/api.js
// frontend/src/api.js
import axios from "axios";

// Use environment variable or fallback to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
});

// ... rest of your code

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function generateAIImage(prompt) {
  return api.post("/features/image", { prompt });
}

export async function generateAIDocumentation(text) {
  return api.post("/features/documentation", { text });
}

export default api;
