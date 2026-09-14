import { Link } from "react-router-dom";

import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="brand">
          <div className="logo-icon">
            <Building2 size={22} />
          </div>

          <h2>
            Campus<span>Flow</span>
          </h2>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">
            Sign In
          </Link>

          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            SMART CAMPUS RESOURCE PLATFORM
          </div>

          <h1>
            Book Smarter.
            <br />
            <span>Avoid Conflicts.</span>
            <br />
            Optimize Resources.
          </h1>

          <p>
            CampusFlow helps students, faculty and
            administrators discover, book and manage campus
            resources through a smart and efficient platform.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn-primary big-btn">
              Explore CampusFlow
              <ArrowRight size={20} />
            </Link>

            <a href="#features" className="btn-outline">
              Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>100%</strong>
              <span>Smarter Booking</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Resource Access</span>
            </div>

            <div>
              <strong>Real-Time</strong>
              <span>Availability</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-dashboard-preview">
            <div className="preview-top">
              <div>
                <span>GOOD MORNING</span>
                <h3>Campus Overview</h3>
              </div>

              <div className="preview-avatar">C</div>
            </div>

            <div className="preview-cards">
              <div className="preview-stat">
                <CalendarCheck />
                <div>
                  <strong>24</strong>
                  <span>Bookings Today</span>
                </div>
              </div>

              <div className="preview-stat green">
                <Building2 />
                <div>
                  <strong>18</strong>
                  <span>Resources Available</span>
                </div>
              </div>
            </div>

            <div className="preview-resource">
              <div className="resource-icon">
                <Users size={20} />
              </div>

              <div>
                <strong>Seminar Hall A</strong>
                <p>Available • 150 Capacity</p>
              </div>

              <CheckCircle2 className="check" />
            </div>

            <div className="preview-resource">
              <div className="resource-icon orange">
                <BarChart3 size={20} />
              </div>

              <div>
                <strong>Computer Lab 02</strong>
                <p>Occupied • Until 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span>WHY CAMPUSFLOW?</span>
          <h2>Everything Your Campus Needs</h2>
          <p>
            One intelligent platform for managing campus
            resources efficiently.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search />
            </div>

            <h3>Smart Resource Finder</h3>

            <p>
              Find the most suitable campus resource based
              on your requirements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange-icon">
              <ShieldCheck />
            </div>

            <h3>Conflict Detection</h3>

            <p>
              Prevent double bookings with intelligent
              availability checking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green-icon">
              <CalendarCheck />
            </div>

            <h3>Easy Booking</h3>

            <p>
              Submit and manage booking requests from one
              simple dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;