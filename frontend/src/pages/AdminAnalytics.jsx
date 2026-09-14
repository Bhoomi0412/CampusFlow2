import AdminNavbar from "../components/AdminNavbar";

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Building2,
  Users,
  TrendingUp,
  Activity,
  ClipboardList,
} from "lucide-react";

export default function AdminAnalytics() {

  const bookings =
    JSON.parse(localStorage.getItem("campusBookings")) || [];

  const events =
    JSON.parse(localStorage.getItem("campusEvents")) || [];

  const resources =
    JSON.parse(localStorage.getItem("campusResources")) || [];


  // ===============================
  // CALCULATIONS
  // ===============================

  const totalBookings = bookings.length;

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;


  const successRate =
    totalBookings > 0
      ? Math.round(
          (approvedBookings / totalBookings) * 100
        )
      : 0;


  const maxValue = Math.max(
    totalBookings,
    approvedBookings,
    pendingBookings,
    rejectedBookings,
    1
  );


  return (

    <div className="admin-layout">

      <AdminNavbar />

      <main className="admin-main admin-page-main">


        {/* HEADER */}

        <div className="admin-page-header">

          <div>

            <span className="admin-kicker">
              CAMPUS INSIGHTS
            </span>

            <h1>Analytics & Performance</h1>

            <p>
              Monitor booking performance, resource usage and
              overall campus management activity.
            </p>

          </div>


          <div className="analytics-live-badge">

            <Activity size={18} />

            <span>Live Analytics</span>

          </div>

        </div>



        {/* ANALYTICS STATS */}

        <section className="analytics-stats-grid">


          <div className="analytics-stat-card">

            <div className="analytics-icon">
              <ClipboardList size={23} />
            </div>

            <span>Total Booking Requests</span>

            <strong>{totalBookings}</strong>

            <small>All campus requests</small>

          </div>



          <div className="analytics-stat-card">

            <div className="analytics-icon">
              <CheckCircle2 size={23} />
            </div>

            <span>Approved Requests</span>

            <strong>{approvedBookings}</strong>

            <small>Successfully approved</small>

          </div>



          <div className="analytics-stat-card">

            <div className="analytics-icon">
              <Clock3 size={23} />
            </div>

            <span>Pending Requests</span>

            <strong>{pendingBookings}</strong>

            <small>Waiting for review</small>

          </div>



          <div className="analytics-stat-card">

            <div className="analytics-icon">
              <Building2 size={23} />
            </div>

            <span>Campus Resources</span>

            <strong>{resources.length}</strong>

            <small>Available facilities</small>

          </div>

        </section>



        {/* MAIN ANALYTICS */}

        <section className="analytics-main-grid">


          {/* BOOKING OVERVIEW */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span className="panel-kicker">
                  BOOKING OVERVIEW
                </span>

                <h2>Request Performance</h2>

              </div>

              <BarChart3 size={23} />

            </div>


            <div className="analytics-chart">


              {/* TOTAL */}

              <div className="chart-row">

                <div className="chart-label">
                  <span>Total Requests</span>
                  <strong>{totalBookings}</strong>
                </div>

                <div className="chart-track">

                  <div
                    className="chart-fill total"
                    style={{
                      width: `${
                        (totalBookings / maxValue) * 100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>



              {/* APPROVED */}

              <div className="chart-row">

                <div className="chart-label">
                  <span>Approved</span>
                  <strong>{approvedBookings}</strong>
                </div>

                <div className="chart-track">

                  <div
                    className="chart-fill approved"
                    style={{
                      width: `${
                        (approvedBookings / maxValue) *
                        100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>



              {/* PENDING */}

              <div className="chart-row">

                <div className="chart-label">
                  <span>Pending</span>
                  <strong>{pendingBookings}</strong>
                </div>

                <div className="chart-track">

                  <div
                    className="chart-fill pending"
                    style={{
                      width: `${
                        (pendingBookings / maxValue) *
                        100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>



              {/* REJECTED */}

              <div className="chart-row">

                <div className="chart-label">
                  <span>Rejected</span>
                  <strong>{rejectedBookings}</strong>
                </div>

                <div className="chart-track">

                  <div
                    className="chart-fill rejected"
                    style={{
                      width: `${
                        (rejectedBookings / maxValue) *
                        100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


            </div>

          </div>



          {/* SUCCESS SCORE */}

          <div className="analytics-panel success-score-panel">

            <div className="analytics-panel-header">

              <div>

                <span className="panel-kicker">
                  PERFORMANCE SCORE
                </span>

                <h2>Booking Success Rate</h2>

              </div>

              <TrendingUp size={23} />

            </div>


            <div className="success-score-content">

              <div className="success-circle">

                <strong>{successRate}%</strong>

                <span>Success Rate</span>

              </div>


              <div className="success-score-text">

                <h3>
                  {successRate >= 70
                    ? "Excellent Performance"
                    : successRate >= 40
                    ? "Good Progress"
                    : "Needs Attention"}
                </h3>

                <p>
                  Based on approved campus resource booking
                  requests.
                </p>

              </div>

            </div>

          </div>


        </section>



        {/* BOTTOM INSIGHTS */}

        <section className="analytics-insights-grid">


          <div className="analytics-insight-card">

            <div className="insight-icon">
              <CalendarDays size={24} />
            </div>

            <div>

              <span>Total Campus Events</span>

              <strong>{events.length}</strong>

              <p>
                Events currently managed through CampusFlow.
              </p>

            </div>

          </div>



          <div className="analytics-insight-card">

            <div className="insight-icon">
              <Users size={24} />
            </div>

            <div>

              <span>Campus Management</span>

              <strong>
                {approvedBookings + events.length}
              </strong>

              <p>
                Total approved activities and managed events.
              </p>

            </div>

          </div>



          <div className="analytics-insight-card">

            <div className="insight-icon">
              <Activity size={24} />
            </div>

            <div>

              <span>System Activity</span>

              <strong>
                {totalBookings > 0
                  ? "Active"
                  : "Ready"}
              </strong>

              <p>
                CampusFlow is monitoring your campus resources.
              </p>

            </div>

          </div>


        </section>


      </main>

    </div>
  );
}