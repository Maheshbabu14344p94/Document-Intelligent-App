// src/components/ChatPanel.jsx
import React, { useState, useRef, useEffect } from "react";

function MessageBubble({ role, text }) {
  return (
    <div className={`bubble-row ${role === "user" ? "bubble-user" : "bubble-ai"}`}>
      <div className="bubble-avatar">
        {role === "user" ? "🧑" : "🤖"}
      </div>
      <div className="bubble-message">
        {text.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function ChatPanel({
  messages,
  onAsk,
  asking,
  selectedCount,
  totalDocs,
}) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, asking]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || asking) return;
    onAsk(input.trim());
    setInput("");
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div>
          <h3>Chat with your documents</h3>
          <p className="dim-text">
            {selectedCount
              ? `Using ${selectedCount} selected source(s).`
              : totalDocs
              ? `Using all ${totalDocs} source(s).`
              : "Upload a PDF to start chatting."}
          </p>
        </div>
      </div>

      <div className="chat-body">
        {messages.length === 0 && (
          <div className="chat-empty">
            <p>Ask anything about your uploaded PDFs.</p>
            <p className="dim-text">
              Example: &quot;Summarize the key points from chapter 3.&quot;
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.ts} role={msg.role} text={msg.text} />
        ))}

        {asking && (
          <div className="bubble-row bubble-ai">
            <div className="bubble-avatar">🤖</div>
            <div className="bubble-message typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-row">
        <input
          className="field-input chat-input"
          placeholder="Ask any question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={asking}
        />
        <button type="submit" className="btn btn-neon-small" disabled={asking}>
          {asking ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}
