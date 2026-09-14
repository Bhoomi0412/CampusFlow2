import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Monitor,
  Wifi,
  Wind,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  Send,
  Bell,
  AlertTriangle,
} from "lucide-react";

export default function BookResource() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedVenue =
    location.state?.venue || "Seminar Hall A";

  const [loading, setLoading] = useState(false);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const [requestSent, setRequestSent] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // BOOKING DATA
  // ==========================================

  const bookingData = {
    resource: selectedVenue,

    location: "Academic Block A",

    date: "2026-09-15",

    time: "10:00 - 12:00",

    startTime: "10:00",

    endTime: "12:00",

    purpose: "College Event",

    capacity: 120,

    facilities: [
      "Projector",
      "WiFi",
      "Air Conditioning",
    ],

    equipment: [
      "Microphone x2",
      "Speaker x1",
    ],

    additionalItems: [
      {
        name: "Microphone",
        quantity: 2,
        returned: false,
      },
      {
        name: "Speaker",
        quantity: 1,
        returned: false,
      },
    ],

    returnDeadline:
      "Within 2 hours after the event ends",

    userName: "Student",

    // Backend MongoDB lowercase status use karega
    status: "pending",
  };

  // ==========================================
  // SEND BOOKING REQUEST TO MONGODB
  // ==========================================

  const sendBookingRequest = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Sending booking to backend:",
        bookingData
      );

      const response = await fetch(
        "https://campusflow-s065.onrender.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      console.log(
        "Backend response:",
        data
      );

      // ======================================
      // ERROR
      // ======================================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to send booking request."
        );
      }

      // ======================================
      // SUCCESS
      // ======================================

      console.log(
        "Booking saved in MongoDB:",
        data.booking
      );

      // Optional localStorage backup
      const existingBookings =
        JSON.parse(
          localStorage.getItem("campusBookings")
        ) || [];

      localStorage.setItem(
        "campusBookings",
        JSON.stringify([
          data.booking,
          ...existingBookings,
        ])
      );

      setShowConfirmation(false);

      setRequestSent(true);

    } catch (error) {
      console.error(
        "Booking request error:",
        error
      );

      setShowConfirmation(false);

      setError(
        error.message ||
          "Backend connection failed. Please check that the backend server is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const goToDashboard = () => {
    setRequestSent(false);

    navigate("/dashboard");
  };

  const goToMyBookings = () => {
    setRequestSent(false);

    navigate("/my-bookings");
  };

  return (
    <div className="app-layout">

      <main className="main-content">

        {/* ================= HEADER ================= */}

        <section className="booking-page-header">

          <div>

            <div className="booking-kicker">

              <Sparkles size={16} />

              BOOKING CONFIRMATION

            </div>

            <h1>Review Your Booking</h1>

            <p>
              Review all your selected resource details before
              sending your booking request.
            </p>

          </div>

          <div className="booking-header-status">

            <CheckCircle2 size={24} />

            <div>

              <span>Booking Status</span>

              <strong>Ready to Request</strong>

            </div>

          </div>

        </section>


        {/* ================= ERROR ================= */}

        {error && (

          <div className="booking-error">

            <AlertTriangle size={20} />

            <div>

              <strong>
                Booking Request Could Not Be Sent
              </strong>

              <p>{error}</p>

            </div>

            <button
              className="error-close-btn"
              onClick={() => setError("")}
            >
              <X size={18} />
            </button>

          </div>

        )}


        {/* ================= MAIN CARD ================= */}

        <div className="booking-review-card">


          {/* LEFT SIDE */}

          <div className="booking-review-main">


            {/* RESOURCE TITLE */}

            <div className="booking-resource-title">

              <div className="booking-resource-icon">
                🏛️
              </div>

              <div>

                <span className="booking-small-label">
                  SELECTED RESOURCE
                </span>

                <h2>
                  {bookingData.resource}
                </h2>

                <p>
                  Ready for your event booking
                </p>

              </div>

            </div>


            <div className="booking-divider"></div>


            {/* BOOKING DETAILS */}

            <section className="booking-section">

              <h3>Booking Details</h3>

              <div className="booking-detail-grid">


                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Calendar size={20} />
                  </div>

                  <div>

                    <span>Date</span>

                    <strong>
                      {bookingData.date}
                    </strong>

                  </div>

                </div>


                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Clock size={20} />
                  </div>

                  <div>

                    <span>Time</span>

                    <strong>
                      {bookingData.startTime}
                      {" - "}
                      {bookingData.endTime}
                    </strong>

                  </div>

                </div>


                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Users size={20} />
                  </div>

                  <div>

                    <span>Expected Capacity</span>

                    <strong>
                      {bookingData.capacity} People
                    </strong>

                  </div>

                </div>


                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <MapPin size={20} />
                  </div>

                  <div>

                    <span>Location</span>

                    <strong>
                      {bookingData.location}
                    </strong>

                  </div>

                </div>

              </div>

            </section>


            {/* REQUIRED FACILITIES */}

            <section className="booking-section">

              <h3>Required Facilities</h3>

              <div className="booking-facilities">

                {bookingData.facilities.map(
                  (facility, index) => (

                    <div
                      className="booking-facility"
                      key={index}
                    >

                      {facility === "Projector" && (
                        <Monitor size={17} />
                      )}

                      {facility === "WiFi" && (
                        <Wifi size={17} />
                      )}

                      {facility === "Air Conditioning" && (
                        <Wind size={17} />
                      )}

                      <span>
                        {facility}
                      </span>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* ADDITIONAL EQUIPMENT */}

            <section className="additional-section">

              <div className="additional-heading">

                <div>

                  <h3>
                    Additional Equipment
                  </h3>

                  <p>
                    These items must be returned after
                    your event.
                  </p>

                </div>

                <span className="return-required-badge">
                  Return Required
                </span>

              </div>


              <div className="additional-items-list">

                {bookingData.additionalItems.map(
                  (item, index) => (

                    <div
                      className="additional-item-card"
                      key={index}
                    >

                      <div className="additional-item-icon">
                        <Mic size={21} />
                      </div>

                      <div className="additional-item-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Quantity: {item.quantity}
                        </span>

                      </div>

                      <div className="item-return-status">
                        Return After Event
                      </div>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* RETURN REMINDER */}

            <div className="return-reminder-box">

              <div className="return-reminder-icon">
                <Clock size={22} />
              </div>

              <div>

                <h4>
                  Equipment Return Reminder
                </h4>

                <p>
                  Return all borrowed equipment within
                  2 hours after your event ends.
                </p>

                <span className="fine-warning">
                  ⚠ If equipment is not returned before
                  the deadline, a fine may be applied.
                </span>

              </div>

            </div>

          </div>


          {/* ================= RIGHT PANEL ================= */}

          <aside className="booking-action-panel">

            <div className="booking-action-illustration">

              <div className="booking-illustration-circle"></div>

              <div className="booking-illustration-main">
                📅
              </div>

            </div>


            <span className="ready-label">
              EVERYTHING LOOKS GOOD
            </span>


            <h2>
              Ready to Send?
            </h2>


            <p>
              Your booking request will be sent to the
              administrator for approval.
            </p>


            <div className="booking-security-note">

              <ShieldCheck size={20} />

              <span>
                Your request will remain pending until
                approved or declined by the administrator.
              </span>

            </div>


            <button
              className="send-booking-request-btn"
              onClick={() => {
                setError("");
                setShowConfirmation(true);
              }}
            >

              Send Booking Request

              <ArrowRight size={18} />

            </button>


            <Link
              to="/venue-finder"
              className="change-resource-link"
            >
              Change Resource
            </Link>

          </aside>

        </div>


        {/* ================= CONFIRMATION MODAL ================= */}

        {showConfirmation && (

          <div className="confirmation-overlay">

            <div className="confirmation-modal">

              <button
                className="confirmation-close"
                disabled={loading}
                onClick={() => {
                  if (!loading) {
                    setShowConfirmation(false);
                  }
                }}
              >
                <X size={20} />
              </button>


              <div className="confirmation-content">

                <div className="confirmation-illustration">
                  🏛️✨
                </div>

                <div className="confirmation-tag">
                  FINAL CONFIRMATION
                </div>

                <h2>
                  Confirm Booking Request?
                </h2>

                <p>
                  Your request will be sent to the admin
                  for approval.
                </p>


                <div className="confirmation-summary">

                  <strong>
                    {bookingData.resource}
                  </strong>

                  <p>
                    {bookingData.date}

                    {" • "}

                    {bookingData.startTime}

                    {" - "}

                    {bookingData.endTime}
                  </p>

                </div>


                <div className="confirmation-actions">

                  <button
                    className="cancel-request-btn"
                    disabled={loading}
                    onClick={() =>
                      setShowConfirmation(false)
                    }
                  >
                    Cancel
                  </button>


                  <button
                    className="confirm-request-btn"
                    onClick={sendBookingRequest}
                    disabled={loading}
                  >

                    {loading
                      ? "Sending..."
                      : "Confirm & Send"}

                    <Send size={18} />

                  </button>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ================= SUCCESS MODAL ================= */}

        {requestSent && (

          <div className="confirmation-overlay">

            <div className="confirmation-modal">

              <div className="request-success">

                <div className="success-animation">

                  <div className="success-ring">
                    <CheckCircle2 size={55} />
                  </div>

                </div>


                <div className="request-sent-tag">
                  REQUEST SENT SUCCESSFULLY
                </div>


                <h2>
                  Your Request Is Pending!
                </h2>


                <p className="success-message">

                  Your booking request for

                  <strong>
                    {" "}
                    {bookingData.resource}
                  </strong>

                  {" "}
                  has been sent successfully.

                </p>


                <div className="admin-process-box">

                  <Bell size={22} />

                  <div>

                    <h3>
                      What Happens Next?
                    </h3>

                    <p>
                      The administrator will review your
                      request and approve or decline it.
                      You can track the status in My Bookings.
                    </p>

                  </div>

                </div>


                <div className="request-current-status">

                  <div className="status-dot"></div>

                  <div>

                    <span>
                      CURRENT STATUS
                    </span>

                    <strong>
                      Pending Admin Approval
                    </strong>

                  </div>

                </div>


                <button
                  className="success-done-btn"
                  onClick={goToDashboard}
                >

                  Go to Dashboard

                  <ArrowRight size={18} />

                </button>


                <button
                  className="view-bookings-btn"
                  onClick={goToMyBookings}
                >
                  View My Bookings
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}