export default function MyBookings({ bookings, user }) {
  const myBookings = bookings.filter(
    (booking) => booking.user === user.name
  );

  return (
    <div className="main-content">
      <h1>My Bookings</h1>

      <p style={{ color: '#94A3B8', marginTop: '8px' }}>
        Track all your campus resource booking requests.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          marginTop: '30px'
        }}
      >
        {myBookings.length === 0 ? (
          <div className="glass-card" style={{ padding: '30px' }}>
            No bookings found.
          </div>
        ) : (
          myBookings.map((booking) => (
            <div
              key={booking.id}
              className="glass-card"
              style={{
                padding: '22px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '15px'
              }}
            >
              <div>
                <h3>{booking.resourceName}</h3>

                <p style={{ color: '#94A3B8' }}>
                  {booking.date}
                </p>

                <p style={{ color: '#94A3B8' }}>
                  {booking.startTime} - {booking.endTime}
                </p>

                <p style={{ marginTop: '8px' }}>
                  {booking.purpose}
                </p>
              </div>

              <strong
                style={{
                  color:
                    booking.status === 'APPROVED'
                      ? '#22C55E'
                      : booking.status === 'REJECTED'
                      ? '#EF4444'
                      : '#F59E0B'
                }}
              >
                {booking.status}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}