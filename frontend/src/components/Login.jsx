import React, { useState } from "react";
import { User, ShieldCheck, Lock, Mail, ArrowRight, X } from "lucide-react";

export default function Login({ onLogin, onClose }) {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Demo Admin Password
  const ADMIN_PASSWORD = "campusflow123";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // STUDENT LOGIN
    if (role === "student") {
      if (!name.trim() || !email.trim()) {
        setError("Please enter your name and email.");
        return;
      }

      onLogin({
        name: name,
        email: email,
        role: "student",
      });

      return;
    }

    // ADMIN LOGIN
    if (role === "admin") {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Please fill all admin login details.");
        return;
      }

      if (password !== ADMIN_PASSWORD) {
        setError("Incorrect admin password!");
        return;
      }

      onLogin({
        name: name,
        email: email,
        role: "admin",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(124,58,237,0.25), transparent 30%), radial-gradient(circle at bottom left, rgba(34,211,238,0.15), transparent 30%), #080B16",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              right: "18px",
              top: "18px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-subtle)",
              color: "white",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              margin: "0 auto 16px",
              borderRadius: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(135deg, var(--purple-primary), var(--cyan-electric))",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                fontWeight: "900",
                color: "white",
              }}
            >
              CF
            </span>
          </div>

          <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
            Welcome to{" "}
            <span className="gradient-text-purple-cyan">CampusFlow</span>
          </h1>

          <p style={{ color: "var(--text-muted)" }}>
            Sign in to manage campus resources smarter.
          </p>
        </div>

        {/* Role Selector */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          {/* Student */}
          <button
            type="button"
            onClick={() => {
              setRole("student");
              setError("");
            }}
            style={{
              padding: "16px",
              borderRadius: "14px",
              cursor: "pointer",
              border:
                role === "student"
                  ? "1px solid var(--cyan-electric)"
                  : "1px solid var(--border-subtle)",
              background:
                role === "student"
                  ? "rgba(34,211,238,0.12)"
                  : "rgba(255,255,255,0.03)",
              color: "white",
            }}
          >
            <User
              size={24}
              color={
                role === "student"
                  ? "var(--cyan-electric)"
                  : "var(--text-muted)"
              }
            />

            <div style={{ marginTop: "8px", fontWeight: "700" }}>
              Student / Faculty
            </div>
          </button>

          {/* Admin */}
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            style={{
              padding: "16px",
              borderRadius: "14px",
              cursor: "pointer",
              border:
                role === "admin"
                  ? "1px solid var(--purple-bright)"
                  : "1px solid var(--border-subtle)",
              background:
                role === "admin"
                  ? "rgba(168,85,247,0.12)"
                  : "rgba(255,255,255,0.03)",
              color: "white",
            }}
          >
            <ShieldCheck
              size={24}
              color={
                role === "admin"
                  ? "var(--purple-bright)"
                  : "var(--text-muted)"
              }
            />

            <div style={{ marginTop: "8px", fontWeight: "700" }}>
              Administrator
            </div>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-muted)",
              }}
            >
              Full Name
            </label>

            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "14px",
                  color: "var(--text-muted)",
                }}
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 45px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "var(--text-muted)",
              }}
            >
              Email Address
            </label>

            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "14px",
                  color: "var(--text-muted)",
                }}
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 45px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-subtle)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Password - ONLY ADMIN */}
          {role === "admin" && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "var(--text-muted)",
                }}
              >
                Admin Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "14px",
                    color: "var(--text-muted)",
                  }}
                />

                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 14px 14px 45px",
                    borderRadius: "10px",
                    border: "1px solid var(--border-subtle)",
                    background: "rgba(255,255,255,0.04)",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(236,72,153,0.12)",
                border: "1px solid rgba(236,72,153,0.35)",
                color: "#F472B6",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "18px",
                textAlign: "center",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="btn-gradient"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "15px",
              fontSize: "1rem",
            }}
          >
            {role === "admin"
              ? "Secure Admin Login"
              : "Sign In to CampusFlow"}

            <ArrowRight size={18} />
          </button>
        </form>

        {role === "admin" && (
          <p
            style={{
              textAlign: "center",
              marginTop: "18px",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            🔐 Secure access for authorized administrators only
          </p>
        )}
      </div>
    </div>
  );
}