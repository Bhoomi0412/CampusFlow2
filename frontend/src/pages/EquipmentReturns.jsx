import { useEffect, useState } from "react";

import {
  RotateCcw,
  Package,
  CheckCircle2,
  Clock3,
  Loader2,
} from "lucide-react";

import AdminNavbar from "../components/AdminNavbar";

export default function EquipmentReturns() {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(null);


  // ==========================================
  // FETCH BOOKINGS FROM BACKEND
  // ==========================================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings"
      );

      const data = await response.json();

      if (data.success) {

        setBookings(data.bookings);

      }

    } catch (error) {

      console.error(
        "Error fetching equipment bookings:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchBookings();

  }, []);


  // ==========================================
  // ONLY BOOKINGS WITH EQUIPMENT
  // ==========================================

  const equipmentBookings = bookings.filter(
    (booking) =>
      booking.additionalItems &&
      booking.additionalItems.length > 0
  );


  // ==========================================
  // MARK SINGLE ITEM AS RETURNED
  // ==========================================

  const markReturned = async (
    bookingId,
    itemIndex
  ) => {

    try {

      setUpdating(
        `${bookingId}-${itemIndex}`
      );


      const response = await fetch(

        `http://localhost:5000/api/bookings/${bookingId}/items/${itemIndex}/return`,

        {
          method: "PUT",
        }

      );


      const data = await response.json();


      if (!response.ok || !data.success) {

        alert(
          data.message ||
          "Unable to update equipment."
        );

        return;

      }


      // Update UI

      setBookings((previousBookings) =>

        previousBookings.map((booking) =>

          booking._id === bookingId
            ? data.booking
            : booking

        )

      );


    } catch (error) {

      console.error(
        "Equipment return error:",
        error
      );

      alert(
        "Backend connection failed."
      );

    } finally {

      setUpdating(null);

    }

  };


  return (

    <div className="admin-layout">

      <AdminNavbar />


      <main className="admin-main admin-page-main">

        <div className="admin-page">


          {/* ================= HEADER ================= */}

          <div className="admin-page-header">

            <div>

              <span className="admin-kicker">

                EQUIPMENT MANAGEMENT

              </span>


              <h1>

                Equipment Returns

              </h1>


              <p>

                Track borrowed campus equipment and confirm
                successful returns.

              </p>

            </div>

          </div>


          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="admin-empty-state">

              <Loader2
                size={48}
                className="spin-loader"
              />

              <h2>
                Loading Equipment...
              </h2>

              <p>
                Fetching equipment requests.
              </p>

            </div>

          ) : (


            <div className="returns-grid">


              {equipmentBookings.length === 0 ? (

                <div className="admin-empty-state">

                  <Package size={50} />

                  <h2>
                    No Equipment Requests
                  </h2>

                  <p>
                    There is currently no borrowed equipment
                    to track.
                  </p>

                </div>

              ) : (


                equipmentBookings.map((booking) => (

                  <div
                    className="return-card"
                    key={booking._id}
                  >


                    {/* ================= TOP ================= */}

                    <div className="return-card-top">


                      <div className="return-icon">

                        <Package size={24} />

                      </div>


                      <div>

                        <h2>

                          {booking.resource}

                        </h2>


                        <p>

                          Equipment assigned to this booking

                        </p>

                      </div>


                    </div>


                    {/* ================= EQUIPMENT ================= */}

                    <div className="return-equipment-list">


                      {booking.additionalItems.map(
                        (item, index) => {


                          const isUpdating =

                            updating ===
                            `${booking._id}-${index}`;


                          return (

                            <div
                              className="return-equipment-item"
                              key={index}
                            >


                              <div>

                                <strong>

                                  {item.name}

                                </strong>


                                <span>

                                  Quantity: {item.quantity}

                                </span>

                              </div>


                              {item.returned ? (

                                <div className="returned-status">

                                  <CheckCircle2 size={18} />

                                  Returned

                                </div>

                              ) : (

                                <button

                                  className="mark-returned-btn"

                                  disabled={isUpdating}

                                  onClick={() =>

                                    markReturned(
                                      booking._id,
                                      index
                                    )

                                  }

                                >

                                  <RotateCcw size={17} />

                                  {isUpdating
                                    ? "Updating..."
                                    : "Mark Returned"}

                                </button>

                              )}


                            </div>

                          );

                        }

                      )}


                    </div>


                    {/* ================= STATUS ================= */}

                    {booking.additionalItems.every(
                      (item) => item.returned
                    ) ? (

                      <div className="returned-status">

                        <CheckCircle2 size={20} />


                        <div>

                          <strong>

                            All Equipment Returned

                          </strong>


                          <p>

                            All borrowed equipment has been
                            successfully verified.

                          </p>

                        </div>

                      </div>

                    ) : (

                      <div className="return-pending-status">

                        <Clock3 size={20} />


                        <div>

                          <strong>

                            Return Pending

                          </strong>


                          <p>

                            Some equipment is still awaiting
                            return verification.

                          </p>

                        </div>

                      </div>

                    )}


                  </div>

                ))

              )}


            </div>

          )}

        </div>

      </main>

    </div>

  );

}