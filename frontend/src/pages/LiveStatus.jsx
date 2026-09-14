export default function LiveStatus({ resources }) {
  return (
    <div className="main-content">
      <h1>Campus Live Status</h1>

      <p
        style={{
          color: '#94A3B8',
          marginTop: '8px',
          marginBottom: '30px'
        }}
      >
        Real-time status of campus facilities.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(260px,1fr))',
          gap: '20px'
        }}
      >
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="glass-card"
            style={{ padding: '25px' }}
          >
            <h3>{resource.name}</h3>

            <p
              style={{
                color: '#94A3B8',
                margin: '8px 0'
              }}
            >
              {resource.location}
            </p>

            <p>
              Capacity: {resource.capacity}
            </p>

            <h4
              style={{
                marginTop: '20px',
                color:
                  resource.status === 'AVAILABLE'
                    ? '#22C55E'
                    : resource.status === 'OCCUPIED'
                    ? '#EF4444'
                    : '#F59E0B'
              }}
            >
              ● {resource.status}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}