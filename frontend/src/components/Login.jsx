import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  // ==========================================
  // LOGIN FUNCTION
  // ==========================================

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");


    // ==========================================
    // CHECK NAME
    // ==========================================

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }


    // ==========================================
    // ADMIN PASSWORD CHECK
    // ==========================================

    if (
      role === "admin" &&
      password !== "campusflow123"
    ) {
      setError(
        "Incorrect admin password. Please try again."
      );

      return;
    }


    // ==========================================
    // CREATE LOGGED-IN USER
    // ==========================================

    const user = {
      name: name.trim(),
      email: email.trim(),
      role: role,
    };


    // ==========================================
    // SAVE CURRENT USER
    // ==========================================

    localStorage.setItem(
      "campusflowUser",
      JSON.stringify(user)
    );


    // ==========================================
    // NAVIGATE BASED ON ROLE
    // ==========================================

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };


  return (

    <div className="login-page">


      {/* ======================================
          LEFT SIDE
      ====================================== */}

      <div className="login-left">


        {/* BRAND */}

        <div className="login-brand">

          <div className="logo-icon">
            <Building2 size={28} />
          </div>

          <h2>
            Campus<span>Flow</span>
          </h2>

        </div>


        {/* HERO */}

        <div className="login-hero">


          <div className="hero-badge">

            <Sparkles size={16} />

            SMART CAMPUS MANAGEMENT

          </div>


          <h1>

            Your Campus.

            <br />

            <span>
              Better Organized.
            </span>

          </h1>


          <p>

            Discover available resources, avoid booking
            conflicts and manage your campus smarter with
            CampusFlow.

          </p>


          <div className="login-feature-list">


            <div>

              <ShieldCheck />

              <span>
                Secure Resource Booking
              </span>

            </div>


            <div>

              <GraduationCap />

              <span>
                Built for Students & Faculty
              </span>

            </div>


          </div>


        </div>

      </div>



      {/* ======================================
          RIGHT SIDE
      ====================================== */}

      <div className="login-right">


        <form
          className="login-card"
          onSubmit={handleLogin}
        >


          <span className="small-title">
            WELCOME BACK
          </span>


          <h2>
            Sign in to CampusFlow
          </h2>


          <p>
            Access your smart campus resource dashboard.
          </p>



          {/* ==================================
              ROLE SWITCH
          ================================== */}

          <div className="role-switch">


            <button
              type="button"
              className={
                role === "student"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setRole("student");
                setError("");
              }}
            >
              Student
            </button>


            <button
              type="button"
              className={
                role === "admin"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setRole("admin");
                setError("");
              }}
            >
              Admin
            </button>


          </div>



          {/* ==================================
              NAME
          ================================== */}

          <label>
            Full Name
          </label>


          <div className="login-input">

            <User size={18} />

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>



          {/* ==================================
              EMAIL
          ================================== */}

          <label>
            Email Address
          </label>


          <div className="login-input">

            <Mail size={18} />

            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>



          {/* ==================================
              PASSWORD
          ================================== */}

          <label>

            {role === "admin"
              ? "Admin Password"
              : "Password"}

          </label>


          <div className="login-input">

            <Lock size={18} />

            <input
              type="password"
              placeholder={
                role === "admin"
                  ? "Enter admin password"
                  : "Enter your password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>



          {/* ==================================
              ERROR MESSAGE
          ================================== */}

          {error && (

            <div className="login-error">

              <AlertCircle size={18} />

              <span>
                {error}
              </span>

            </div>

          )}



          {/* ==================================
              LOGIN BUTTON
          ================================== */}

          <button
            className="login-btn"
            type="submit"
          >

            Continue to CampusFlow

            <ArrowRight size={19} />

          </button>



          {/* ==================================
              DEMO TEXT
          ================================== */}

          <p className="demo-text">

            {role === "admin"
              ? "Admin access requires a valid password."
              : "Enter your details to access CampusFlow."}

          </p>


        </form>


      </div>


    </div>

  );
}

export default Login;