// backend/src/controllers/searchController.js
import Document from "../models/Document.js";
import QueryHistory from "../models/QueryHistory.js";
import { getTextModel } from "../config/aiClient.js";

export async function queryDocuments(req, res, next) {
  try {
    const { question, documentIds } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    // 1) Load documents for this user
    let docsQuery = { userId: req.user._id, status: "processed" };

    if (Array.isArray(documentIds) && documentIds.length > 0) {
      docsQuery._id = { $in: documentIds };
    }

    const docs = await Document.find(docsQuery).sort({ uploadedAt: -1 });

    if (!docs.length) {
      return res.status(400).json({
        error: "No processed documents found for this user"
      });
    }

    // 2) Build context from all docs (simple concat)
    const context = docs
      .map(
        (d, idx) =>
          `-- Document ${idx + 1}: ${d.name} --\n${d.fullText || ""}\n`
      )
      .join("\n\n");

    const systemPrompt = `
You are an AI assistant for a document Q&A system.

You MUST:
- Answer only using the information contained in the "Documents" context.
- If the answer is not clearly present, reply exactly: "Not enough information in the uploaded documents."
- When possible, mention which document you used in your explanation.
Be concise and clear.
`;

    const finalPrompt = `
${systemPrompt}

Documents:
${context}

User question:
${question}

Your answer:
`;

    // 3) Call Gemini
    const model = getTextModel();
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }]
        }
      ]
    });

    const answer = result.response.text();

    // 4) Save history
    const history = await QueryHistory.create({
      userId: req.user._id,
      question,
      answer,
      documentsUsed: docs.map((d) => ({
        documentId: d._id,
        documentName: d.name
      }))
    });

    res.json({
      answer,
      historyId: history._id,
      documentsUsed: history.documentsUsed
    });
  } catch (err) {
    console.error("❌ SearchController Error:", err);
    next(err);
  }
}
