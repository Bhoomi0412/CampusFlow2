import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Radio,
  ShieldCheck,
  LogOut,
  Building2,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusflowUser") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("campusflowUser");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Building2 size={24} />
          </div>

          <div>
            <h2>
              Campus<span>Flow</span>
            </h2>
            <p>SMART CAMPUS</p>
          </div>
        </div>

        <div className="sidebar-menu">
          <p className="menu-label">MAIN MENU</p>

          <NavLink to="/dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink to="/venue-finder">
            <Search size={19} />
            Find Resource
          </NavLink>

          <NavLink to="/my-bookings">
            <CalendarDays size={19} />
            My Bookings
          </NavLink>

          <NavLink to="/live-status">
            <Radio size={19} />
            Live Status
          </NavLink>

          {user.role === "admin" && (
            <NavLink to="/admin">
              <ShieldCheck size={19} />
              Admin Center
            </NavLink>
          )}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="smart-tip">
          <Sparkles size={18} />
          <div>
            <strong>Smart Tip</strong>
            <p>Book early to get the best venues!</p>
          </div>
        </div>

        <div className="user-profile">
          <div className="avatar">
            {user.name?.charAt(0) || "U"}
          </div>

          <div>
            <strong>{user.name || "Campus User"}</strong>
            <span>
              {user.role === "admin" ? "Administrator" : "Student"}
            </span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Navbar;