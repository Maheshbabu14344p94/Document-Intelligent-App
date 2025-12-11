// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page neon-bg">
      <div className="floating-orbs" />

      <div className="auth-card glass-panel">

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Join the hub and let AI read your documents for you.
        </p>

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">

          <label className="field-label">
            Name
            <input
              type="text"
              name="reg_name_x"
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="off"
              required
            />
          </label>

          <label className="field-label">
            Email
            <input
              type="email"
              name="reg_email_x"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
          </label>

          <label className="field-label">
            Password
            <input
              type="password"
              name="reg_pass_x"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn btn-neon" disabled={busy}>
            {busy ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-meta">
          Already have an account?{" "}
          <Link to="/login" className="link-inline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
