// src/components/PdfPreviewPanel.jsx
import React from "react";

export default function PdfPreviewPanel({ doc }) {
  if (!doc) {
    return (
      <div className="preview-panel">
        <h3>Document preview</h3>
        <p className="dim-text">
          Select a document from the left to preview it here.
        </p>
      </div>
    );
  }

  const pdfUrl = `http://localhost:4000${doc.storagePath}`;

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div>
          <h3 className="truncate">{doc.name}</h3>
          <p className="dim-text">
            Uploaded{" "}
            {new Date(doc.uploadedAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="preview-frame-wrapper">
        <iframe
          title={doc.name}
          src={pdfUrl}
          className="preview-frame"
        />
      </div>
    </div>
  );
}
