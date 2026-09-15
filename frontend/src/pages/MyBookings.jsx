import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Wind,
  Mic,
  CheckCircle2,
  AlertCircle,
  Package,
  ShieldCheck,
} from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        " https://campusflow-backend2.onrender.com"
      );

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log("Using local booking data");

      // Fallback to localStorage
      const storedBookings =
        JSON.parse(
          localStorage.getItem("campusBookings")
        ) || [];

      setBookings(storedBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status = "pending") => {
    const currentStatus = status.toLowerCase();

    if (currentStatus === "approved") {
      return "my-status-approved";
    }

    if (currentStatus === "declined") {
      return "my-status-declined";
    }

    if (currentStatus === "completed") {
      return "my-status-completed";
    }

    return "my-status-pending";
  };

  // ==========================================
  // STATUS TEXT
  // ==========================================

  const getStatusText = (status = "pending") => {
    return (
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase()
    );
  };

  if (loading) {
    return (
      <div className="app-layout">
        <Navbar />

        <main className="main-content my-bookings-page">
          <div className="my-bookings-loading">
            <div className="loading-circle"></div>
            <p>Loading your bookings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content my-bookings-page">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <section className="my-bookings-hero">

          <div className="my-bookings-hero-content">

            <span className="my-bookings-kicker">
              CAMPUSFLOW BOOKINGS
            </span>

            <h1>My Bookings</h1>

            <p>
              Track your booking requests, approvals,
              borrowed equipment and return verification
              from one place.
            </p>

          </div>

          <div className="my-bookings-total-card">

            <span>Total Bookings</span>

            <strong>
              {bookings.length}
            </strong>

          </div>

        </section>


        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {bookings.length === 0 && (

          <div className="my-empty-bookings">

            <div className="my-empty-icon">
              <Calendar size={40} />
            </div>

            <h2>No Bookings Yet</h2>

            <p>
              Your resource booking requests will appear
              here once you send them.
            </p>

          </div>

        )}


        {/* ================================= */}
        {/* BOOKINGS */}
        {/* ================================= */}

        <div className="my-bookings-wrapper">

          {bookings.map((booking, bookingIndex) => {

            const status =
              booking.status || "pending";

            const additionalItems =
              booking.additionalItems ||
              booking.equipment ||
              [];

            return (

              <article
                className="my-booking-premium-card"
                key={
                  booking._id ||
                  booking.id ||
                  bookingIndex
                }
              >

                {/* TOP */}

                <div className="my-booking-card-top">

                  <div className="my-booking-resource-info">

                    <span className="my-resource-label">
                      CAMPUS RESOURCE
                    </span>

                    <h2>
                      {booking.resource ||
                        "Seminar Hall A"}
                    </h2>

                    <p className="my-booking-location">

                      <MapPin size={16} />

                      {booking.location ||
                        "Academic Block A"}

                    </p>

                  </div>


                  <span
                    className={`my-booking-status ${getStatusClass(
                      status
                    )}`}
                  >

                    {status.toLowerCase() ===
                      "pending" && (
                      <AlertCircle size={15} />
                    )}

                    {status.toLowerCase() ===
                      "approved" && (
                      <CheckCircle2 size={15} />
                    )}

                    {getStatusText(status)}

                  </span>

                </div>


                <div className="my-card-divider"></div>


                {/* ================================= */}
                {/* BOOKING DETAILS */}
                {/* ================================= */}

                <section className="my-booking-details-section">

                  <h3>Booking Details</h3>


                  <div className="my-booking-details-grid">


                    {/* DATE */}

                    <div className="my-detail-card">

                      <div className="my-detail-icon">

                        <Calendar size={20} />

                      </div>

                      <div>

                        <span>Date</span>

                        <strong>
                          {booking.date}
                        </strong>

                      </div>

                    </div>


                    {/* TIME */}

                    <div className="my-detail-card">

                      <div className="my-detail-icon">

                        <Clock size={20} />

                      </div>

                      <div>

                        <span>Event Time</span>

                        <strong>

                          {booking.startTime
                            ? `${booking.startTime} - ${booking.endTime}`
                            : booking.time}

                        </strong>

                      </div>

                    </div>


                    {/* CAPACITY */}

                    <div className="my-detail-card">

                      <div className="my-detail-icon">

                        <Users size={20} />

                      </div>

                      <div>

                        <span>Expected Capacity</span>

                        <strong>

                          {booking.capacity} People

                        </strong>

                      </div>

                    </div>

                  </div>

                </section>


                {/* ================================= */}
                {/* FACILITIES */}
                {/* ================================= */}

                {booking.facilities?.length > 0 && (

                  <section className="my-booking-section">

                    <h3>
                      Required Facilities
                    </h3>


                    <div className="my-facilities-list">

                      {booking.facilities.map(
                        (facility, index) => (

                          <div
                            className="my-facility-tag"
                            key={index}
                          >

                            {facility ===
                              "Projector" && (
                              <Monitor size={17} />
                            )}

                            {facility ===
                              "WiFi" && (
                              <Wifi size={17} />
                            )}

                            {facility ===
                              "Air Conditioning" && (
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

                )}


                {/* ================================= */}
                {/* BORROWED EQUIPMENT */}
                {/* ================================= */}

                {additionalItems.length > 0 && (

                  <section className="my-equipment-section">


                    <div className="my-equipment-heading">

                      <div>

                        <span className="my-equipment-title">

                          <Package size={19} />

                          Borrowed Equipment

                        </span>


                        <p>
                          Return the equipment physically
                          to authorized campus staff.
                          Return status will be verified
                          by the administrator.
                        </p>

                      </div>


                      <span className="my-return-required">

                        Return Required

                      </span>

                    </div>


                    <div className="my-equipment-list">


                      {additionalItems.map(
                        (item, index) => {

                          const itemName =
                            typeof item === "string"
                              ? item
                              : item.name;

                          const quantity =
                            typeof item === "object"
                              ? item.quantity
                              : 1;

                          const returned =
                            typeof item === "object" &&
                            item.returned === true;

                          return (

                            <div
                              className="my-equipment-item"
                              key={index}
                            >

                              <div className="my-equipment-item-left">

                                <div className="my-equipment-icon">

                                  <Mic size={20} />

                                </div>


                                <div>

                                  <strong>
                                    {itemName}
                                  </strong>

                                  <span>
                                    Quantity: {quantity}
                                  </span>

                                </div>

                              </div>


                              {returned ? (

                                <span className="my-returned-badge">

                                  <CheckCircle2 size={15} />

                                  Verified Returned

                                </span>

                              ) : (

                                <span className="my-awaiting-badge">

                                  Awaiting Verification

                                </span>

                              )}

                            </div>

                          );

                        }
                      )}

                    </div>


                    {/* RETURN DEADLINE */}

                    <div className="my-return-deadline-card">

                      <Clock size={20} />


                      <div>

                        <span>
                          Equipment Return Deadline
                        </span>

                        <strong>

                          {booking.returnDeadline ||
                            "Within 2 hours after the event ends"}

                        </strong>

                      </div>

                    </div>


                    {/* FINE */}

                    <div className="my-fine-warning">

                      <AlertCircle size={18} />

                      <p>

                        If borrowed equipment is not
                        returned before the deadline,
                        a fine may be applied according
                        to campus rules.

                      </p>

                    </div>


                    {/* ADMIN VERIFICATION */}

                    <div className="my-admin-verification">

                      <ShieldCheck size={20} />

                      <div>

                        <strong>
                          Admin Return Verification
                        </strong>

                        <p>
                          After you physically return the
                          equipment, the administrator
                          will verify and update its status
                          here.
                        </p>

                      </div>

                    </div>

                  </section>

                )}


                {/* ================================= */}
                {/* PENDING MESSAGE */}
                {/* ================================= */}

                {status.toLowerCase() ===
                  "pending" && (

                  <div className="my-pending-message">

                    <AlertCircle size={21} />

                    <div>

                      <strong>
                        Waiting for Admin Approval
                      </strong>

                      <p>
                        Your booking request has been sent
                        successfully. You will be notified
                        when the administrator approves
                        or declines your request.
                      </p>

                    </div>

                  </div>

                )}


                {/* APPROVED */}

                {status.toLowerCase() ===
                  "approved" && (

                  <div className="my-approved-message">

                    <CheckCircle2 size={21} />

                    <div>

                      <strong>
                        Booking Approved
                      </strong>

                      <p>
                        Your booking request has been
                        approved by the administrator.
                      </p>

                    </div>

                  </div>

                )}

              </article>

            );

          })}

        </div>

      </main>

    </div>
  );
}
