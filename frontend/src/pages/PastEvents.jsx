import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import {
  ArrowLeft,
  History,
  CalendarDays,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Trophy,
} from "lucide-react";

export default function PastEvents() {
  const events =
    JSON.parse(localStorage.getItem("campusEvents")) || [];

  const pastEvents = events.filter((event) => {
    if (!event.date) return false;

    const eventDate = new Date(event.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return eventDate < today;
  });

  return (
    <div className="admin-layout">

      {/* ADMIN SIDEBAR */}
      <AdminNavbar />

      <main className="admin-main admin-page-content">

        {/* PAGE HEADER */}

        <div className="admin-page-header">

          <div>

            <span className="admin-kicker">
              EVENT HISTORY
            </span>

            <h1>Past Events</h1>

            <p>
              Review completed campus events and track their
              history and performance.
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


        {/* SUMMARY CARDS */}

        <section className="past-events-summary">

          <div className="past-summary-card">

            <div className="past-summary-icon">
              <History size={23} />
            </div>

            <div>
              <span>Total Completed</span>
              <strong>{pastEvents.length}</strong>
            </div>

          </div>


          <div className="past-summary-card">

            <div className="past-summary-icon">
              <CheckCircle2 size={23} />
            </div>

            <div>
              <span>Successfully Managed</span>
              <strong>{pastEvents.length}</strong>
            </div>

          </div>


          <div className="past-summary-card">

            <div className="past-summary-icon">
              <Trophy size={23} />
            </div>

            <div>
              <span>Campus Activities</span>
              <strong>{pastEvents.length}</strong>
            </div>

          </div>

        </section>


        {/* EVENTS */}

        {pastEvents.length === 0 ? (

          <div className="admin-empty-state past-empty-state">

            <History size={55} />

            <h2>No Past Events Yet</h2>

            <p>
              Completed events will automatically appear here
              after their scheduled date has passed.
            </p>

          </div>

        ) : (

          <div className="past-events-grid">

            {pastEvents.map((event) => (

              <div
                className="past-event-card"
                key={event.id}
              >

                <div className="past-event-top">

                  <div className="past-event-icon">
                    <CalendarDays size={24} />
                  </div>

                  <span className="completed-event-badge">
                    <CheckCircle2 size={15} />
                    Completed
                  </span>

                </div>


                <h2>
                  {event.title || event.name || "Campus Event"}
                </h2>


                <div className="past-event-details">

                  <p>
                    <CalendarDays size={16} />
                    {event.date}
                  </p>


                  {event.time && (

                    <p>
                      <Clock size={16} />
                      {event.time}
                    </p>

                  )}


                  {event.location && (

                    <p>
                      <MapPin size={16} />
                      {event.location}
                    </p>

                  )}


                  {event.participants && (

                    <p>
                      <Users size={16} />
                      {event.participants} Participants
                    </p>

                  )}

                </div>


                <div className="past-event-footer">

                  <span>
                    Event successfully completed
                  </span>

                  <CheckCircle2 size={19} />

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}