import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  Trophy,
  MapPin,
  Users,
  Wifi,
  Monitor,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";

function MatchResult() {
  const venues = [
    {
      name: "Seminar Hall A",
      location: "Academic Block A",
      capacity: "150 People",
      score: "98%",
      type: "Perfect Match",
      availability: "Available Now",
      color: "best",
    },
    {
      name: "Conference Room B",
      location: "Administration Block",
      capacity: "60 People",
      score: "94%",
      type: "Excellent Match",
      availability: "Available",
      color: "",
    },
    {
      name: "Main Auditorium",
      location: "Central Campus",
      capacity: "300 People",
      score: "89%",
      type: "Good Match",
      availability: "Available Soon",
      color: "",
    },
  ];

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">

        {/* HEADER */}
        <section className="match-page-header">
          <div>
            <div className="match-kicker">
              <Sparkles size={16} />
              SMART RECOMMENDATIONS
            </div>

            <h1>Your Perfect Resource Matches</h1>

            <p>
              CampusFlow analyzed your requirements and found the
              most suitable resources for your event.
            </p>
          </div>

          <div className="match-date-card">
            <Calendar size={20} />
            <div>
              <span>Selected Date</span>
              <strong>15 September 2026</strong>
            </div>
          </div>
        </section>

        {/* BEST MATCH */}
        <section className="match-highlight">
          <div className="match-highlight-left">
            <div className="match-trophy">
              <Trophy size={32} />
            </div>

            <div>
              <span className="best-match-label">
                🏆 BEST MATCH FOUND
              </span>

              <h2>Seminar Hall A</h2>

              <p>
                The most suitable venue based on capacity,
                facilities, availability and your requirements.
              </p>

              <div className="highlight-details">
                <span>
                  <Users size={16} />
                  150 People
                </span>

                <span>
                  <Wifi size={16} />
                  WiFi Available
                </span>

                <span>
                  <Monitor size={16} />
                  Projector
                </span>
              </div>
            </div>
          </div>

          <div className="match-score">
            <div className="score-circle">
              <strong>98%</strong>
            </div>

            <span>Match Score</span>
          </div>
        </section>

        {/* SECTION TITLE */}
        <div className="results-heading">
          <div>
            <h2>Recommended Resources</h2>
            <p>Choose the option that works best for you.</p>
          </div>

          <span className="results-count">
            {venues.length} Matches Found
          </span>
        </div>

        {/* VENUE CARDS */}
        <div className="venue-results">
          {venues.map((venue, index) => (
            <div
              className={`venue-result-card ${venue.color}`}
              key={index}
            >
              <div className="venue-rank">
                <span>#{index + 1}</span>
              </div>

              <div className="venue-main">

                <div className="venue-title-row">
                  <div>
                    <h2>{venue.name}</h2>

                    <p className="venue-location">
                      <MapPin size={16} />
                      {venue.location}
                    </p>
                  </div>

                  {index === 0 && (
                    <span className="best-choice">
                      <Trophy size={15} />
                      Top Recommendation
                    </span>
                  )}
                </div>

                <div className="venue-features">
                  <span>
                    <Users size={17} />
                    {venue.capacity}
                  </span>

                  <span>
                    <Wifi size={17} />
                    WiFi
                  </span>

                  <span>
                    <Monitor size={17} />
                    Projector
                  </span>

                  <span>
                    <Clock size={17} />
                    {venue.availability}
                  </span>
                </div>

              </div>

              <div className="venue-side">

                <div className="venue-score-box">
                  <strong>{venue.score}</strong>
                  <span>{venue.type}</span>
                </div>

                <Link
                  to="/book-resource"
                  className="book-match-btn"
                >
                  Select Venue
                  <ArrowRight size={17} />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* INFO BOX */}
        <div className="match-info">
          <div className="match-info-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h3>Conflict-Free Recommendations</h3>
            <p>
              All recommended resources are checked against current
              booking availability to reduce scheduling conflicts.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default MatchResult;