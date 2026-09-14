import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Bell,
  ClipboardList,
  CalendarCheck,
  Package,
  TrendingUp,
  Monitor,
  Mic,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {

  // ==========================================
  // GET LOGGED-IN USER
  // ==========================================

  const currentUser =
    JSON.parse(localStorage.getItem("campusflowUser")) || {};

  const userName =
    currentUser.name || "User";


  // ==========================================
  // GET BOOKINGS FROM LOCAL STORAGE
  // ==========================================

  const storedBookings =
    JSON.parse(localStorage.getItem("campusBookings")) || [];


  // ==========================================
  // DEMO DATA IF NO BOOKING EXISTS
  // ==========================================

  const demoBookings = [
    {
      id: 1,
      resource: "Seminar Hall A",
      location: "Academic Block A",
      date: "15 September 2026",
      time: "10:00 AM - 1:00 PM",
      capacity: "120 People",
      status: "Pending",
      equipment: ["Microphone", "Projector"],
      returnDeadline: "15 September 2026, 3:00 PM",
      equipmentReturned: false,
    },
  ];


  const bookings =
    storedBookings.length > 0
      ? storedBookings
      : demoBookings;


  // ==========================================
  // BOOKING FILTERS
  // ==========================================

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "Pending" ||
      booking.status === "pending"
  );


  const approvedBookings = bookings.filter(
    (booking) =>
      booking.status === "Approved" ||
      booking.status === "approved"
  );


  const equipmentPending = bookings.filter((booking) => {

    const equipment =
      booking.equipment ||
      booking.additionalItems;

    return (
      equipment &&
      equipment.length > 0 &&
      !booking.equipmentReturned
    );

  });


  return (

    <div className="app-layout">

      <Navbar />


      <main className="main-content dashboard-page">


        {/* ==========================================
            WELCOME SECTION
        ========================================== */}

        <section className="dashboard-welcome">

          <div className="welcome-content">

            <div className="welcome-tag">

              <Sparkles size={16} />

              SMART CAMPUS MANAGEMENT

            </div>


            <h1>
              Welcome back, {userName}!
            </h1>


            <p>
              Manage your campus resources, booking requests and
              equipment returns from one place.
            </p>


            <div className="welcome-buttons">

              <Link
                to="/venue-finder"
                className="primary-dashboard-btn"
              >

                Find a Resource

                <ArrowRight size={18} />

              </Link>


              <Link
                to="/my-bookings"
                className="secondary-dashboard-btn"
              >

                View My Bookings

              </Link>

            </div>

          </div>


          <div className="dashboard-illustration">

            <div className="illustration-circle circle-one"></div>

            <div className="illustration-circle circle-two"></div>


            <CalendarCheck size={80} />


            <div className="floating-card floating-card-one">

              <CheckCircle2 size={18} />

              Booking Managed

            </div>


            <div className="floating-card floating-card-two">

              <Bell size={18} />

              Smart Alerts

            </div>

          </div>

        </section>



        {/* ==========================================
            STATS
        ========================================== */}

        <section className="dashboard-stats">


          <div className="stat-card">

            <div className="stat-icon blue-icon">

              <ClipboardList size={23} />

            </div>


            <div>

              <span>Total Requests</span>

              <strong>{bookings.length}</strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon orange-icon">

              <Clock size={23} />

            </div>


            <div>

              <span>Pending Requests</span>

              <strong>{pendingBookings.length}</strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon green-icon">

              <CheckCircle2 size={23} />

            </div>


            <div>

              <span>Approved Bookings</span>

              <strong>{approvedBookings.length}</strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon purple-icon">

              <Package size={23} />

            </div>


            <div>

              <span>Equipment Pending</span>

              <strong>{equipmentPending.length}</strong>

            </div>

          </div>


        </section>



        {/* ==========================================
            MAIN DASHBOARD
        ========================================== */}

        <div className="dashboard-grid">


          {/* LEFT SIDE */}

          <section className="dashboard-main-section">


            <div className="section-heading">

              <div>

                <p className="section-kicker">
                  YOUR ACTIVITY
                </p>

                <h2>
                  Recent Booking Requests
                </h2>

                <p>
                  Track the latest status of your resource requests.
                </p>

              </div>


              <Link
                to="/my-bookings"
                className="view-all-link"
              >

                View All

                <ArrowRight size={17} />

              </Link>

            </div>



            <div className="dashboard-bookings">


              {bookings.slice(0, 3).map((booking, index) => {

                const equipment =
                  booking.equipment ||
                  booking.additionalItems ||
                  [];

                const bookingId =
                  booking.id ||
                  booking._id ||
                  index;

                return (

                  <div
                    className="dashboard-booking-card"
                    key={bookingId}
                  >


                    <div className="booking-resource-icon">

                      <CalendarDays size={24} />

                    </div>



                    <div className="booking-card-main">


                      <div className="booking-card-top">


                        <div>

                          <h3>
                            {booking.resource}
                          </h3>

                          <p>

                            <MapPin size={15} />

                            {booking.location}

                          </p>

                        </div>



                        <span
                          className={`booking-status ${String(
                            booking.status || "pending"
                          ).toLowerCase()}`}
                        >

                          {booking.status || "Pending"}

                        </span>


                      </div>



                      <div className="booking-card-details">


                        <span>

                          <CalendarDays size={16} />

                          {booking.date}

                        </span>


                        <span>

                          <Clock size={16} />

                          {booking.time ||
                            `${booking.startTime || ""} - ${booking.endTime || ""}`}

                        </span>


                        <span>

                          <Users size={16} />

                          {booking.capacity} People

                        </span>


                      </div>



                      {/* EQUIPMENT */}

                      {equipment.length > 0 && (

                        <div className="dashboard-equipment">


                          <span className="equipment-label">

                            <Package size={16} />

                            Additional Equipment:

                          </span>


                          <div className="equipment-tags">


                            {equipment.map((item, itemIndex) => {

                              const itemName =
                                typeof item === "string"
                                  ? item
                                  : item.name;

                              return (

                                <span
                                  className="equipment-tag"
                                  key={itemIndex}
                                >

                                  {itemName === "Microphone" && (
                                    <Mic size={14} />
                                  )}

                                  {itemName === "Projector" && (
                                    <Monitor size={14} />
                                  )}

                                  {itemName}

                                </span>

                              );

                            })}

                          </div>

                        </div>

                      )}



                      {/* RETURN STATUS */}

                      {equipment.length > 0 && (

                        <div
                          className={`equipment-return-status ${
                            booking.equipmentReturned
                              ? "returned"
                              : "return-pending"
                          }`}
                        >


                          {booking.equipmentReturned ? (

                            <>

                              <CheckCircle2 size={18} />

                              <div>

                                <strong>
                                  Equipment Return Confirmed
                                </strong>

                                <p>
                                  The administrator has confirmed that
                                  the borrowed equipment was returned.
                                </p>

                              </div>

                            </>

                          ) : (

                            <>

                              <RotateCcw size={18} />

                              <div>

                                <strong>
                                  Equipment Return Status
                                </strong>

                                <p>

                                  Return status will be updated by
                                  the administrator after the equipment
                                  is verified.

                                </p>

                                <small>

                                  Return deadline:{" "}

                                  <b>
                                    {booking.returnDeadline ||
                                      "Within 2 hours after the event"}
                                  </b>

                                </small>

                              </div>

                            </>

                          )}


                        </div>

                      )}


                    </div>

                  </div>

                );

              })}


            </div>

          </section>



          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          <aside className="dashboard-sidebar">


            {/* NOTIFICATIONS */}

            <div className="dashboard-side-card">


              <div className="side-card-title">

                <div>

                  <Bell size={20} />

                  <h3>Notifications</h3>

                </div>

                <span className="notification-dot"></span>

              </div>



              {pendingBookings.length > 0 && (

                <div className="notification-item pending-notification">

                  <Clock size={18} />

                  <div>

                    <strong>
                      Booking Request Pending
                    </strong>

                    <p>
                      Your request is waiting for admin approval.
                      You will be notified once it is approved
                      or declined.
                    </p>

                  </div>

                </div>

              )}



              {equipmentPending.length > 0 && (

                <div className="notification-item return-notification">

                  <Package size={18} />

                  <div>

                    <strong>
                      Equipment Return Status
                    </strong>

                    <p>
                      The administrator will verify and update
                      the return status of borrowed equipment.
                    </p>

                  </div>

                </div>

              )}



              {approvedBookings.length > 0 && (

                <div className="notification-item approved-notification">

                  <CheckCircle2 size={18} />

                  <div>

                    <strong>
                      Booking Approved
                    </strong>

                    <p>
                      Your resource booking has been approved.
                      Check My Bookings for complete details.
                    </p>

                  </div>

                </div>

              )}


            </div>



            {/* SMART TIP */}

            <div className="dashboard-side-card smart-tip-card">


              <div className="side-card-title">

                <div>

                  <TrendingUp size={20} />

                  <h3>CampusFlow Tip</h3>

                </div>

              </div>


              <div className="smart-tip-content">

                <div className="tip-icon">
                  💡
                </div>

                <p>
                  Request all required facilities together when
                  booking a venue. You can select multiple
                  requirements like WiFi, AC and Projector.
                </p>

              </div>

            </div>



            {/* QUICK ACTION */}

            <div className="quick-action-card">

              <div className="quick-action-icon">

                <CalendarDays size={25} />

              </div>


              <h3>
                Need a Resource?
              </h3>


              <p>
                Find the best available venue using smart matching.
              </p>


              <Link
                to="/venue-finder"
                className="quick-action-btn"
              >

                Find Venue

                <ArrowRight size={17} />

              </Link>

            </div>


          </aside>


        </div>



        {/* ==========================================
            RETURN SUMMARY
        ========================================== */}

        {equipmentPending.length > 0 && (

          <section className="return-summary">


            <div className="return-summary-icon">

              <RotateCcw size={25} />

            </div>


            <div>

              <h3>
                Equipment Return Tracking
              </h3>

              <p>
                CampusFlow tracks borrowed equipment and the
                administrator verifies the return before marking
                the equipment as returned.
              </p>

            </div>


            <Link
              to="/my-bookings"
              className="return-summary-btn"
            >

              Check Returns

              <ArrowRight size={17} />

            </Link>

          </section>

        )}


      </main>

    </div>

  );
}