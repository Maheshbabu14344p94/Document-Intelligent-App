// src/components/DocumentCard.jsx
import React from "react";

export default function DocumentCard({
  doc,
  selected,
  onToggleSelect,
  onClick,
  onDelete,
}) {
  const statusClass =
    doc.status === "processed"
      ? "status-pill success"
      : doc.status === "processing"
      ? "status-pill warning"
      : "status-pill danger";

  return (
    <div
      className={`doc-card ${selected ? "doc-card-selected" : ""}`}
      onClick={onClick}
    >
      <div className="doc-card-main">
        <div className="doc-card-left">
          <input
            type="checkbox"
            checked={!!selected}
            onChange={(e) => {
              e.stopPropagation();
              onToggleSelect();
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="doc-card-info">
          <div className="doc-card-name" title={doc.name}>
            {doc.name}
          </div>
          <div className="doc-card-meta">
            <span className={statusClass}>{doc.status}</span>
            <span className="doc-card-date">
              {new Date(doc.uploadedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <button
        className="doc-card-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete document"
      >
        ✕
      </button>
    </div>
  );
}
