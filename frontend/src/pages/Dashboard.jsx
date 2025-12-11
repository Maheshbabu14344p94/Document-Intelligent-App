// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Sidebar from "../components/Sidebar.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import ChatPanel from "../components/ChatPanel.jsx";
import PdfPreviewPanel from "../components/PdfPreviewPanel.jsx";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoadingDocs(true);
      const res = await api.get("/documents");
      setDocuments(res.data.docs || []);
    } catch (err) {
      console.error("Failed to load documents", err);
    } finally {
      setLoadingDocs(false);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadBusy(true);
      const res = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const doc = res.data.doc;
      setDocuments((prev) => [doc, ...prev]);
      setActiveDoc(doc);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setUploadBusy(false);
      e.target.value = "";
    }
  }

  function toggleSelect(docId) {
    setSelectedIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  }

  async function handleDelete(docId) {
    const ok = window.confirm("Delete this document?");
    if (!ok) return;

    try {
      await api.delete(`/documents/${docId}`);
      setDocuments((prev) => prev.filter((d) => d._id !== docId));
      setSelectedIds((prev) => prev.filter((id) => id !== docId));
      if (activeDoc?._id === docId) setActiveDoc(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete document");
    }
  }

  async function handleAsk(question) {
    if (!question.trim()) return;
    if (!documents.length) {
      alert("Upload at least one document first.");
      return;
    }

    const usedIds = selectedIds.length
      ? selectedIds
      : documents.map((d) => d._id);

    const newMessages = [
      ...messages,
      { role: "user", text: question, ts: Date.now() },
    ];
    setMessages(newMessages);
    setAsking(true);

    try {
      const res = await api.post("/search/query", {
        question,
        documentIds: usedIds,
      });

      const answer = res.data.answer || res.data.error || "No answer.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer, ts: Date.now() },
      ]);
    } catch (err) {
      console.error("Query failed", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong while asking the question.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setAsking(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="dashboard-page neon-bg">
      <div className="floating-orbs" />

      {/* Top bar */}
      <header className="topbar glass-panel">
        <div className="topbar-left">
          <span className="topbar-logo">📄</span>
          <div>
            <div className="topbar-title">DocuMind Hub</div>
            <div className="topbar-subtitle">
              Document Intelligence & Knowledge Search
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-user">
            {user?.name ? `Hi, ${user.name}` : "Workspace"}
          </span>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="dashboard-layout">
        {/* LEFT: sources sidebar */}
        <Sidebar
          uploading={uploadBusy}
          onUpload={handleUpload}
          loadingDocs={loadingDocs}
        >
          <div className="sidebar-header">
            <h3>Your sources</h3>
            <span className="badge">
              {documents.length} file{documents.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="sidebar-list">
            {documents.map((doc) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                selected={selectedIds.includes(doc._id)}
                onToggleSelect={() => toggleSelect(doc._id)}
                onClick={() => setActiveDoc(doc)}
                onDelete={() => handleDelete(doc._id)}
              />
            ))}

            {!documents.length && !loadingDocs && (
              <p className="empty-hint">
                No documents yet. Upload a PDF to get started.
              </p>
            )}
          </div>
        </Sidebar>

        {/* CENTER: Chat */}
        <main className="center-panel glass-panel">
          <ChatPanel
            messages={messages}
            onAsk={handleAsk}
            asking={asking}
            selectedCount={selectedIds.length}
            totalDocs={documents.length}
          />
        </main>

        {/* RIGHT: PDF Preview */}
        <aside className="right-panel glass-panel">
          <PdfPreviewPanel doc={activeDoc} />
        </aside>
      </div>
    </div>
  );
}
