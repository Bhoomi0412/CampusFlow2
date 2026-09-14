import React, { useState } from "react";
import {
  Building2,
  LayoutDashboard,
  Search,
  Activity,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  UserCircle,
  History,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

export default function Navbar({
  user,
  currentPage,
  setCurrentPage,
  onLogout,
}) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    setShowLogoutModal(false);
    setMobileMenu(false);
    onLogout();
  };

  /* =========================
     DIFFERENT NAVIGATION
     FOR ADMIN & STUDENT
  ========================= */

  const studentNavItems = [
    {
      name: "Dashboard",
      page: "dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Find Resource",
      page: "finder",
      icon: <Search size={18} />,
    },
    {
      name: "Live Status",
      page: "status",
      icon: <Activity size={18} />,
    },
  ];

  const adminNavItems = [
    {
      name: "Command Center",
      page: "admin",
      icon: <ShieldCheck size={18} />,
    },
    {
      name: "Event History",
      page: "admin-events",
      icon: <History size={18} />,
    },
    {
      name: "Approvals",
      page: "admin-approvals",
      icon: <ClipboardCheck size={18} />,
    },
    {
      name: "Analytics",
      page: "admin-analytics",
      icon: <BarChart3 size={18} />,
    },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenu(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(8, 11, 22, 0.92)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* ================= LOGO ================= */}

        <div
          onClick={() =>
            handleNavigation(isAdmin ? "admin" : "dashboard")
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, var(--purple-primary), var(--cyan-electric))",
              padding: "9px",
              borderRadius: "12px",
              display: "flex",
              boxShadow: "0 0 20px rgba(124,58,237,0.35)",
            }}
          >
            <Building2 size={22} color="#fff" />
          </div>

          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 900,
              letterSpacing: "0.05em",
            }}
          >
            CAMPUS
            <span className="gradient-text-purple-cyan">
              FLOW
            </span>
          </span>

          {isAdmin && (
            <span
              style={{
                fontSize: "0.65rem",
                padding: "5px 9px",
                borderRadius: "20px",
                background: "rgba(168,85,247,0.15)",
                border: "1px solid rgba(168,85,247,0.3)",
                color: "var(--purple-bright)",
                fontWeight: 800,
                marginLeft: "5px",
              }}
            >
              ADMIN
            </span>
          )}
        </div>

        {/* ================= DESKTOP NAV ================= */}

        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {navItems.map((item) => {
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: active
                    ? isAdmin
                      ? "1px solid rgba(168,85,247,0.4)"
                      : "1px solid rgba(34,211,238,0.3)"
                    : "1px solid transparent",
                  background: active
                    ? isAdmin
                      ? "rgba(168,85,247,0.12)"
                      : "rgba(34,211,238,0.08)"
                    : "transparent",
                  color: active
                    ? isAdmin
                      ? "var(--purple-bright)"
                      : "var(--cyan-electric)"
                    : "var(--text-muted)",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "0.3s",
                }}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* ================= USER AREA ================= */}

        <div
          className="desktop-user"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "12px",
              background: isAdmin
                ? "rgba(168,85,247,0.06)"
                : "rgba(255,255,255,0.03)",
              border: isAdmin
                ? "1px solid rgba(168,85,247,0.18)"
                : "1px solid var(--border-subtle)",
            }}
          >
            <UserCircle
              size={27}
              color={
                isAdmin
                  ? "var(--purple-bright)"
                  : "var(--cyan-electric)"
              }
            />

            <div style={{ lineHeight: 1.2 }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {user?.name || "User"}
              </div>

              <div
                style={{
                  fontSize: "0.65rem",
                  marginTop: "3px",
                  color: isAdmin
                    ? "var(--purple-bright)"
                    : "var(--cyan-electric)",
                  fontWeight: 700,
                }}
              >
                {isAdmin
                  ? "SYSTEM ADMINISTRATOR"
                  : "STUDENT / FACULTY"}
              </div>
            </div>
          </div>

          {/* LOGOUT */}

          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(236,72,153,0.3)",
              background: "rgba(236,72,153,0.08)",
              color: "#F472B6",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-subtle)",
            color: "white",
            padding: "9px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      {/* ================= MOBILE NAV ================= */}

      {mobileMenu && (
        <div
          style={{
            position: "fixed",
            top: "75px",
            left: "12px",
            right: "12px",
            zIndex: 99,
            padding: "18px",
            borderRadius: "18px",
            background: "rgba(15,18,35,0.98)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* USER */}

          <div
            style={{
              padding: "14px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "12px",
            }}
          >
            <strong>{user?.name}</strong>

            <div
              style={{
                fontSize: "0.75rem",
                marginTop: "5px",
                color: isAdmin
                  ? "var(--purple-bright)"
                  : "var(--cyan-electric)",
              }}
            >
              {isAdmin
                ? "SYSTEM ADMINISTRATOR"
                : "STUDENT / FACULTY"}
            </div>
          </div>

          {/* NAVIGATION */}

          {navItems.map((item) => {
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px",
                  marginBottom: "6px",
                  borderRadius: "10px",
                  border: "none",
                  background: active
                    ? isAdmin
                      ? "rgba(168,85,247,0.12)"
                      : "rgba(34,211,238,0.1)"
                    : "transparent",
                  color: active
                    ? isAdmin
                      ? "var(--purple-bright)"
                      : "var(--cyan-electric)"
                    : "var(--text-muted)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}

          {/* MOBILE LOGOUT */}

          <button
            onClick={() => {
              setMobileMenu(false);
              setShowLogoutModal(true);
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px",
              marginTop: "12px",
              borderRadius: "10px",
              border: "1px solid rgba(236,72,153,0.3)",
              background: "rgba(236,72,153,0.08)",
              color: "#F472B6",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* ================= LOGOUT MODAL ================= */}

      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(3,5,15,0.78)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "440px",
              padding: "36px",
              textAlign: "center",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(236,72,153,0.12)",
                color: "#F472B6",
              }}
            >
              <LogOut size={34} />
            </div>

            <h2>Ready to Leave?</h2>

            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: "12px 0 28px",
              }}
            >
              Are you sure you want to logout from CampusFlow?
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn-secondary"
                style={{
                  justifyContent: "center",
                  padding: "13px",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  borderRadius: "30px",
                  padding: "13px",
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "white",
                  background:
                    "linear-gradient(135deg, #EC4899, #EF4444)",
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}