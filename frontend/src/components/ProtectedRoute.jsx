import React from "react";

export default function ProtectedRoute({
  user,
  allowedRole,
  children,
  onAccessDenied,
}) {
  // User logged in nahi hai
  if (!user) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="glass-card" style={{ padding: "40px", maxWidth: "450px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🔐</div>

          <h2 style={{ marginBottom: "10px" }}>Login Required</h2>

          <p style={{ color: "var(--text-muted)" }}>
            Please login to access CampusFlow.
          </p>
        </div>
      </div>
    );
  }

  // Role allowed nahi hai
  if (allowedRole && user.role !== allowedRole) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "40px",
            maxWidth: "480px",
            border: "1px solid rgba(236,72,153,0.3)",
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "15px" }}>
            🚫
          </div>

          <h2 style={{ marginBottom: "12px" }}>
            Access Restricted
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "25px",
              lineHeight: 1.6,
            }}
          >
            You don't have permission to access this area.
            This section is available only for authorized administrators.
          </p>

          <button
            className="btn-gradient"
            onClick={() => {
              if (onAccessDenied) {
                onAccessDenied();
              }
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // User authorized hai
  return children;
}