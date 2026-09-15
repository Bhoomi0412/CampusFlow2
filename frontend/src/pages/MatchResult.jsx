import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Users,
  MapPin,
  Calendar,
  Wifi,
  Wind,
  Monitor,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";



export default function MatchResult() {
  const facilities = [
    { icon: <Monitor size={18} />, text: "Projector" },
    { icon: <Wifi size={18} />, text: "High-Speed Wi-Fi" },
    { icon: <Wind size={18} />, text: "Air Conditioning" },
  ];

  return (
    <div className="match-page">

      {/* Decorative background */}
      <div className="match-blob blob-one"></div>
      <div className="match-blob blob-two"></div>

      <div className="match-container">

        {/* TOP SECTION */}
        <div className="match-header">

          <div className="success-icon">
            <CheckCircle2 size={42} />
          </div>

          <div>
            <div className="recommendation-tag">
              <Sparkles size={16} />
              SMART RECOMMENDATION
            </div>

            <h1>Perfect Resource Found!</h1>

            <p>
              Based on your requirements, CampusFlow has found the
              best matching campus resource for you.
            </p>
          </div>

        </div>


        {/* MAIN RESULT CARD */}
        <div className="resource-result-card">

          {/* LEFT SIDE */}
          <div className="resource-main">

            <div className="resource-title-row">
              <div>
                <span className="small-label">RECOMMENDED RESOURCE</span>
                <h2>Seminar Hall A</h2>
                <p className="resource-subtitle">
                  Best match for your requirements
                </p>
              </div>

              <div className="match-score">
                <span>95%</span>
                <small>Match</small>
              </div>
            </div>


            <div className="divider"></div>


            {/* DETAILS */}
            <div className="resource-details">

              <div className="detail-card">
                <div className="detail-icon">
                  <Users size={22} />
                </div>

                <div>
                  <span>Capacity</span>
                  <strong>120 People</strong>
                </div>
              </div>


              <div className="detail-card">
                <div className="detail-icon">
                  <MapPin size={22} />
                </div>

                <div>
                  <span>Location</span>
                  <strong>Academic Block</strong>
                </div>
              </div>


              <div className="detail-card">
                <div className="detail-icon">
                  <Calendar size={22} />
                </div>

                <div>
                  <span>Status</span>
                  <strong className="available-text">Available</strong>
                </div>
              </div>

            </div>


            {/* FACILITIES */}
            <div className="facilities-section">

              <h3>Available Facilities</h3>

              <div className="facilities-list">

                {facilities.map((facility, index) => (
                  <div className="facility-item" key={index}>
                    {facility.icon}
                    <span>{facility.text}</span>
                  </div>
                ))}

              </div>

            </div>


            {/* BOOKING INFO */}
            <div className="smart-info">

              <div className="smart-info-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <strong>Conflict-Free Recommendation</strong>
                <p>
                  This resource is currently available and matches
                  your capacity and facility requirements.
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="booking-panel">

            <div className="booking-panel-icon">
              <Clock size={28} />
            </div>

            <h3>Ready to Book?</h3>

            <p>
              Secure this resource before another booking creates a conflict.
            </p>

            <Link to="/book-resource" className="book-resource-btn">
              Book This Resource
              <ArrowRight size={20} />
            </Link>

            <Link to="/venue-finder" className="another-resource-btn">
              Find Another Resource
            </Link>

          </div>

        </div>


        {/* BOTTOM FEATURES */}
        <div className="result-features">

          <div className="result-feature">
            <CheckCircle2 size={20} />
            <span>Conflict Detection</span>
          </div>

          <div className="result-feature">
            <Sparkles size={20} />
            <span>Smart Matching</span>
          </div>

          <div className="result-feature">
            <Calendar size={20} />
            <span>Easy Booking</span>
          </div>

        </div>

      </div>
    </div>
  );
}