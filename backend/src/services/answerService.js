// backend/src/services/answerService.js
import { getTextModel } from "../config/aiClient.js";

export async function generateAnswer(question, contextText) {
  try {
    const model = getTextModel();

    const prompt = `
Use ONLY the document text below to answer the question.
If the answer is not found, say "Not enough information."

Document Text:
${contextText}

Question: ${question}
Answer:
`;

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return response.response.text();

  } catch (err) {
    console.error("🔥 GEMINI ERROR:", err);
    throw new Error(err.message);
  }
}
