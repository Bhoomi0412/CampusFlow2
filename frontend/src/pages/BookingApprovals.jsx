import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  MapPin,
  Users,
  Loader2,
  RefreshCw,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function BookingApprovals() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // GET BOOKINGS FROM MONGODB
  // ==========================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        " https://campusflow-backend2.onrender.com"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch bookings"
        );
      }

      setBookings(data.bookings || []);

    } catch (error) {
      console.error(
        "Error fetching bookings:",
        error
      );

      setError(
        "Unable to connect to the backend. Please check that your backend server is running."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {
    fetchBookings();
  }, []);


  // ==========================================
  // UPDATE BOOKING STATUS
  // ==========================================

  const updateBookingStatus = async (
    bookingId,
    status
  ) => {
    try {
      setUpdatingId(bookingId);
      setError("");

      const response = await fetch(
        ` https://campusflow-backend2.onrender.com/${bookingId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update booking"
        );
      }


      // ==========================================
      // UPDATE UI IMMEDIATELY
      // ==========================================

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );

    } catch (error) {
      console.error(
        "Update booking error:",
        error
      );

      alert(
        error.message ||
          "Unable to update booking."
      );

    } finally {
      setUpdatingId(null);
    }
  };


  // ==========================================
  // PENDING BOOKINGS
  // ==========================================

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status?.toLowerCase() === "pending"
  );


  return (
    <div className="admin-layout">

      {/* ================= ADMIN NAVBAR ================= */}

      <AdminNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="admin-main admin-page-main">

        <div className="admin-page">


          {/* ================= HEADER ================= */}

          <div className="admin-page-header">

            <div>

              <span className="admin-kicker">
                BOOKING MANAGEMENT
              </span>

              <h1>
                Booking Approvals
              </h1>

              <p>
                Review student booking requests and approve
                or decline them.
              </p>

            </div>


            {/* REFRESH BUTTON */}

            <button
              className="admin-refresh-btn"
              onClick={fetchBookings}
              disabled={loading}
            >

              <RefreshCw
                size={18}
                className={
                  loading ? "spin-loader" : ""
                }
              />

              Refresh

            </button>

          </div>


          {/* ================= COUNT ================= */}

          <div className="approval-count">

            <span>
              Pending Requests
            </span>

            <strong>
              {pendingBookings.length}
            </strong>

          </div>


          {/* ================= ERROR ================= */}

          {error && (

            <div className="admin-booking-error">

              <strong>
                Connection Error
              </strong>

              <p>
                {error}
              </p>

            </div>

          )}


          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="admin-empty-state">

              <Loader2
                size={45}
                className="spin-loader"
              />

              <h2>
                Loading Requests...
              </h2>

              <p>
                Fetching booking requests from MongoDB.
              </p>

            </div>

          ) : pendingBookings.length === 0 ? (


            /* ================= EMPTY ================= */

            <div className="admin-empty-state">

              <CheckCircle2 size={48} />

              <h2>
                All Requests Reviewed
              </h2>

              <p>
                There are currently no pending booking requests.
              </p>

            </div>


          ) : (


            /* ================= REQUEST LIST ================= */

            <div className="approval-list">

              {pendingBookings.map((booking) => (

                <div
                  className="approval-card"
                  key={booking._id}
                >


                  {/* ================= TOP ================= */}

                  <div className="approval-card-top">

                    <div>

                      <h2>
                        {booking.resource}
                      </h2>


                      <p className="booking-student-name">

                        Requested by:{" "}

                        <strong>
                          {booking.userName || "Student"}
                        </strong>

                      </p>


                      <p>

                        <MapPin size={16} />

                        {booking.location ||
                          "Campus Location"}

                      </p>

                    </div>


                    <span className="pending-badge">

                      Pending

                    </span>

                  </div>



                  {/* ================= DETAILS ================= */}

                  <div className="approval-details">

                    <span>

                      <CalendarDays size={16} />

                      {booking.date || "Not specified"}

                    </span>


                    <span>

                      <Clock3 size={16} />

                      {booking.startTime
                        ? `${booking.startTime} - ${booking.endTime}`
                        : booking.time || "Not specified"}

                    </span>


                    <span>

                      <Users size={16} />

                      {booking.capacity || 0} People

                    </span>

                  </div>



                  {/* ================= PURPOSE ================= */}

                  {booking.purpose && (

                    <div className="approval-purpose">

                      <strong>
                        Purpose:
                      </strong>

                      <span>
                        {booking.purpose}
                      </span>

                    </div>

                  )}



                  {/* ================= EQUIPMENT ================= */}

                  {booking.additionalItems?.length > 0 && (

                    <div className="approval-equipment">

                      <strong>
                        Requested Equipment:
                      </strong>


                      <div>

                        {booking.additionalItems.map(
                          (item, index) => (

                            <span key={index}>

                              {typeof item === "string"
                                ? item
                                : `${item.name} (${item.quantity})`}

                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}



                  {/* ================= ACTIONS ================= */}

                  <div className="approval-actions">


                    {/* APPROVE */}

                    <button
                      className="approve-btn"

                      disabled={
                        updatingId === booking._id
                      }

                      onClick={() =>
                        updateBookingStatus(
                          booking._id,
                          "approved"
                        )
                      }
                    >

                      {updatingId === booking._id ? (

                        <Loader2
                          size={18}
                          className="spin-loader"
                        />

                      ) : (

                        <CheckCircle2 size={18} />

                      )}

                      {updatingId === booking._id
                        ? "Updating..."
                        : "Approve Booking"}

                    </button>



                    {/* DECLINE */}

                    <button
                      className="reject-btn"

                      disabled={
                        updatingId === booking._id
                      }

                      onClick={() =>
                        updateBookingStatus(
                          booking._id,
                          "rejected"
                        )
                      }
                    >

                      <XCircle size={18} />

                      Decline

                    </button>


                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}