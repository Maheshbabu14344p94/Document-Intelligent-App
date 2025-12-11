import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
  children,
  uploading,
  onUpload,
  loadingDocs,
}) {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-top">
        <div className="sidebar-title-block">
          <div className="sidebar-title">Sources</div>
          <p className="sidebar-subtitle">
            Add PDFs and select which ones the AI should read.
          </p>
        </div>

        <label className="upload-dropzone">
          <input
            type="file"
            accept="application/pdf"
            onChange={onUpload}
            disabled={uploading}
          />
          <div className="upload-inner">
            <span className="upload-icon">⬆</span>
            <span className="upload-text">
              {uploading ? "Uploading..." : "Upload PDF"}
            </span>
          </div>
        </label>
      </div>

      <div className="sidebar-body">
        {loadingDocs ? <p className="dim-text">Loading documents…</p> : children}

        {/* NEW: Customer Support Button */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/support" className="btn btn-neon-small" style={{ width: "100%" }}>
            Customer Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
