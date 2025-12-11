// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page neon-bg">
      <div className="floating-orbs" />
      <div className="landing-inner">
        <div className="landing-card glass-panel">
          <h1 className="landing-title">
            <span>Document Intelligence</span>
            <span className="gradient-text">& Knowledge Search Hub</span>
          </h1>

          <p className="landing-subtitle">
            Upload your PDFs, select your sources, and chat with an AI that
            actually reads your documents.
          </p>

          <button
            className="btn btn-neon-large"
            onClick={() => navigate("/login")}
          >
            Start
          </button>

          <p className="landing-note">
            Already have an account?{" "}
            <button
              className="link-inline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
