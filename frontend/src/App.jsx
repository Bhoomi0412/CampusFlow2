import React, { useState } from "react";

import {
  Building2,
  CalendarDays,
  Clock,
  Search,
  Sparkles,
  BrainCircuit,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Presentation,
  Mic,
  Wifi,
  Wind,
  MonitorSmartphone,
  ChevronRight,
  TrendingUp,
  Activity,
  CalendarCheck,
  History,
  Trophy,
  BarChart3,
  PartyPopper,
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
  Users,
  MapPin,
  CalendarClock,
} from "lucide-react";

import "./styles/theme.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  INITIAL_RESOURCES,
  INITIAL_BOOKINGS,
  calculateMatchScore,
} from "./mock/campusData";

export default function App() {
  /* =========================
     AUTHENTICATION
  ========================= */

  const [user, setUser] = useState(null);

  /* =========================
     NAVIGATION
  ========================= */

  const [currentPage, setCurrentPage] = useState("landing");

  /* =========================
     APPLICATION DATA
  ========================= */

  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  /* =========================
     SEARCH DATA
  ========================= */

  const [searchParams, setSearchParams] = useState({
    people: 80,
    date: "2026-09-15",
    startTime: "10:00",
    endTime: "12:00",
    type: "Seminar Hall",
    facilities: ["Projector", "WiFi", "Air Conditioning"],
  });

  const [isSearching, setIsSearching] = useState(false);
  const [matchedResults, setMatchedResults] = useState([]);

  /* =========================
     BOOKING STATES
  ========================= */

  const [selectedResource, setSelectedResource] = useState(null);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = (userData) => {
    setUser(userData);

    if (userData.role === "admin") {
      setCurrentPage("admin");
    } else {
      setCurrentPage("dashboard");
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("landing");
    setSelectedResource(null);
  };

  /* =========================
     SMART SEARCH
  ========================= */

  const handleStartSearch = () => {
    setIsSearching(true);

    setTimeout(() => {
      const scored = resources
        .map((res) => ({
          ...res,
          matchScore: calculateMatchScore(res, searchParams),
        }))
        .sort((a, b) => b.matchScore - a.matchScore);

      setMatchedResults(scored);
      setIsSearching(false);
      setCurrentPage("match-results");
    }, 1100);
  };

  /* =========================
     BOOKING CONFLICT CHECK
  ========================= */

  const handleBookingAttempt = (resource) => {
    const isConflict = bookings.some(
      (b) =>
        b.resourceName === resource.name &&
        b.date === searchParams.date &&
        ((searchParams.startTime >= b.startTime &&
          searchParams.startTime < b.endTime) ||
          (searchParams.endTime > b.startTime &&
            searchParams.endTime <= b.endTime))
    );

    if (isConflict) {
      setSelectedResource(resource);
      setConflictModalOpen(true);
    } else {
      setSelectedResource(resource);
      setCurrentPage("book-resource");
    }
  };

  /* =========================
     FINAL BOOKING
  ========================= */

  const finalizeBooking = (purpose = "Campus Event") => {
    const newBooking = {
      id: `b-${Date.now()}`,
      resourceName: selectedResource.name,
      date: searchParams.date,
      startTime: searchParams.startTime,
      endTime: searchParams.endTime,
      purpose,
      status: "PENDING",
      user: user?.name || "User",
      location: selectedResource.location,
    };

    setBookings([newBooking, ...bookings]);
    setBookingSuccessModal(true);
  };

  /* =========================
     LANDING PAGE
  ========================= */

  if (!user && currentPage === "landing") {
    return <LandingPage onLogin={() => setCurrentPage("login")} />;
  }

  /* =========================
     LOGIN PAGE
  ========================= */

  if (!user && currentPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onClose={() => setCurrentPage("landing")}
      />
    );
  }

  return (
    <ProtectedRoute user={user}>
      <div
        style={{
          minHeight: "100vh",
          background: "#080B16",
          color: "white",
        }}
      >
        {/* NAVBAR */}

        <Navbar
          user={user}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        />

        <main style={{ flex: 1 }}>
          {/* =====================================
              STUDENT PAGES
          ===================================== */}

          {currentPage === "dashboard" &&
            user?.role !== "admin" && (
              <StudentDashboard
                user={user}
                bookings={bookings}
                onNavigate={setCurrentPage}
              />
            )}

          {currentPage === "finder" &&
            user?.role !== "admin" && (
              <VenueFinderPage
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                onSearch={handleStartSearch}
                isSearching={isSearching}
              />
            )}

          {currentPage === "match-results" &&
            user?.role !== "admin" && (
              <MatchResultsPage
                results={matchedResults}
                onBook={handleBookingAttempt}
              />
            )}

          {currentPage === "book-resource" &&
            selectedResource &&
            user?.role !== "admin" && (
              <BookResourcePage
                resource={selectedResource}
                searchParams={searchParams}
                onConfirm={finalizeBooking}
              />
            )}

          {currentPage === "status" &&
            user?.role !== "admin" && (
              <LiveStatusPage resources={resources} />
            )}

          {/* =====================================
              ADMIN PAGES
          ===================================== */}

          {currentPage === "admin" &&
            user?.role === "admin" && (
              <AdminOverview
                user={user}
                bookings={bookings}
                resources={resources}
                onNavigate={setCurrentPage}
              />
            )}

          {currentPage === "admin-events" &&
            user?.role === "admin" && (
              <AdminEventHistory />
            )}

          {currentPage === "admin-approvals" &&
            user?.role === "admin" && (
              <AdminApprovals
                bookings={bookings}
                setBookings={setBookings}
              />
            )}

          {currentPage === "admin-analytics" &&
            user?.role === "admin" && (
              <AdminAnalytics
                bookings={bookings}
                resources={resources}
              />
            )}
        </main>

        {/* =====================================
            CONFLICT MODAL
        ===================================== */}

        {conflictModalOpen && (
          <div className="modal-overlay">
            <div
              className="glass-card"
              style={{
                maxWidth: "540px",
                width: "90%",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <ShieldAlert
                size={55}
                color="#F472B6"
                style={{ marginBottom: "15px" }}
              />

              <h2>Scheduling Conflict Detected</h2>

              <p
                style={{
                  color: "var(--text-muted)",
                  margin: "15px 0 25px",
                }}
              >
                This resource is already booked during your selected
                time.
              </p>

              <div
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "rgba(34,211,238,0.08)",
                  marginBottom: "20px",
                }}
              >
                <strong style={{ color: "var(--cyan-electric)" }}>
                  Smart Recommendation
                </strong>

                <p style={{ marginTop: "8px" }}>
                  Try another available venue or time slot.
                </p>
              </div>

              <button
                className="btn-secondary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setConflictModalOpen(false);
                  setCurrentPage("finder");
                }}
              >
                Choose Another Resource
              </button>
            </div>
          </div>
        )}

        {/* =====================================
            BOOKING SUCCESS MODAL
        ===================================== */}

        {bookingSuccessModal && (
          <div className="modal-overlay">
            <div
              className="glass-card"
              style={{
                maxWidth: "450px",
                width: "90%",
                padding: "36px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "22px",
                  background: "rgba(34,197,94,0.15)",
                }}
              >
                <CheckCircle
                  size={45}
                  color="var(--status-success)"
                />
              </div>

              <h2>Booking Submitted Successfully!</h2>

              <p
                style={{
                  color: "var(--text-muted)",
                  margin: "12px 0 22px",
                }}
              >
                Your booking request has been sent for administrator
                approval.
              </p>

              <div
                style={{
                  display: "inline-block",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  background: "rgba(245,158,11,0.15)",
                  color: "var(--status-warning)",
                  fontWeight: "700",
                  marginBottom: "25px",
                }}
              >
                PENDING APPROVAL
              </div>

              <button
                className="btn-gradient"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setBookingSuccessModal(false);
                  setCurrentPage("dashboard");
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

/* =====================================================
   LANDING PAGE
===================================================== */

function LandingPage({ onLogin }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(124,58,237,0.22), transparent 30%), radial-gradient(circle at bottom left, rgba(34,211,238,0.12), transparent 35%), #080B16",
        color: "white",
      }}
    >
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #7C3AED, #22D3EE)",
            }}
          >
            <Building2 size={28} />
          </div>

          <h2 style={{ fontWeight: 900 }}>
            CAMPUS
            <span className="gradient-text-purple-cyan">
              FLOW
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            padding: "8px 18px",
            borderRadius: "30px",
            background: "rgba(124,58,237,0.15)",
            color: "#C084FC",
            marginBottom: "25px",
          }}
        >
          <Sparkles size={17} />
          SMART CAMPUS RESOURCE MANAGEMENT
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            marginBottom: "25px",
          }}
        >
          Book Smarter.
          <br />

          <span className="gradient-text-purple-cyan">
            Manage Better.
          </span>
        </h1>

        <p
          style={{
            maxWidth: "680px",
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginBottom: "35px",
          }}
        >
          CampusFlow helps students and administrators manage
          campus resources, avoid scheduling conflicts and
          optimize events intelligently.
        </p>

        <button
          className="btn-gradient"
          onClick={onLogin}
          style={{
            padding: "16px 35px",
            fontSize: "1rem",
          }}
        >
          Get Started
          <ArrowRight size={19} />
        </button>
      </section>
    </div>
  );
}

/* =====================================================
   STUDENT DASHBOARD
===================================================== */

function StudentDashboard({ user, bookings, onNavigate }) {
  const myBookings = bookings.filter(
    (booking) => booking.user === user?.name
  );

  return (
    <div className="main-content">
      <h1>Welcome back, {user?.name} 👋</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginTop: "8px",
          marginBottom: "35px",
        }}
      >
        Manage your campus resources and bookings from one place.
      </p>

      <div className="stats-grid">
        <StatCard
          icon={<Building2 />}
          title="AVAILABLE"
          value="08"
          color="var(--purple-bright)"
        />

        <StatCard
          icon={<Clock />}
          title="MY REQUESTS"
          value={myBookings.length}
          color="var(--status-warning)"
        />

        <StatCard
          icon={<CalendarDays />}
          title="UPCOMING"
          value="03"
          color="var(--cyan-electric)"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          margin: "35px 0",
        }}
      >
        <button
          className="btn-gradient"
          onClick={() => onNavigate("finder")}
        >
          <Search size={18} />
          Find a Resource
        </button>

        <button
          className="btn-secondary"
          onClick={() => onNavigate("status")}
        >
          <Activity size={18} />
          Live Status
        </button>
      </div>

      <h2 style={{ marginBottom: "20px" }}>
        My Recent Bookings
      </h2>

      {myBookings.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: "35px",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          No bookings yet. Find a resource to get started!
        </div>
      ) : (
        myBookings.slice(0, 4).map((booking) => (
          <div
            key={booking.id}
            className="glass-card"
            style={{
              padding: "20px",
              marginBottom: "15px",
            }}
          >
            <h3>{booking.resourceName}</h3>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              📅 {booking.date} • ⏰ {booking.startTime} -
              {booking.endTime}
            </p>

            <p
              style={{
                marginTop: "10px",
                color:
                  booking.status === "APPROVED"
                    ? "var(--status-success)"
                    : booking.status === "REJECTED"
                    ? "var(--status-danger)"
                    : "var(--status-warning)",
                fontWeight: 700,
              }}
            >
              {booking.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

/* =====================================================
   ADMIN OVERVIEW
===================================================== */

function AdminOverview({
  user,
  bookings,
  resources,
  onNavigate,
}) {
  const pendingBookings = bookings.filter(
    (b) => b.status === "PENDING"
  );

  const approvedBookings = bookings.filter(
    (b) => b.status === "APPROVED"
  );

  const successRate = 88;

  return (
    <div className="main-content">
      {/* HEADER */}

      <div
        style={{
          marginBottom: "35px",
          padding: "30px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(34,211,238,0.06))",
          border: "1px solid rgba(168,85,247,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              padding: "15px",
              borderRadius: "16px",
              background: "rgba(168,85,247,0.15)",
            }}
          >
            <ShieldCheck
              size={35}
              color="var(--purple-bright)"
            />
          </div>

          <div>
            <h1>Admin Command Center</h1>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "7px",
              }}
            >
              Welcome, {user?.name}. Manage events, approvals and
              campus resources from one place.
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        <StatCard
          icon={<CalendarCheck />}
          title="TOTAL EVENTS"
          value="24"
          color="var(--purple-bright)"
        />

        <StatCard
          icon={<Trophy />}
          title="SUCCESS RATE"
          value={`${successRate}%`}
          color="var(--status-success)"
        />

        <StatCard
          icon={<Clock />}
          title="PENDING REQUESTS"
          value={pendingBookings.length}
          color="var(--status-warning)"
        />

        <StatCard
          icon={<Building2 />}
          title="ACTIVE RESOURCES"
          value={resources.length}
          color="var(--cyan-electric)"
        />
      </div>

      {/* QUICK ACTIONS */}

      <h2 style={{ margin: "40px 0 20px" }}>
        Quick Management
      </h2>

      <div className="events-grid">
        <AdminActionCard
          icon={<History />}
          title="Event History"
          description="View all past campus events and their success."
          onClick={() => onNavigate("admin-events")}
        />

        <AdminActionCard
          icon={<ClipboardCheck />}
          title="Booking Approvals"
          description={`${pendingBookings.length} requests waiting for review.`}
          onClick={() => onNavigate("admin-approvals")}
        />

        <AdminActionCard
          icon={<BarChart3 />}
          title="Campus Analytics"
          description="Analyze resource usage and event performance."
          onClick={() => onNavigate("admin-analytics")}
        />
      </div>

      {/* UPCOMING EVENTS */}

      <h2 style={{ margin: "40px 0 20px" }}>
        Upcoming Campus Events
      </h2>

      <div className="events-grid">
        <EventCard
          name="Engineering Day 2026"
          date="15 September"
          time="10:00 AM"
          venue="Main Auditorium"
        />

        <EventCard
          name="Campus Hackathon"
          date="20 September"
          time="09:00 AM"
          venue="Computer Lab"
        />

        <EventCard
          name="Faculty Workshop"
          date="25 September"
          time="11:00 AM"
          venue="Conference Hall"
        />
      </div>

      {/* APPROVED */}

      <p
        style={{
          marginTop: "30px",
          color: "var(--text-muted)",
        }}
      >
        Approved booking requests:{" "}
        <strong style={{ color: "var(--status-success)" }}>
          {approvedBookings.length}
        </strong>
      </p>
    </div>
  );
}

/* =====================================================
   ADMIN EVENT HISTORY
===================================================== */

function AdminEventHistory() {
  const pastEvents = [
    {
      name: "Annual Tech Fest 2026",
      date: "22 August 2026",
      venue: "Main Auditorium",
      attendance: "850",
      status: "Successful",
      success: "96%",
    },
    {
      name: "AI & Innovation Summit",
      date: "10 August 2026",
      venue: "Seminar Hall A",
      attendance: "220",
      status: "Successful",
      success: "92%",
    },
    {
      name: "Cultural Evening",
      date: "28 July 2026",
      venue: "Open Air Theatre",
      attendance: "650",
      status: "Completed",
      success: "89%",
    },
    {
      name: "Sports Meet",
      date: "12 July 2026",
      venue: "Sports Ground",
      attendance: "900",
      status: "Successful",
      success: "94%",
    },
  ];

  return (
    <div className="main-content">
      <div style={{ marginBottom: "35px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <History
            size={32}
            color="var(--purple-bright)"
          />

          <div>
            <h1>Event History</h1>
            <p style={{ color: "var(--text-muted)" }}>
              Track past events, attendance and overall success.
            </p>
          </div>
        </div>
      </div>

      <div className="events-grid">
        {pastEvents.map((event, index) => (
          <div
            key={index}
            className="glass-card"
            style={{ padding: "25px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PartyPopper
                color="var(--purple-bright)"
                size={28}
              />

              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: "rgba(34,197,94,0.12)",
                  color: "var(--status-success)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {event.status}
              </span>
            </div>

            <h2
              style={{
                marginTop: "20px",
                fontSize: "1.2rem",
              }}
            >
              {event.name}
            </h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "15px",
              }}
            >
              📅 {event.date}
            </p>

            <p style={{ color: "var(--text-muted)" }}>
              📍 {event.venue}
            </p>

            <div
              style={{
                display: "flex",
                gap: "25px",
                marginTop: "22px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <strong
                  style={{
                    color: "var(--cyan-electric)",
                    fontSize: "1.3rem",
                  }}
                >
                  {event.attendance}
                </strong>

                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                  }}
                >
                  ATTENDEES
                </p>
              </div>

              <div>
                <strong
                  style={{
                    color: "var(--status-success)",
                    fontSize: "1.3rem",
                  }}
                >
                  {event.success}
                </strong>

                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                  }}
                >
                  SUCCESS
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   ADMIN APPROVALS
===================================================== */

function AdminApprovals({ bookings, setBookings }) {
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  );

  const updateBookingStatus = (id, status) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );
  };

  return (
    <div className="main-content">
      <div style={{ marginBottom: "35px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <ClipboardCheck
            size={32}
            color="var(--purple-bright)"
          />

          <div>
            <h1>Booking Approvals</h1>

            <p style={{ color: "var(--text-muted)" }}>
              Review and manage student resource booking requests.
            </p>
          </div>
        </div>
      </div>

      {pendingBookings.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: "50px",
            textAlign: "center",
          }}
        >
          <CheckCircle
            size={55}
            color="var(--status-success)"
          />

          <h2 style={{ marginTop: "20px" }}>
            All Caught Up!
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginTop: "10px",
            }}
          >
            There are no pending booking requests.
          </p>
        </div>
      ) : (
        pendingBookings.map((booking) => (
          <div
            key={booking.id}
            className="glass-card"
            style={{
              padding: "25px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "25px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2>{booking.resourceName}</h2>

                <p
                  style={{
                    color: "var(--purple-bright)",
                    marginTop: "10px",
                  }}
                >
                  Requested by: {booking.user}
                </p>

                <p
                  style={{
                    color: "var(--text-muted)",
                    marginTop: "8px",
                  }}
                >
                  📅 {booking.date}
                </p>

                <p style={{ color: "var(--text-muted)" }}>
                  ⏰ {booking.startTime} - {booking.endTime}
                </p>

                <p style={{ color: "var(--text-muted)" }}>
                  📍 {booking.location}
                </p>

                {booking.purpose && (
                  <p
                    style={{
                      marginTop: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    Purpose: {booking.purpose}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <button
                  className="btn-gradient"
                  onClick={() =>
                    updateBookingStatus(
                      booking.id,
                      "APPROVED"
                    )
                  }
                >
                  <CheckCircle size={18} />
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.id,
                      "REJECTED"
                    )
                  }
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border:
                      "1px solid rgba(239,68,68,0.35)",
                    background: "rgba(239,68,68,0.1)",
                    color: "var(--status-danger)",
                    cursor: "pointer",
                  }}
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* =====================================================
   ADMIN ANALYTICS
===================================================== */

function AdminAnalytics({ bookings, resources }) {
  const approved = bookings.filter(
    (b) => b.status === "APPROVED"
  ).length;

  const pending = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  return (
    <div className="main-content">
      <div style={{ marginBottom: "35px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <BarChart3
            size={32}
            color="var(--purple-bright)"
          />

          <div>
            <h1>Campus Analytics</h1>

            <p style={{ color: "var(--text-muted)" }}>
              Monitor campus events, bookings and resource
              performance.
            </p>
          </div>
        </div>
      </div>

      <div className="events-grid">
        <AnalyticsCard
          title="Event Success Rate"
          value="88%"
          icon={<Trophy />}
          description="Successful events across the campus"
        />

        <AnalyticsCard
          title="Resource Usage"
          value="78%"
          icon={<Building2 />}
          description="Average campus resource utilization"
        />

        <AnalyticsCard
          title="Approved Requests"
          value={approved}
          icon={<CheckCircle />}
          description="Booking requests successfully approved"
        />

        <AnalyticsCard
          title="Pending Requests"
          value={pending}
          icon={<Clock />}
          description="Requests waiting for administrator review"
        />

        <AnalyticsCard
          title="Campus Resources"
          value={resources.length}
          icon={<MapPin />}
          description="Resources currently managed"
        />

        <AnalyticsCard
          title="Attendance Growth"
          value="+18%"
          icon={<TrendingUp />}
          description="Compared with the previous month"
        />
      </div>

      <div
        className="glass-card"
        style={{
          marginTop: "30px",
          padding: "30px",
        }}
      >
        <h2>Performance Summary</h2>

        <p
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginTop: "15px",
          }}
        >
          CampusFlow analytics shows healthy campus resource
          utilization and strong event performance. Administrators
          can use this data to improve scheduling, avoid conflicts
          and optimize future campus events.
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   ADMIN ACTION CARD
===================================================== */

function AdminActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      className="glass-card"
      onClick={onClick}
      style={{
        padding: "28px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          color: "var(--purple-bright)",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <p
        style={{
          color: "var(--text-muted)",
          marginTop: "10px",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "20px",
          color: "var(--cyan-electric)",
          fontWeight: 700,
        }}
      >
        Open →
      </div>
    </div>
  );
}

/* =====================================================
   EVENT CARD
===================================================== */

function EventCard({ name, date, time, venue }) {
  return (
    <div
      className="glass-card"
      style={{ padding: "24px" }}
    >
      <CalendarDays
        color="var(--cyan-electric)"
        size={28}
      />

      <h3 style={{ marginTop: "18px" }}>{name}</h3>

      <p
        style={{
          color: "var(--text-muted)",
          marginTop: "12px",
        }}
      >
        📅 {date}
      </p>

      <p style={{ color: "var(--text-muted)" }}>
        ⏰ {time}
      </p>

      <p
        style={{
          color: "var(--purple-bright)",
          marginTop: "10px",
        }}
      >
        📍 {venue}
      </p>
    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({ icon, title, value, color }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontWeight: 700,
          }}
        >
          {title}
        </p>

        <h2
          style={{
            fontSize: "2rem",
            color,
            marginTop: "7px",
          }}
        >
          {value}
        </h2>
      </div>

      <div
        style={{
          color,
          padding: "13px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

/* =====================================================
   ANALYTICS CARD
===================================================== */

function AnalyticsCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div
      className="glass-card"
      style={{ padding: "28px" }}
    >
      <div
        style={{
          color: "var(--purple-bright)",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <p style={{ color: "var(--text-muted)" }}>
        {title}
      </p>

      <h2
        className="gradient-text-purple-cyan"
        style={{
          fontSize: "2.5rem",
          margin: "10px 0",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* =====================================================
   VENUE FINDER
===================================================== */

function VenueFinderPage({
  searchParams,
  setSearchParams,
  onSearch,
  isSearching,
}) {
  const facilityOptions = [
    {
      name: "Projector",
      icon: <Presentation size={18} />,
    },
    {
      name: "Microphone",
      icon: <Mic size={18} />,
    },
    {
      name: "WiFi",
      icon: <Wifi size={18} />,
    },
    {
      name: "Air Conditioning",
      icon: <Wind size={18} />,
    },
    {
      name: "Smart Board",
      icon: <MonitorSmartphone size={18} />,
    },
  ];

  const toggleFacility = (facility) => {
    const facilities = [...searchParams.facilities];

    const index = facilities.indexOf(facility);

    if (index > -1) {
      facilities.splice(index, 1);
    } else {
      facilities.push(facility);
    }

    setSearchParams({
      ...searchParams,
      facilities,
    });
  };

  return (
    <div
      className="main-content"
      style={{ maxWidth: "900px" }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <h1>Find Your Perfect Resource</h1>

        <p style={{ color: "var(--text-muted)" }}>
          Tell CampusFlow what you need.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "35px" }}>
        <div className="form-grid">
          <InputField
            label="Attendees"
            type="number"
            value={searchParams.people}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                people: e.target.value,
              })
            }
          />

          <InputField
            label="Date"
            type="date"
            value={searchParams.date}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                date: e.target.value,
              })
            }
          />

          <InputField
            label="Start Time"
            type="time"
            value={searchParams.startTime}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                startTime: e.target.value,
              })
            }
          />

          <InputField
            label="End Time"
            type="time"
            value={searchParams.endTime}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                endTime: e.target.value,
              })
            }
          />
        </div>

        <h3 style={{ margin: "25px 0 15px" }}>
          Required Facilities
        </h3>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {facilityOptions.map((option) => {
            const active =
              searchParams.facilities.includes(option.name);

            return (
              <button
                key={option.name}
                onClick={() => toggleFacility(option.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 16px",
                  borderRadius: "10px",
                  border: active
                    ? "1px solid var(--cyan-electric)"
                    : "1px solid var(--border-subtle)",
                  background: active
                    ? "rgba(34,211,238,0.1)"
                    : "rgba(255,255,255,0.03)",
                  color: active
                    ? "var(--cyan-electric)"
                    : "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                {option.icon}
                {option.name}
              </button>
            );
          })}
        </div>

        <button
          className="btn-gradient"
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={onSearch}
        >
          {isSearching ? (
            <>
              <BrainCircuit />
              Analyzing Campus...
            </>
          ) : (
            <>✨ Find Best Match</>
          )}
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   INPUT FIELD
===================================================== */

function InputField({
  label,
  type,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "10px",
          border: "1px solid var(--border-subtle)",
          background: "rgba(255,255,255,0.04)",
          color: "white",
        }}
      />
    </div>
  );
}

/* =====================================================
   MATCH RESULTS
===================================================== */

function MatchResultsPage({ results, onBook }) {
  return (
    <div className="main-content">
      <h1>Your Smart Recommendations</h1>

      <div
        className="events-grid"
        style={{ marginTop: "30px" }}
      >
        {results.map((resource, index) => (
          <div
            className="glass-card"
            key={resource.id}
            style={{ padding: "25px" }}
          >
            {index === 0 && (
              <div
                style={{
                  color: "var(--cyan-electric)",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                ⭐ BEST MATCH
              </div>
            )}

            <h2>{resource.name}</h2>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              📍 {resource.location}
            </p>

            <div
              style={{
                margin: "20px 0",
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "var(--cyan-electric)",
              }}
            >
              {resource.matchScore}% Match
            </div>

            <p>
              Capacity: {resource.capacity} people
            </p>

            <button
              className="btn-gradient"
              style={{ marginTop: "20px" }}
              onClick={() => onBook(resource)}
            >
              Book Resource
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   BOOK RESOURCE
===================================================== */

function BookResourcePage({
  resource,
  searchParams,
  onConfirm,
}) {
  const [purpose, setPurpose] = useState("");

  return (
    <div
      className="main-content"
      style={{ maxWidth: "800px" }}
    >
      <h1>Confirm Your Reservation</h1>

      <div
        className="glass-card"
        style={{
          padding: "30px",
          marginTop: "25px",
        }}
      >
        <h2>{resource.name}</h2>

        <p style={{ color: "var(--text-muted)" }}>
          📍 {resource.location}
        </p>

        <div style={{ marginTop: "25px" }}>
          <p>📅 {searchParams.date}</p>

          <p>
            ⏰ {searchParams.startTime} -
            {searchParams.endTime}
          </p>

          <p>👥 {searchParams.people} Attendees</p>
        </div>

        <textarea
          placeholder="Enter event purpose..."
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={{
            width: "100%",
            minHeight: "110px",
            marginTop: "25px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid var(--border-subtle)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
          }}
        />

        <button
          className="btn-gradient"
          style={{
            marginTop: "20px",
            width: "100%",
            justifyContent: "center",
          }}
          onClick={() => onConfirm(purpose)}
        >
          Confirm Booking Request
          <CheckCircle size={18} />
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   LIVE STATUS
===================================================== */

function LiveStatusPage({ resources }) {
  return (
    <div className="main-content">
      <h1>Live Campus Status</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "30px",
        }}
      >
        Check real-time availability of campus facilities.
      </p>

      <div className="events-grid">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="glass-card"
            style={{ padding: "24px" }}
          >
            <Building2
              color="var(--purple-bright)"
              size={28}
            />

            <h3 style={{ marginTop: "15px" }}>
              {resource.name}
            </h3>

            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              📍 {resource.location}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <span>
                Capacity: {resource.capacity}
              </span>

              <strong
                style={{
                  color:
                    resource.status === "AVAILABLE"
                      ? "var(--status-success)"
                      : "var(--status-warning)",
                }}
              >
                {resource.status}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}