import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function ConflictCenter() {

  const bookings =
    JSON.parse(
      localStorage.getItem("campusBookings")
    ) || [];


  const approvedBookings = bookings.filter(
    (booking) =>
      booking.status === "Approved"
  );


  const conflicts = [];


  for (
    let i = 0;
    i < approvedBookings.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < approvedBookings.length;
      j++
    ) {

      const first = approvedBookings[i];
      const second = approvedBookings[j];


      if (
        first.resource === second.resource &&
        first.date === second.date &&
        first.time === second.time
      ) {

        conflicts.push({
          id: `${first.id}-${second.id}`,
          first,
          second,
        });

      }

    }

  }


  return (

    <div className="admin-layout">

      <AdminNavbar />


      <main className="admin-main admin-page-main">


        <div className="admin-page-topbar">

          <div>

            <span className="admin-kicker">
              SMART CONFLICT DETECTION
            </span>

            <h1>
              Conflict Center
            </h1>

            <p>
              Detect booking conflicts and overlapping campus
              resource requests.
            </p>

          </div>

        </div>


        {conflicts.length === 0 ? (

          <div className="conflict-success">

            <CheckCircle2 size={50} />

            <h2>
              No Booking Conflicts
            </h2>

            <p>
              All approved bookings are currently
              conflict-free.
            </p>

          </div>

        ) : (

          <div className="conflicts-list">

            {conflicts.map((conflict) => (

              <div
                className="conflict-card"
                key={conflict.id}
              >

                <AlertTriangle size={25} />


                <div>

                  <h2>
                    Resource Conflict Detected
                  </h2>

                  <p>

                    <strong>
                      {conflict.first.resource}
                    </strong>{" "}

                    has overlapping bookings on{" "}

                    {conflict.first.date}.

                  </p>


                  <p>

                    Time: {conflict.first.time}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}