import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  MapPin,
  Users,
  FileText,
  Save,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function CreateEvent() {

  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    venue: "",
    participants: "",
    description: "",
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    const events =
      JSON.parse(localStorage.getItem("campusEvents")) || [];

    const newEvent = {
      id: Date.now(),
      ...event,
      participants: Number(event.participants),
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "campusEvents",
      JSON.stringify([...events, newEvent])
    );

    navigate("/admin/events");
  };

  return (

    <div className="admin-layout">

      <AdminNavbar />

      <main className="admin-main admin-page-main">

        <div className="admin-page-header">

          <div>

            <span className="admin-kicker">
              EVENT MANAGEMENT
            </span>

            <h1>Create New Event</h1>

            <p>
              Schedule and manage a new campus activity.
            </p>

          </div>

        </div>

        <form
          className="create-event-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              <FileText size={17} />
              Event Name
            </label>

            <input
              type="text"
              placeholder="Enter event name"
              value={event.name}
              onChange={(e) =>
                setEvent({
                  ...event,
                  name: e.target.value,
                })
              }
              required
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>
                <CalendarDays size={17} />
                Event Date
              </label>

              <input
                type="date"
                value={event.date}
                onChange={(e) =>
                  setEvent({
                    ...event,
                    date: e.target.value,
                  })
                }
                required
              />

            </div>

            <div className="form-group">

              <label>
                <Users size={17} />
                Expected Participants
              </label>

              <input
                type="number"
                placeholder="Expected participants"
                value={event.participants}
                onChange={(e) =>
                  setEvent({
                    ...event,
                    participants: e.target.value,
                  })
                }
                required
              />

            </div>

          </div>

          <div className="form-group">

            <label>
              <MapPin size={17} />
              Venue
            </label>

            <input
              type="text"
              placeholder="Enter venue"
              value={event.venue}
              onChange={(e) =>
                setEvent({
                  ...event,
                  venue: e.target.value,
                })
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              <FileText size={17} />
              Event Description
            </label>

            <textarea
              placeholder="Describe the event..."
              value={event.description}
              onChange={(e) =>
                setEvent({
                  ...event,
                  description: e.target.value,
                })
              }
              rows="5"
            />

          </div>

          <button
            className="admin-primary-btn"
            type="submit"
          >
            <Save size={18} />
            Create Event
          </button>

        </form>

      </main>

    </div>
  );
}