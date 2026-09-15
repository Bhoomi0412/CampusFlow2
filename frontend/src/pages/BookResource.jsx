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
  Speaker,
  Laptop,
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

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET DATA FROM VENUE FINDER / MATCH RESULT
  // ==========================================

  const pageData = location.state || {};

  const formData =
    pageData.formData ||
    pageData.requirements ||
    pageData;

  const selectedVenue =
    pageData.venue ||
    pageData.resource ||
    formData.venue ||
    formData.resource ||
    "Seminar Hall A";

  // ==========================================
  // NORMALIZE EQUIPMENT DATA
  // ==========================================

  const rawEquipment =
    formData.equipment ||
    formData.additionalItems ||
    [];

  const normalizedEquipment = rawEquipment.map((item) => {
    if (typeof item === "object") {
      return {
        name: item.name || "Equipment",
        quantity: Number(item.quantity) || 1,
        returned: false,
        returnedAt: null,
      };
    }

    return {
      name: item,
      quantity: 1,
      returned: false,
      returnedAt: null,
    };
  });

  // ==========================================
  // RETURN DEADLINE
  // ==========================================

  const calculateReturnDeadline = (endTime) => {
    if (!endTime) {
      return "Within 2 hours after the event ends";
    }

    try {
      const [hours, minutes] = endTime
        .split(":")
        .map(Number);

      if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes)
      ) {
        return "Within 2 hours after the event ends";
      }

      const totalMinutes =
        hours * 60 + minutes + 120;

      const finalHours =
        Math.floor(totalMinutes / 60) % 24;

      const finalMinutes =
        totalMinutes % 60;

      const period =
        finalHours >= 12 ? "PM" : "AM";

      const displayHours =
        finalHours % 12 || 12;

      return `Before ${displayHours}:${String(
        finalMinutes
      ).padStart(2, "0")} ${period}`;
    } catch {
      return "Within 2 hours after the event ends";
    }
  };

  // ==========================================
  // GET USER NAME
  // ==========================================

  const getUserName = () => {
    try {
      const storedUser =
        localStorage.getItem("campusflowUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        return (
          user?.name ||
          user?.fullName ||
          user?.username ||
          "Student"
        );
      }
    } catch (err) {
      console.log("Unable to read user:", err);
    }

    return (
      localStorage.getItem("userName") ||
      "Student"
    );
  };

  // ==========================================
  // FINAL BOOKING DATA
  // ==========================================

  const bookingData = {
    resource: selectedVenue,

    location:
      pageData.location ||
      formData.location ||
      "Academic Block A",

    date: formData.date || "",

    startTime: formData.startTime || "",

    endTime: formData.endTime || "",

    purpose:
      formData.purpose ||
      "College Event",

    capacity: Number(
      formData.people ||
      formData.capacity ||
      0
    ),

    facilities:
      Array.isArray(formData.facilities)
        ? formData.facilities
        : [],

    additionalItems:
      normalizedEquipment,

    returnDeadline:
      calculateReturnDeadline(
        formData.endTime
      ),

    userName: getUserName(),

    status: "pending",
  };

  // ==========================================
  // EQUIPMENT ICON
  // ==========================================

  const getEquipmentIcon = (name = "") => {
    const itemName =
      name.toLowerCase();

    if (itemName.includes("microphone")) {
      return <Mic size={21} />;
    }

    if (itemName.includes("speaker")) {
      return <Speaker size={21} />;
    }

    if (itemName.includes("laptop")) {
      return <Laptop size={21} />;
    }

    return <Mic size={21} />;
  };

  // ==========================================
  // FACILITY ICON
  // ==========================================

  const getFacilityIcon = (facility) => {
    if (facility === "Projector") {
      return <Monitor size={17} />;
    }

    if (facility === "WiFi") {
      return <Wifi size={17} />;
    }

    if (facility === "Air Conditioning") {
      return <Wind size={17} />;
    }

    return <CheckCircle2 size={17} />;
  };

  // ==========================================
  // SEND BOOKING REQUEST
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
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      // ========================================
      // SAFE RESPONSE HANDLING
      // ========================================

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let data;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          "Backend returned non-JSON:",
          text
        );

        throw new Error(
          `Server returned an invalid response (${response.status}). Make sure backend is running on http://localhost:5000`
        );
      }

      console.log(
        "Backend response:",
        data
      );

      // ========================================
      // CHECK RESPONSE
      // ========================================

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to send booking request."
        );
      }

      console.log(
        "Booking saved successfully:",
        data.booking
      );

      // ========================================
      // LOCAL STORAGE BACKUP
      // ========================================

      const existingBookings =
        JSON.parse(
          localStorage.getItem(
            "campusBookings"
          )
        ) || [];

      localStorage.setItem(
        "campusBookings",
        JSON.stringify([
          data.booking,
          ...existingBookings,
        ])
      );

      // ========================================
      // SUCCESS
      // ========================================

      setShowConfirmation(false);
      setRequestSent(true);

    } catch (err) {
      console.error(
        "Booking request error:",
        err
      );

      setShowConfirmation(false);

      setError(
        err.message ||
          "Backend connection failed."
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

  // ==========================================
  // UI
  // ==========================================

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

            <h1>
              Review Your Booking
            </h1>

            <p>
              Review all your selected resource
              details before sending your
              booking request.
            </p>

          </div>

          <div className="booking-header-status">

            <CheckCircle2 size={24} />

            <div>

              <span>
                Booking Status
              </span>

              <strong>
                Ready to Request
              </strong>

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

              <p>
                {error}
              </p>

            </div>

            <button
              className="error-close-btn"
              onClick={() =>
                setError("")
              }
            >
              <X size={18} />
            </button>

          </div>

        )}

        {/* ================= MAIN CARD ================= */}

        <div className="booking-review-card">

          {/* ================= LEFT SIDE ================= */}

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

            {/* ================= BOOKING DETAILS ================= */}

            <section className="booking-section">

              <h3>
                Booking Details
              </h3>

              <div className="booking-detail-grid">

                {/* DATE */}

                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Calendar size={20} />
                  </div>

                  <div>

                    <span>
                      Date
                    </span>

                    <strong>
                      {bookingData.date ||
                        "Not selected"}
                    </strong>

                  </div>

                </div>

                {/* TIME */}

                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Clock size={20} />
                  </div>

                  <div>

                    <span>
                      Time
                    </span>

                    <strong>
                      {bookingData.startTime ||
                        "--:--"}

                      {" - "}

                      {bookingData.endTime ||
                        "--:--"}
                    </strong>

                  </div>

                </div>

                {/* PEOPLE */}

                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <Users size={20} />
                  </div>

                  <div>

                    <span>
                      Expected Capacity
                    </span>

                    <strong>
                      {bookingData.capacity ||
                        0}{" "}
                      People
                    </strong>

                  </div>

                </div>

                {/* LOCATION */}

                <div className="booking-detail-box">

                  <div className="booking-detail-icon">
                    <MapPin size={20} />
                  </div>

                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      {bookingData.location}
                    </strong>

                  </div>

                </div>

              </div>

            </section>

            {/* ================= FACILITIES ================= */}

            {bookingData.facilities.length > 0 && (

              <section className="booking-section">

                <h3>
                  Required Facilities
                </h3>

                <div className="booking-facilities">

                  {bookingData.facilities.map(
                    (facility, index) => (

                      <div
                        className="booking-facility"
                        key={index}
                      >

                        {getFacilityIcon(
                          facility
                        )}

                        <span>
                          {facility}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </section>

            )}

            {/* ================= EQUIPMENT ================= */}

            {bookingData.additionalItems.length > 0 && (

              <section className="additional-section">

                <div className="additional-heading">

                  <div>

                    <h3>
                      Additional Equipment
                    </h3>

                    <p>
                      These items must be
                      returned after your event.
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
                          {getEquipmentIcon(
                            item.name
                          )}
                        </div>

                        <div className="additional-item-info">

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            Quantity:{" "}
                            {item.quantity}
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

            )}

            {/* ================= RETURN REMINDER ================= */}

            {bookingData.additionalItems.length > 0 && (

              <div className="return-reminder-box">

                <div className="return-reminder-icon">
                  <Clock size={22} />
                </div>

                <div>

                  <h4>
                    Equipment Return Reminder
                  </h4>

                  <p>
                    Return all borrowed equipment
                    within 2 hours after your
                    event ends.
                  </p>

                  <span className="fine-warning">
                    ⚠ If equipment is not returned
                    before the deadline, a fine may
                    be applied.
                  </span>

                </div>

              </div>

            )}

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
              Your booking request will be
              sent to the administrator for
              approval.
            </p>

            <div className="booking-security-note">

              <ShieldCheck size={20} />

              <span>
                Your request will remain pending
                until approved or declined by
                the administrator.
              </span>

            </div>

            <button
              className="send-booking-request-btn"
              onClick={() => {
                setError("");
                setShowConfirmation(true);
              }}
              disabled={loading}
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
                  Your request will be sent
                  to the admin for approval.
                </p>

                <div className="confirmation-summary">

                  <strong>
                    {bookingData.resource}
                  </strong>

                  <p>
                    {bookingData.date ||
                      "Date not selected"}

                    {" • "}

                    {bookingData.startTime ||
                      "--:--"}

                    {" - "}

                    {bookingData.endTime ||
                      "--:--"}
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
                      The administrator will
                      review your request and
                      approve or decline it.
                      You can track the status
                      in My Bookings.
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