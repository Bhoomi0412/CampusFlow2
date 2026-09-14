import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ArrowLeft,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";

export default function EventTimeline() {
  const events =
    JSON.parse(localStorage.getItem("campusEvents")) || [];

  const bookings =
    JSON.parse(localStorage.getItem("campusBookings")) || [];

  // Combine events and approved bookings for timeline
  const timelineItems = [
    ...events.map((event) => ({
      id: event.id,
      title: event.name || event.title || "Campus Event",
      date: event.date,
      time: event.time,
      location: event.location || event.venue || "Campus",
      participants: event.participants || "N/A",
      type: "Event",
      status: event.status || "Upcoming",
    })),

    ...bookings
      .filter((booking) => booking.status === "Approved")
      .map((booking) => ({
        id: `booking-${booking.id}`,
        title: booking.resource,
        date: booking.date,
        time: booking.time,
        location: booking.location,
        participants: booking.capacity,
        type: "Approved Booking",
        status: "Approved",
      })),
  ];

  return (
    <div className="admin-layout">
      <AdminNavbar />

      <main className="admin-main admin-page-main">

        {/* HEADER */}

        <div className="admin-page-header">
          <div>
            <span className="admin-kicker">
              EVENT PLANNING
            </span>

            <h1>Event Timeline</h1>

            <p>
              Track all upcoming events and approved campus
              activities from one organized timeline.
            </p>
          </div>

          <Link
            to="/admin"
            className="admin-back-btn"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>
        </div>


        {/* TIMELINE SUMMARY */}

        <div className="timeline-summary">

          <div className="timeline-summary-card">
            <div className="timeline-summary-icon">
              <CalendarDays size={24} />
            </div>

            <div>
              <span>Total Activities</span>
              <strong>{timelineItems.length}</strong>
            </div>
          </div>

          <div className="timeline-summary-card">
            <div className="timeline-summary-icon">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <span>Approved Bookings</span>
              <strong>
                {
                  bookings.filter(
                    (booking) =>
                      booking.status === "Approved"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="timeline-summary-card">
            <div className="timeline-summary-icon">
              <CalendarClock size={24} />
            </div>

            <div>
              <span>Campus Events</span>
              <strong>{events.length}</strong>
            </div>
          </div>

        </div>


        {/* TIMELINE */}

        {timelineItems.length === 0 ? (

          <div className="admin-empty-state">

            <CalendarDays size={52} />

            <h2>No Activities Scheduled</h2>

            <p>
              Create an event or approve booking requests
              to see them in the campus timeline.
            </p>

          </div>

        ) : (

          <div className="timeline-container">

            {timelineItems.map((item, index) => (

              <div
                className="timeline-item"
                key={`${item.id}-${index}`}
              >

                <div className="timeline-left">

                  <div className="timeline-dot">
                    <CalendarDays size={19} />
                  </div>

                  {index !==
                    timelineItems.length - 1 && (
                    <div className="timeline-line"></div>
                  )}

                </div>


                <div className="timeline-card">

                  <div className="timeline-card-top">

                    <div>

                      <span className="timeline-type">
                        {item.type}
                      </span>

                      <h2>{item.title}</h2>

                    </div>

                    <span
                      className={`timeline-status ${
                        item.status
                          .toLowerCase()
                          .replace(/\s/g, "-")
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>


                  <div className="timeline-details">

                    <span>
                      <CalendarDays size={16} />
                      {item.date || "Date not specified"}
                    </span>

                    <span>
                      <Clock3 size={16} />
                      {item.time || "Time not specified"}
                    </span>

                    <span>
                      <MapPin size={16} />
                      {item.location}
                    </span>

                    <span>
                      <Users size={16} />
                      {item.participants}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}