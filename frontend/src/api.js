// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

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
