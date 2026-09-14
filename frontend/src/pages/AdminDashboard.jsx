import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  History,
  Building2,
  ClipboardList,
  BarChart3,
  TriangleAlert,
  Settings,
  Bell,
  Plus,
  CheckCircle2,
  Clock3,
  Users,
  Trophy,
  ArrowUpRight,
  MapPin,
  Activity,
  PackageCheck,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // ==============================
  // GET LOGGED-IN ADMIN
  // ==============================

  const currentUser =
    JSON.parse(localStorage.getItem("campusflowUser")) || {};

  const adminName = currentUser.name || "Administrator";

  // ==============================
  // NAVIGATION
  // ==============================

  const handleNavigation = (name, path) => {
    setActiveMenu(name);
    navigate(path);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Event Management",
      icon: CalendarDays,
      path: "/admin/events",
    },
    {
      name: "Event Timeline",
      icon: History,
      path: "/admin/timeline",
    },
    {
      name: "Past Events",
      icon: Clock3,
      path: "/admin/past-events",
    },
    {
      name: "Resources",
      icon: Building2,
      path: "/admin/resources",
    },
    {
      name: "Booking Requests",
      icon: ClipboardList,
      path: "/admin/approvals",
    },
    {
      name: "Equipment Returns",
      icon: PackageCheck,
      path: "/admin/returns",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      name: "Conflict Center",
      icon: TriangleAlert,
      path: "/admin/conflicts",
    },
  ];

  const stats = [
    {
      label: "TOTAL RESOURCES",
      value: "15",
      description: "Campus facilities",
      icon: Building2,
    },
    {
      label: "UPCOMING EVENTS",
      value: "2",
      description: "Scheduled activities",
      icon: CalendarDays,
    },
    {
      label: "COMPLETED EVENTS",
      value: "3",
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      label: "PENDING REQUESTS",
      value: "0",
      description: "Requires attention",
      icon: Clock3,
    },
    {
      label: "TOTAL PARTICIPANTS",
      value: "1300",
      description: "Across campus events",
      icon: Users,
    },
    {
      label: "AVG. SUCCESS SCORE",
      value: "91%",
      description: "Completed events",
      icon: Trophy,
    },
  ];

  const recentActivities = [
    {
      title: "Seminar Hall A booking approved",
      subtitle: "Academic Block A • Today",
      status: "Approved",
      icon: CheckCircle2,
    },
    {
      title: "Tech Fest 2026 scheduled",
      subtitle: "Main Auditorium • Tomorrow",
      status: "Upcoming",
      icon: CalendarDays,
    },
    {
      title: "Computer Lab B request received",
      subtitle: "Computer Science Block • Pending review",
      status: "Pending",
      icon: Clock3,
    },
  ];

  const resources = [
    {
      name: "Seminar Hall A",
      location: "Academic Block A",
      status: "Available",
    },
    {
      name: "Main Auditorium",
      location: "Central Campus",
      status: "Occupied",
    },
    {
      name: "Computer Lab B",
      location: "Technology Block",
      status: "Available",
    },
  ];

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem("campusflowUser");
    navigate("/login");
  };

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-icon">
            CF
          </div>

          <div>
            <h2>
              CAMPUS<span>FLOW</span>
            </h2>

            <p>ADMIN CONTROL</p>
          </div>

        </div>

        <div className="admin-menu-label">
          ADMINISTRATION
        </div>

        <nav className="admin-nav">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`admin-nav-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(item.name, item.path)
                }
              >
                <Icon size={19} />

                <span>{item.name}</span>
              </button>
            );
          })}

        </nav>

        <div className="admin-sidebar-bottom">

          <div className="admin-user">

            <div className="admin-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{adminName}</strong>
              <span>Campus Admin</span>
            </div>

          </div>

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="admin-main">

        {/* ================= TOPBAR ================= */}

        <div className="admin-topbar">

          <div></div>

          <div className="admin-top-actions">

            <button
              className="notification-button"
              onClick={() => navigate("/admin/approvals")}
            >
              <Bell size={21} />
              <span></span>
            </button>

            <button
              className="create-event-btn"
              onClick={() => navigate("/admin/create-event")}
            >
              <Plus size={18} />
              Create Event
            </button>

          </div>

        </div>

        {/* ================= HEADER ================= */}

        <section className="admin-header">

          <div>

            <div className="admin-overline">
              ADMINISTRATION CONTROL PANEL
            </div>

            <h1>
              Welcome back, {adminName}
            </h1>

            <p>
              Monitor resources, events, bookings and campus performance
              from one intelligent control center.
            </p>

          </div>

          <div className="admin-header-status">

            <Activity size={19} />

            <div>
              <span>System Status</span>
              <strong>All Systems Operational</strong>
            </div>

          </div>

        </section>

        {/* ================= STATS ================= */}

        <section className="admin-stats-grid">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                className="admin-stat-card"
                key={index}
              >

                <div className="admin-stat-top">

                  <div>
                    <p>{stat.label}</p>
                    <h2>{stat.value}</h2>
                  </div>

                  <div className="admin-stat-icon">
                    <Icon size={24} />
                  </div>

                </div>

                <span>{stat.description}</span>

              </div>
            );
          })}

        </section>

        {/* ================= DASHBOARD GRID ================= */}

        <section className="admin-dashboard-grid">

          {/* RECENT ACTIVITY */}

          <div className="admin-panel admin-activity-panel">

            <div className="admin-panel-header">

              <div>
                <span className="panel-kicker">
                  CAMPUS ACTIVITY
                </span>

                <h2>Recent Activity</h2>
              </div>

              <button
                className="panel-link"
                onClick={() => navigate("/admin/timeline")}
              >
                View All
                <ArrowUpRight size={17} />
              </button>

            </div>

            <div className="activity-list">

              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    className="activity-item"
                    key={index}
                  >

                    <div
                      className={`activity-icon ${
                        activity.status.toLowerCase()
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="activity-content">

                      <h3>{activity.title}</h3>

                      <p>{activity.subtitle}</p>

                    </div>

                    <span
                      className={`activity-status ${
                        activity.status.toLowerCase()
                      }`}
                    >
                      {activity.status}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          {/* RESOURCES */}

          <div className="admin-panel admin-resource-panel">

            <div className="admin-panel-header">

              <div>

                <span className="panel-kicker">
                  LIVE OVERVIEW
                </span>

                <h2>Campus Resources</h2>

              </div>

              <button
                className="panel-link"
                onClick={() => navigate("/admin/resources")}
              >
                Manage
                <ArrowUpRight size={17} />
              </button>

            </div>

            <div className="resource-list">

              {resources.map((resource, index) => (

                <div
                  className="resource-item"
                  key={index}
                >

                  <div className="resource-main">

                    <div className="resource-building">
                      <Building2 size={20} />
                    </div>

                    <div>

                      <h3>{resource.name}</h3>

                      <p>
                        <MapPin size={14} />
                        {resource.location}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`resource-status ${
                      resource.status.toLowerCase()
                    }`}
                  >
                    {resource.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================= BOTTOM ================= */}

        <section className="admin-bottom-grid">

          {/* QUICK ACTIONS */}

          <div className="admin-panel quick-actions-panel">

            <div className="admin-panel-header">

              <div>

                <span className="panel-kicker">
                  MANAGEMENT
                </span>

                <h2>Quick Actions</h2>

              </div>

            </div>

            <div className="quick-actions-grid">

              <button
                onClick={() =>
                  navigate("/admin/create-event")
                }
              >
                <CalendarDays size={22} />
                <span>Create Event</span>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/approvals")
                }
              >
                <ClipboardList size={22} />
                <span>Review Requests</span>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/resources")
                }
              >
                <Building2 size={22} />
                <span>Manage Resources</span>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/returns")
                }
              >
                <PackageCheck size={22} />
                <span>Verify Returns</span>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/conflicts")
                }
              >
                <TriangleAlert size={22} />
                <span>Check Conflicts</span>
              </button>

            </div>

          </div>

          {/* PERFORMANCE */}

          <div className="admin-panel performance-panel">

            <div className="admin-panel-header">

              <div>

                <span className="panel-kicker">
                  PERFORMANCE
                </span>

                <h2>Campus Performance</h2>

              </div>

              <button
                className="panel-link"
                onClick={() =>
                  navigate("/admin/analytics")
                }
              >
                Analytics
                <ArrowUpRight size={17} />
              </button>

            </div>

            <div className="performance-content">

              <div className="performance-score">
                91%
              </div>

              <div className="performance-info">

                <h3>
                  Excellent Performance
                </h3>

                <p>
                  Your campus resource management system is
                  performing efficiently this month.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}