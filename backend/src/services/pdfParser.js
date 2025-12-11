// backend/src/services/pdfParser.js
import fs from "fs";
import pdfParse from "pdf-parse";

/**
 * Extracts plain text from a PDF file.
 * @param {string} filePath - Absolute path to the uploaded PDF
 * @returns {Promise<string>} - extracted text
 */
export async function extractTextFromPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  const text = data.text || "";

  // simple cleanup
  return text.replace(/\s+/g, " ").trim();
}
