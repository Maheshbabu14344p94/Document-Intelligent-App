// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page neon-bg">
      <div className="floating-orbs" />

      <div className="auth-card glass-panel">

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Sign in to continue to your Workspace.
        </p>

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">

          <label className="field-label">
            Email
            <input
              type="email"
              name="login_email_x"
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
              name="login_pass_x"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn btn-neon" disabled={busy}>
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-meta">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="link-inline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
