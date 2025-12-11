import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate(); // <-- navigate hook

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    try {
      await api.post("/support", { name, email, message });

      alert("Your request has been sent successfully!");

      // Clear fields
      setName("");
      setEmail("");
      setMessage("");

      // Redirect to dashboard after 500ms
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      console.error(err);
      alert("Failed to send support request.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="neon-bg" style={{ padding: "40px" }}>
      <div className="glass-panel" style={{ maxWidth: "600px", margin: "auto", padding: "30px" }}>
        
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Customer Support
        </h2>

        <p style={{ textAlign: "center", color: "#a6b0d8", marginBottom: "20px" }}>
          Submit your query and we will get back to you soon.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <label className="field-label">
            Name
            <input
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="field-label">
            Email
            <input
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <label className="field-label">
            Message
            <textarea
              className="field-input"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              required
              style={{ resize: "none" }}
            />
          </label>

          <button className="btn btn-neon" disabled={sending}>
            {sending ? "Sending..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}
