import {
  Building2,
  Clock,
  Users,
  CalendarDays,
  Search,
  Activity
} from 'lucide-react';

export default function Dashboard({
  user,
  bookings,
  resources,
  onNavigate
}) {
  const available = resources.filter(
    (r) => r.status === 'AVAILABLE'
  ).length;

  const occupied = resources.filter(
    (r) => r.status === 'OCCUPIED'
  ).length;

  const pending = bookings.filter(
    (b) => b.status === 'PENDING'
  ).length;

  const stats = [
    {
      title: 'AVAILABLE',
      value: available,
      icon: <Building2 />,
      color: '#22D3EE'
    },
    {
      title: 'PENDING',
      value: pending,
      icon: <Clock />,
      color: '#F59E0B'
    },
    {
      title: 'OCCUPIED',
      value: occupied,
      icon: <Users />,
      color: '#EC4899'
    },
    {
      title: 'UPCOMING',
      value: bookings.length,
      icon: <CalendarDays />,
      color: '#A855F7'
    }
  ];

  return (
    <div className="main-content">
      <h1>
        Good Morning, {user.name} 👋
      </h1>

      <p
        style={{
          color: '#94A3B8',
          marginTop: '8px',
          marginBottom: '35px'
        }}
      >
        Here is what's happening across your campus today.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(210px,1fr))',
          gap: '20px'
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: '25px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p style={{ color: '#94A3B8' }}>
                {stat.title}
              </p>

              <h2
                style={{
                  fontSize: '40px',
                  color: stat.color
                }}
              >
                {stat.value}
              </h2>
            </div>

            <div style={{ color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '45px' }}>
        Quick Actions
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}
      >
        <button
          className="btn-gradient"
          onClick={() => onNavigate('finder')}
        >
          <Search size={18} />
          Find Resource
        </button>

        <button
          className="btn-secondary"
          onClick={() => onNavigate('status')}
        >
          <Activity size={18} />
          Live Campus Status
        </button>
      </div>

      <h2 style={{ marginTop: '45px' }}>
        My Recent Bookings
      </h2>

      <div
        style={{
          display: 'grid',
          gap: '15px',
          marginTop: '20px'
        }}
      >
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '15px'
            }}
          >
            <div>
              <h3>{booking.resourceName}</h3>

              <p style={{ color: '#94A3B8' }}>
                {booking.date} | {booking.startTime} -
                {booking.endTime}
              </p>
            </div>

            <strong
              style={{
                color:
                  booking.status === 'APPROVED'
                    ? '#22C55E'
                    : '#F59E0B'
              }}
            >
              {booking.status}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}