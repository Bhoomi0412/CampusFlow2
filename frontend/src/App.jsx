import { Routes, Route } from "react-router-dom";

// ================= STUDENT PAGES =================
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import VenueFinder from "./pages/VenueFinder";
import MatchResult from "./pages/MatchResult";
import BookResource from "./pages/BookResource";
import MyBookings from "./pages/MyBookings";
import LiveStatus from "./pages/LiveStatus";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/AdminDashboard";
import EventManagement from "./pages/EventManagement";
import CreateEvent from "./pages/CreateEvent";
import EventTimeline from "./pages/EventTimeline";
import PastEvents from "./pages/PastEvents";
import AdminResources from "./pages/AdminResources";
import BookingApprovals from "./pages/BookingApprovals";
import EquipmentReturns from "./pages/EquipmentReturns";
import AdminAnalytics from "./pages/AdminAnalytics";
import ConflictCenter from "./pages/ConflictCenter";

// ================= COMPONENTS =================
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= CSS =================
import "./App.css";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />


      {/* ================= STUDENT ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/venue-finder"
        element={
          <ProtectedRoute>
            <VenueFinder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/match-result"
        element={
          <ProtectedRoute>
            <MatchResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book-resource"
        element={
          <ProtectedRoute>
            <BookResource />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/live-status"
        element={
          <ProtectedRoute>
            <LiveStatus />
          </ProtectedRoute>
        }
      />


      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <EventManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/timeline"
        element={
          <ProtectedRoute>
            <EventTimeline />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/past-events"
        element={
          <ProtectedRoute>
            <PastEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/resources"
        element={
          <ProtectedRoute>
            <AdminResources />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/approvals"
        element={
          <ProtectedRoute>
            <BookingApprovals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/returns"
        element={
          <ProtectedRoute>
            <EquipmentReturns />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/conflicts"
        element={
          <ProtectedRoute>
            <ConflictCenter />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;