import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  Search,
  Users,
  CalendarDays,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";

function VenueFinder() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/match-result");
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <p className="page-kicker">SMART RESOURCE FINDER</p>

            <h1>Find Your Perfect Resource 🔍</h1>

            <p className="page-subtitle">
              Enter your requirements and we'll find the
              best available campus space.
            </p>
          </div>
        </div>

        <div className="finder-layout">
          <div className="finder-info">
            <div className="finder-icon">
              <Sparkles size={32} />
            </div>

            <h2>Smart Matching</h2>

            <p>
              CampusFlow analyzes your requirements including
              capacity, facilities, resource type and
              availability.
            </p>

            <div className="matching-steps">
              <div>
                <span>01</span>
                <p>Enter Requirements</p>
              </div>

              <div>
                <span>02</span>
                <p>Check Availability</p>
              </div>

              <div>
                <span>03</span>
                <p>Get Best Matches</p>
              </div>
            </div>
          </div>

          <form className="finder-form" onSubmit={handleSubmit}>
            <h2>Tell Us What You Need</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <Building2 size={16} />
                  Resource Type
                </label>

                <select required>
                  <option value="">Select Resource</option>
                  <option>Seminar Hall</option>
                  <option>Auditorium</option>
                  <option>Computer Lab</option>
                  <option>Conference Room</option>
                  <option>Sports Facility</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <Users size={16} />
                  Number of Attendees
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <CalendarDays size={16} />
                  Date
                </label>

                <input type="date" required />
              </div>

              <div className="form-group">
                <label>
                  <Clock size={16} />
                  Start Time
                </label>

                <input type="time" required />
              </div>

              <div className="form-group">
                <label>
                  <Clock size={16} />
                  End Time
                </label>

                <input type="time" required />
              </div>

              <div className="form-group">
                <label>Required Facility</label>

                <select>
                  <option>Any Facility</option>
                  <option>Projector</option>
                  <option>WiFi</option>
                  <option>Air Conditioning</option>
                  <option>Audio System</option>
                </select>
              </div>
            </div>

            <button className="btn-primary finder-submit">
              <Search size={19} />
              Find Best Matches
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default VenueFinder;