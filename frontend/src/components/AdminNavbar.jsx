import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  Clock3,
  Building2,
  ClipboardList,
  PackageCheck,
  BarChart3,
  TriangleAlert,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminNavbar() {
  const currentUser =
    JSON.parse(localStorage.getItem("campusflowUser")) || {};

  const userName = currentUser.name || "Administrator";

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

  const handleLogout = () => {
    localStorage.removeItem("campusflowUser");
    window.location.href = "/login";
  };

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}

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


      {/* LABEL */}

      <div className="admin-menu-label">
        ADMINISTRATION
      </div>


      {/* NAVIGATION */}

      <nav className="admin-nav">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `admin-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={19} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </nav>


      {/* BOTTOM USER */}

      <div className="admin-sidebar-bottom">

        <div className="admin-user">

          <div className="admin-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="admin-user-info">

            <strong>
              {userName}
            </strong>

            <span>
              Campus Admin
            </span>

          </div>

        </div>


        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={17} />

          Logout

        </button>

      </div>

    </aside>
  );
}