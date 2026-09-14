import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  Building2,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  Bell,
  Settings,
  LogOut,
  Plus,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  Trophy,
  Activity,
  BrainCircuit,
  ChevronRight,
  CalendarClock,
  Wrench,
  Eye,
  Trash2,
  Edit3,
} from "lucide-react";

export default function AdminDashboard({
  resources = [],
  bookings = [],
  setBookings,
  onLogout,
}) {
  const [activePage, setActivePage] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // ==========================================
  // SAMPLE EVENTS
  // ==========================================

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Engineering Day 2026",
      type: "Technical Event",
      date: "2026-09-20",
      venue: "Auditorium",
      participants: 350,
      organizer: "Engineering Department",
      status: "UPCOMING",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
    },
    {
      id: 2,
      name: "Campus Hackathon",
      type: "Hackathon",
      date: "2026-09-25",
      venue: "Computer Lab 1",
      participants: 120,
      organizer: "CSE Department",
      status: "UPCOMING",
      startTime: "10:00 AM",
      endTime: "08:00 PM",
    },
    {
      id: 3,
      name: "Tech Fest 2026",
      type: "Technical Festival",
      date: "2026-08-10",
      venue: "Auditorium",
      participants: 450,
      organizer: "Student Council",
      status: "COMPLETED",
      successScore: 94,
      attendance: 92,
    },
    {
      id: 4,
      name: "Cultural Fest",
      type: "Cultural Event",
      date: "2026-07-25",
      venue: "Seminar Hall A",
      participants: 280,
      organizer: "Cultural Committee",
      status: "COMPLETED",
      successScore: 89,
      attendance: 86,
    },
    {
      id: 5,
      name: "Innovation Workshop",
      type: "Workshop",
      date: "2026-06-15",
      venue: "Conference Room",
      participants: 100,
      organizer: "Innovation Cell",
      status: "COMPLETED",
      successScore: 91,
      attendance: 90,
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    date: "",
    venue: "",
    participants: "",
    organizer: "",
  });

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const upcomingEvents = events.filter(
    (event) => event.status === "UPCOMING"
  );

  const completedEvents = events.filter(
    (event) => event.status === "COMPLETED"
  );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  );

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "APPROVED"
  );

  const totalParticipants = events.reduce(
    (total, event) => total + Number(event.participants || 0),
    0
  );

  const averageSuccessScore = useMemo(() => {
    if (completedEvents.length === 0) return 0;

    const total = completedEvents.reduce(
      (sum, event) => sum + (event.successScore || 0),
      0
    );

    return Math.round(total / completedEvents.length);
  }, [completedEvents]);

  // ==========================================
  // EVENT FUNCTIONS
  // ==========================================

  const createEvent = () => {
    if (
      !newEvent.name ||
      !newEvent.type ||
      !newEvent.date ||
      !newEvent.venue
    ) {
      alert("Please fill the required event details.");
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      participants: Number(newEvent.participants || 0),
      organizer: newEvent.organizer || "Campus Administration",
      status: "UPCOMING",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
    };

    setEvents([event, ...events]);

    setNewEvent({
      name: "",
      type: "",
      date: "",
      venue: "",
      participants: "",
      organizer: "",
    });

    setShowEventModal(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // ==========================================
  // BOOKING FUNCTIONS
  // ==========================================

  const updateBookingStatus = (id, status) => {
    if (!setBookings) return;

    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
            }
          : booking
      )
    );
  };

  // ==========================================
  // SIDEBAR
  // ==========================================

  const menuItems = [
    {
      id: "dashboard",
      label: "Control Center",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "events",
      label: "Event Management",
      icon: <CalendarDays size={20} />,
    },
    {
      id: "timeline",
      label: "Event Timeline",
      icon: <CalendarClock size={20} />,
    },
    {
      id: "history",
      label: "Past Events",
      icon: <History size={20} />,
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Building2 size={20} />,
    },
    {
      id: "requests",
      label: "Booking Requests",
      icon: <ClipboardList size={20} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      id: "conflicts",
      label: "Conflict Center",
      icon: <AlertTriangle size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  // ==========================================
  // COMPONENTS
  // ==========================================

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div
      className="glass-card"
      style={{
        padding: "22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              fontWeight: "700",
              letterSpacing: "0.06em",
              marginBottom: "8px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "900",
              color,
              margin: 0,
            }}
          >
            {value}
          </h2>

          {subtitle && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            color,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  // ==========================================
  // CONTROL CENTER
  // ==========================================

  const renderDashboard = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--purple-bright)",
              marginBottom: "8px",
            }}
          >
            <ShieldCheckIcon />
            ADMINISTRATION CONTROL PANEL
          </div>

          <h1
            style={{
              fontSize: "2.3rem",
              fontWeight: "900",
              marginBottom: "8px",
            }}
          >
            Welcome back,{" "}
            <span className="gradient-text-purple-cyan">
              Administrator
            </span>
          </h1>

          <p style={{ color: "var(--text-muted)" }}>
            Monitor resources, events, bookings and campus performance from one
            intelligent control center.
          </p>
        </div>

        <button
          className="btn-gradient"
          onClick={() => setShowEventModal(true)}
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "18px",
          marginBottom: "32px",
        }}
      >
        <StatCard
          title="TOTAL RESOURCES"
          value={resources.length || 15}
          icon={<Building2 />}
          color="var(--purple-bright)"
          subtitle="Campus facilities"
        />

        <StatCard
          title="UPCOMING EVENTS"
          value={upcomingEvents.length}
          icon={<CalendarDays />}
          color="var(--cyan-electric)"
          subtitle="Scheduled activities"
        />

        <StatCard
          title="COMPLETED EVENTS"
          value={completedEvents.length}
          icon={<CheckCircle2 />}
          color="var(--status-success)"
          subtitle="Successfully completed"
        />

        <StatCard
          title="PENDING REQUESTS"
          value={pendingBookings.length}
          icon={<Clock />}
          color="var(--status-warning)"
          subtitle="Requires attention"
        />

        <StatCard
          title="TOTAL PARTICIPANTS"
          value={totalParticipants}
          icon={<Users />}
          color="var(--pink-accent)"
          subtitle="Across campus events"
        />

        <StatCard
          title="AVG SUCCESS SCORE"
          value={`${averageSuccessScore}%`}
          icon={<Trophy />}
          color="var(--cyan-electric)"
          subtitle="Completed events"
        />
      </div>

      {/* SMART INSIGHTS */}

      <div
        className="glass-card"
        style={{
          padding: "26px",
          marginBottom: "28px",
          border: "1px solid rgba(124,58,237,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "14px",
              background: "rgba(124,58,237,0.15)",
              color: "var(--purple-bright)",
            }}
          >
            <BrainCircuit size={26} />
          </div>

          <div>
            <h3
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              CampusFlow Smart Insight
              <Sparkles
                size={18}
                color="var(--cyan-electric)"
              />
            </h3>

            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              The Auditorium is currently the most utilized campus resource.
              Friday between 10:00 AM and 2:00 PM has the highest booking
              demand. Consider scheduling large events during alternative time
              slots to improve campus resource optimization.
            </p>
          </div>
        </div>
      </div>

      {/* UPCOMING EVENTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
        }}
      >
        <div className="glass-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "22px",
            }}
          >
            <h2>Upcoming Events</h2>

            <button
              onClick={() => setActivePage("events")}
              style={{
                background: "none",
                border: "none",
                color: "var(--cyan-electric)",
                cursor: "pointer",
              }}
            >
              View All →
            </button>
          </div>

          {upcomingEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              style={{
                padding: "16px",
                borderBottom:
                  "1px solid var(--border-subtle)",
              }}
            >
              <h3>{event.name}</h3>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                }}
              >
                <span>📅 {event.date}</span>
                <span>📍 {event.venue}</span>
                <span>👥 {event.participants}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ATTENTION CENTER */}

        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 style={{ marginBottom: "20px" }}>
            Attention Required
          </h2>

          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.25)",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <AlertTriangle
                color="var(--status-warning)"
              />

              <strong>Pending Booking Requests</strong>
            </div>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
                fontSize: "0.85rem",
              }}
            >
              {pendingBookings.length} requests require administrator approval.
            </p>
          </div>

          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "rgba(236,72,153,0.08)",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <strong>
              ⚠ High Demand Period Detected
            </strong>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
                fontSize: "0.85rem",
              }}
            >
              Multiple campus resources are frequently requested during
              morning hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // ==========================================
  // EVENT MANAGEMENT
  // ==========================================

  const renderEvents = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1>Event Management</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Create, manage and monitor campus events.
          </p>
        </div>

        <button
          className="btn-gradient"
          onClick={() => setShowEventModal(true)}
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="glass-card"
            style={{ padding: "24px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color:
                      event.status === "UPCOMING"
                        ? "var(--cyan-electric)"
                        : "var(--status-success)",
                  }}
                >
                  {event.status}
                </span>

                <h2
                  style={{
                    fontSize: "1.3rem",
                    marginTop: "6px",
                  }}
                >
                  {event.name}
                </h2>
              </div>

              <CalendarDays
                color="var(--purple-bright)"
              />
            </div>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              {event.type}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <span>📅 {event.date}</span>
              <span>📍 {event.venue}</span>
              <span>👥 {event.participants} Participants</span>
              <span>🏢 {event.organizer}</span>
            </div>

            <button
              onClick={() => deleteEvent(event.id)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                borderRadius: "9px",
                border: "1px solid rgba(236,72,153,0.3)",
                background: "rgba(236,72,153,0.08)",
                color: "var(--pink-accent)",
                cursor: "pointer",
              }}
            >
              <Trash2 size={16} /> Remove Event
            </button>
          </div>
        ))}
      </div>
    </>
  );

  // ==========================================
  // EVENT TIMELINE
  // ==========================================

  const renderTimeline = () => {
    const timeline = [
      {
        time: "09:00 AM",
        title: "Registration",
        description: "Participant registration and verification",
      },
      {
        time: "10:00 AM",
        title: "Opening Ceremony",
        description: "Welcome address and event inauguration",
      },
      {
        time: "11:00 AM",
        title: "Project Exhibition",
        description: "Student innovation and project showcase",
      },
      {
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Networking and refreshments",
      },
      {
        time: "02:00 PM",
        title: "Competition & Evaluation",
        description: "Project evaluation and competition rounds",
      },
      {
        time: "04:00 PM",
        title: "Results & Closing Ceremony",
        description: "Winner announcement and closing session",
      },
    ];

    return (
      <>
        <h1>Event Timeline</h1>

        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "32px",
          }}
        >
          Monitor the complete schedule and progression of campus events.
        </p>

        <div
          className="glass-card"
          style={{
            padding: "28px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <span
                style={{
                  color: "var(--cyan-electric)",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                }}
              >
                LIVE EVENT
              </span>

              <h2 style={{ marginTop: "8px" }}>
                Engineering Day 2026
              </h2>
            </div>

            <div
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background: "rgba(34,211,238,0.1)",
                color: "var(--cyan-electric)",
              }}
            >
              🔴 LIVE NOW
            </div>
          </div>

          <div
            style={{
              marginTop: "25px",
              height: "8px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "62%",
                height: "100%",
                background:
                  "linear-gradient(90deg,var(--purple-primary),var(--cyan-electric))",
              }}
            />
          </div>

          <p
            style={{
              marginTop: "12px",
              color: "var(--text-muted)",
            }}
          >
            Event Progress: 62%
          </p>
        </div>

        <div
          style={{
            maxWidth: "800px",
          }}
        >
          {timeline.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "22px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  minWidth: "95px",
                  color: "var(--cyan-electric)",
                  fontWeight: "700",
                }}
              >
                {item.time}
              </div>

              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  marginTop: "4px",
                  background:
                    "linear-gradient(135deg,var(--purple-primary),var(--cyan-electric))",
                  boxShadow:
                    "0 0 20px rgba(34,211,238,0.5)",
                }}
              />

              <div>
                <h3>{item.title}</h3>

                <p
                  style={{
                    color: "var(--text-muted)",
                    marginTop: "6px",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  // ==========================================
  // PAST EVENTS
  // ==========================================

  const renderHistory = () => (
    <>
      <h1>Past Events History</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "30px",
        }}
      >
        Analyze completed events and measure their overall success.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {completedEvents.map((event) => (
          <div
            key={event.id}
            className="glass-card"
            style={{
              padding: "25px",
              border:
                "1px solid rgba(34,211,238,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.35rem",
                  }}
                >
                  {event.name}
                </h2>

                <p
                  style={{
                    color: "var(--text-muted)",
                    marginTop: "6px",
                  }}
                >
                  {event.date} • {event.venue}
                </p>
              </div>

              <Trophy
                color="var(--status-warning)"
              />
            </div>

            {/* SUCCESS SCORE */}

            <div
              style={{
                marginTop: "25px",
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(124,58,237,0.08)",
              }}
            >
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                }}
              >
                EVENT SUCCESS SCORE
              </p>

              <h1
                className="gradient-text-purple-cyan"
                style={{
                  fontSize: "2.5rem",
                  marginTop: "5px",
                }}
              >
                {event.successScore}%
              </h1>

              <div
                style={{
                  height: "8px",
                  background:
                    "rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${event.successScore}%`,
                    background:
                      "linear-gradient(90deg,var(--purple-primary),var(--cyan-electric))",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                color: "var(--text-muted)",
              }}
            >
              <span>
                👥 {event.participants} Participants
              </span>

              <span>
                📈 {event.attendance}% Attendance
              </span>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                borderRadius: "10px",
                background:
                  "rgba(34,197,94,0.08)",
                color: "var(--status-success)",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              ✓ Highly Successful Event
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // ==========================================
  // RESOURCES
  // ==========================================

  const renderResources = () => (
    <>
      <h1>Campus Resources</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "28px",
        }}
      >
        Monitor and manage campus resource availability.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="glass-card"
            style={{ padding: "22px" }}
          >
            <Building2
              size={26}
              color="var(--purple-bright)"
            />

            <h2
              style={{
                marginTop: "16px",
                fontSize: "1.25rem",
              }}
            >
              {resource.name}
            </h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              📍 {resource.location}
            </p>

            <p
              style={{
                marginTop: "8px",
                color: "var(--text-muted)",
              }}
            >
              👥 Capacity: {resource.capacity}
            </p>

            <div
              style={{
                marginTop: "16px",
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "20px",
                background:
                  resource.status === "AVAILABLE"
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(236,72,153,0.12)",
                color:
                  resource.status === "AVAILABLE"
                    ? "var(--status-success)"
                    : "var(--pink-accent)",
              }}
            >
              {resource.status}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // ==========================================
  // BOOKING REQUESTS
  // ==========================================

  const renderRequests = () => (
    <>
      <h1>Booking Requests</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "28px",
        }}
      >
        Review and manage all resource booking requests.
      </p>

      <div
        className="glass-card"
        style={{
          padding: "10px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "850px",
          }}
        >
          <thead>
            <tr
              style={{
                color: "var(--text-muted)",
                borderBottom:
                  "1px solid var(--border-subtle)",
              }}
            >
              <th style={{ padding: "16px", textAlign: "left" }}>
                User
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Resource
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Date & Time
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Purpose
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Status
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                style={{
                  borderBottom:
                    "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <td style={{ padding: "16px" }}>
                  {booking.user}
                </td>

                <td style={{ padding: "16px" }}>
                  <strong>{booking.resourceName}</strong>
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "var(--text-muted)",
                  }}
                >
                  {booking.date}
                  <br />
                  {booking.startTime} - {booking.endTime}
                </td>

                <td style={{ padding: "16px" }}>
                  {booking.purpose}
                </td>

                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      background:
                        booking.status === "APPROVED"
                          ? "rgba(34,197,94,0.12)"
                          : booking.status === "REJECTED"
                          ? "rgba(236,72,153,0.12)"
                          : "rgba(245,158,11,0.12)",
                      color:
                        booking.status === "APPROVED"
                          ? "var(--status-success)"
                          : booking.status === "REJECTED"
                          ? "var(--pink-accent)"
                          : "var(--status-warning)",
                    }}
                  >
                    {booking.status}
                  </span>
                </td>

                <td style={{ padding: "16px" }}>
                  {booking.status === "PENDING" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "APPROVED"
                          )
                        }
                        style={{
                          border: "none",
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            "rgba(34,197,94,0.12)",
                          color:
                            "var(--status-success)",
                          cursor: "pointer",
                        }}
                      >
                        <CheckCircle2 size={18} />
                      </button>

                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "REJECTED"
                          )
                        }
                        style={{
                          border: "none",
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            "rgba(236,72,153,0.12)",
                          color: "var(--pink-accent)",
                          cursor: "pointer",
                        }}
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  // ==========================================
  // ANALYTICS
  // ==========================================

  const renderAnalytics = () => (
    <>
      <h1>Campus Analytics</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "30px",
        }}
      >
        Analyze campus resource utilization and event performance.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "22px",
        }}
      >
        <div className="glass-card" style={{ padding: "25px" }}>
          <h2>Resource Utilization</h2>

          {[
            ["Auditorium", 85],
            ["Seminar Hall B", 78],
            ["Computer Labs", 65],
            ["Conference Room", 48],
          ].map(([name, value]) => (
            <div
              key={name}
              style={{ marginTop: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>

              <div
                style={{
                  height: "8px",
                  background:
                    "rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${value}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,var(--purple-primary),var(--cyan-electric))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: "25px" }}>
          <h2>Campus Performance</h2>

          <div style={{ marginTop: "25px" }}>
            <StatCard
              title="EVENT SUCCESS RATE"
              value={`${averageSuccessScore}%`}
              icon={<Trophy />}
              color="var(--status-success)"
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <StatCard
              title="APPROVED BOOKINGS"
              value={approvedBookings.length}
              icon={<CheckCircle2 />}
              color="var(--cyan-electric)"
            />
          </div>
        </div>
      </div>
    </>
  );

  // ==========================================
  // CONFLICT CENTER
  // ==========================================

  const renderConflicts = () => (
    <>
      <h1>Smart Conflict Center</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "30px",
        }}
      >
        CampusFlow automatically detects scheduling conflicts and recommends
        intelligent alternatives.
      </p>

      <div
        className="glass-card"
        style={{
          padding: "30px",
          border:
            "1px solid rgba(245,158,11,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "flex-start",
          }}
        >
          <AlertTriangle
            size={35}
            color="var(--status-warning)"
          />

          <div>
            <h2>Potential Scheduling Conflict</h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "10px",
              }}
            >
              Seminar Hall B has overlapping booking requests during the same
              time window.
            </p>

            <h3
              style={{
                marginTop: "25px",
                color: "var(--cyan-electric)",
              }}
            >
              ✨ Smart Alternatives
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background:
                    "rgba(34,211,238,0.08)",
                }}
              >
                <strong>Auditorium</strong>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginTop: "6px",
                  }}
                >
                  Available at requested time.
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background:
                    "rgba(124,58,237,0.08)",
                }}
              >
                <strong>Seminar Hall A</strong>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginTop: "6px",
                  }}
                >
                  Available from 12:30 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // ==========================================
  // SETTINGS
  // ==========================================

  const renderSettings = () => (
    <>
      <h1>Admin Settings</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "30px",
        }}
      >
        Configure CampusFlow administration preferences.
      </p>

      <div
        className="glass-card"
        style={{
          padding: "28px",
          maxWidth: "700px",
        }}
      >
        <h2>System Preferences</h2>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <SettingRow
            title="Booking Notifications"
            description="Receive alerts for new booking requests."
          />

          <SettingRow
            title="Conflict Detection"
            description="Automatically detect scheduling conflicts."
          />

          <SettingRow
            title="Smart Recommendations"
            description="Enable intelligent resource suggestions."
          />
        </div>
      </div>
    </>
  );

  // ==========================================
  // MAIN PAGE SWITCHER
  // ==========================================

  const renderPage = () => {
    switch (activePage) {
      case "events":
        return renderEvents();

      case "timeline":
        return renderTimeline();

      case "history":
        return renderHistory();

      case "resources":
        return renderResources();

      case "requests":
        return renderRequests();

      case "analytics":
        return renderAnalytics();

      case "conflicts":
        return renderConflicts();

      case "settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-main)",
        display: "flex",
      }}
    >
      {/* ================================= */}
      {/* ADMIN SIDEBAR */}
      {/* ================================= */}

      <aside
        style={{
          width: "270px",
          minHeight: "100vh",
          borderRight:
            "1px solid var(--border-subtle)",
          padding: "25px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "rgba(8,11,22,0.9)",
          backdropFilter: "blur(18px)",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,var(--purple-primary),var(--cyan-electric))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
            }}
          >
            CF
          </div>

          <div>
            <strong style={{ fontSize: "1.1rem" }}>
              CAMPUS
              <span className="gradient-text-purple-cyan">
                FLOW
              </span>
            </strong>

            <p
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
              }}
            >
              ADMIN CONTROL
            </p>
          </div>
        </div>

        {/* MENU */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px",
                borderRadius: "10px",
                cursor: "pointer",
                border: "none",
                background:
                  activePage === item.id
                    ? "linear-gradient(90deg,rgba(124,58,237,0.22),rgba(34,211,238,0.08))"
                    : "transparent",
                color:
                  activePage === item.id
                    ? "var(--cyan-electric)"
                    : "var(--text-muted)",
                textAlign: "left",
                fontWeight:
                  activePage === item.id ? "700" : "500",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* LOGOUT */}

        <button
          onClick={() => setShowLogoutModal(true)}
          style={{
            marginTop: "30px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "13px",
            borderRadius: "10px",
            cursor: "pointer",
            border:
              "1px solid rgba(236,72,153,0.25)",
            background:
              "rgba(236,72,153,0.06)",
            color: "var(--pink-accent)",
          }}
        >
          <LogOut size={19} />
          Logout
        </button>
      </aside>

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main
        style={{
          flex: 1,
          padding: "40px",
          maxWidth: "1500px",
        }}
      >
        {/* TOP BAR */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <button
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            style={{
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid var(--border-subtle)",
              padding: "10px",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={20} />

            <span
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                background: "var(--pink-accent)",
                borderRadius: "50%",
                top: "8px",
                right: "8px",
              }}
            />
          </button>

          {notificationsOpen && (
            <div
              className="glass-card"
              style={{
                position: "absolute",
                top: "50px",
                right: 0,
                width: "300px",
                padding: "18px",
                zIndex: 20,
              }}
            >
              <h3>Notifications</h3>

              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                  marginTop: "12px",
                }}
              >
                🔔 New booking request received.
              </p>

              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                  marginTop: "10px",
                }}
              >
                ⚠ High demand detected for Auditorium.
              </p>

              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.82rem",
                  marginTop: "10px",
                }}
              >
                📅 Engineering Day starts soon.
              </p>
            </div>
          )}
        </div>

        {renderPage()}
      </main>

      {/* ================================= */}
      {/* CREATE EVENT MODAL */}
      {/* ================================= */}

      {showEventModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 100,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "30px",
            }}
          >
            <h2>Create New Event</h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
                marginBottom: "25px",
              }}
            >
              Add a new event to CampusFlow.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <AdminInput
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    name: value,
                  })
                }
              />

              <AdminInput
                placeholder="Event Type"
                value={newEvent.type}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    type: value,
                  })
                }
              />

              <AdminInput
                type="date"
                value={newEvent.date}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    date: value,
                  })
                }
              />

              <AdminInput
                placeholder="Venue"
                value={newEvent.venue}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    venue: value,
                  })
                }
              />

              <AdminInput
                type="number"
                placeholder="Expected Participants"
                value={newEvent.participants}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    participants: value,
                  })
                }
              />

              <AdminInput
                placeholder="Organizer"
                value={newEvent.organizer}
                onChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    organizer: value,
                  })
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => setShowEventModal(false)}
                className="btn-secondary"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                Cancel
              </button>

              <button
                onClick={createEvent}
                className="btn-gradient"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* LOGOUT CONFIRMATION */}
      {/* ================================= */}

      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "90%",
              maxWidth: "430px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 18px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "rgba(236,72,153,0.12)",
                color: "var(--pink-accent)",
              }}
            >
              <LogOut size={28} />
            </div>

            <h2>Logout from CampusFlow?</h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "10px",
                lineHeight: 1.6,
              }}
            >
              You will need to sign in again to access the administration
              control center.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="btn-secondary"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                Stay Logged In
              </button>

              <button
                onClick={onLogout}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg,#EC4899,#EF4444)",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SMALL COMPONENTS
// ==========================================

function AdminInput({
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "13px",
        borderRadius: "10px",
        border: "1px solid var(--border-subtle)",
        background: "rgba(255,255,255,0.04)",
        color: "white",
        outline: "none",
      }}
    />
  );
}

function SettingRow({ title, description }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        paddingBottom: "18px",
        borderBottom:
          "1px solid var(--border-subtle)",
      }}
    >
      <div>
        <h3 style={{ fontSize: "1rem" }}>{title}</h3>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.82rem",
            marginTop: "5px",
          }}
        >
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        style={{
          width: "48px",
          height: "25px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          background: enabled
            ? "var(--purple-primary)"
            : "rgba(255,255,255,0.1)",
          position: "relative",
        }}
      >
        <span
          style={{
            width: "19px",
            height: "19px",
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            top: "3px",
            left: enabled ? "26px" : "3px",
            transition: "0.3s",
          }}
        />
      </button>
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <ShieldCheckIconWrapper>
      🔐
    </ShieldCheckIconWrapper>
  );
}

function ShieldCheckIconWrapper({ children }) {
  return (
    <span
      style={{
        fontSize: "0.9rem",
      }}
    >
      {children}
    </span>
  );
}