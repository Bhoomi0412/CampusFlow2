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
  Mic,
  Volume2,
  AlertTriangle,
  Package,
} from "lucide-react";

export default function MatchResult() {
  const facilities = [
    { icon: <Monitor size={18} />, text: "Projector" },
    { icon: <Wifi size={18} />, text: "High-Speed Wi-Fi" },
    { icon: <Wind size={18} />, text: "Air Conditioning" },
  ];

  const additionalRequirements = [
    { icon: <Mic size={18} />, text: "Wireless Microphone", quantity: "2" },
    { icon: <Volume2 size={18} />, text: "Speaker System", quantity: "1" },
  ];

  return (
    <div className="match-page">

      <div className="match-blob blob-one"></div>
      <div className="match-blob blob-two"></div>

      <div className="match-container">

        {/* HEADER */}
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
                <span className="small-label">
                  RECOMMENDED RESOURCE
                </span>

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


            {/* BASIC DETAILS */}
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
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <span>Status</span>
                  <strong className="available-text">
                    Available
                  </strong>
                </div>
              </div>

            </div>


            {/* EVENT DETAILS */}
            <div className="event-details-section">

              <div className="section-heading">
                <Calendar size={20} />
                <h3>Booking Details</h3>
              </div>

              <div className="event-details-grid">

                <div className="event-detail-box">
                  <span>Event Date</span>
                  <strong>15 September 2026</strong>
                </div>

                <div className="event-detail-box">
                  <span>Event Timing</span>
                  <strong>10:00 AM – 4:00 PM</strong>
                </div>

                <div className="event-detail-box return-deadline">
                  <span>
                    <Clock size={16} />
                    Equipment Return Deadline
                  </span>

                  <strong>Before 6:00 PM</strong>

                  <small>
                    Return within 2 hours after the event ends
                  </small>
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


            {/* ADDITIONAL EQUIPMENT */}
            <div className="additional-section">

              <div className="section-heading">
                <Package size={20} />
                <h3>Additional Equipment Requested</h3>
              </div>

              <div className="equipment-list">

                {additionalRequirements.map((item, index) => (

                  <div className="equipment-item" key={index}>

                    <div className="equipment-icon">
                      {item.icon}
                    </div>

                    <span>{item.text}</span>

                    <strong>× {item.quantity}</strong>

                  </div>

                ))}

              </div>

            </div>


            {/* FINE WARNING */}
            <div className="fine-warning">

              <AlertTriangle size={24} />

              <div>
                <strong>Important Return Policy</strong>

                <p>
                  All additional equipment must be returned before
                  <b> 6:00 PM</b>. Failure to return the equipment
                  before the deadline may result in a fine.
                </p>
              </div>

            </div>


            {/* SMART INFO */}
            <div className="smart-info">

              <div className="smart-info-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <strong>Conflict-Free Recommendation</strong>

                <p>
                  This resource is currently available and matches
                  your capacity, facilities and equipment requirements.
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE BOOKING PANEL */}
          <div className="booking-panel">

            <div className="booking-panel-icon">
              <Clock size={28} />
            </div>

            <span className="booking-status pending">
              Awaiting Admin Approval
            </span>

            <h3>Ready to Book?</h3>

            <p>
              Submit your booking request. You will receive a
              notification when the admin approves or declines it.
            </p>

            <Link
              to="/book-resource"
              className="book-resource-btn"
            >
              Book This Resource
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/venue-finder"
              className="another-resource-btn"
            >
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
            <Package size={20} />
            <span>Equipment Tracking</span>
          </div>

          <div className="result-feature">
            <Clock size={20} />
            <span>Return Reminders</span>
          </div>

        </div>

      </div>
    </div>
  );
}