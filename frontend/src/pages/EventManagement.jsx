import { useState } from "react";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function EventManagement() {

  const [events] = useState(
    JSON.parse(localStorage.getItem("campusEvents")) || []
  );

  return (

    <div className="admin-layout">

      <AdminNavbar />

      <main className="admin-main admin-page-main">

        <div className="admin-page-header">

          <div>

            <span className="admin-kicker">
              EVENT MANAGEMENT
            </span>

            <h1>Campus Events</h1>

            <p>
              Manage all upcoming and active campus events.
            </p>

          </div>

          <Link
            to="/admin/create-event"
            className="admin-primary-btn"
          >
            <Plus size={18} />
            Create Event
          </Link>

        </div>

        {events.length === 0 ? (

          <div className="admin-empty-state">

            <CalendarDays size={50} />

            <h2>No Events Created</h2>

            <p>
              Create your first campus event to get started.
            </p>

            <Link
              to="/admin/create-event"
              className="admin-primary-btn"
            >
              Create Event
            </Link>

          </div>

        ) : (

          <div className="events-grid">

            {events.map((event) => (

              <div
                className="admin-event-card"
                key={event.id}
              >

                <div className="event-card-icon">
                  <CalendarDays size={25} />
                </div>

                <h2>{event.name}</h2>

                <p>
                  <MapPin size={16} />
                  {event.venue}
                </p>

                <p>
                  <Users size={16} />
                  {event.participants} Participants
                </p>

                <span className="event-date">
                  {event.date}
                </span>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}