export default function MatchResults({ results, onBook }) {
  const best = results[0];
  const alternatives = results.slice(1);

  return (
    <div className="main-content">
      <h1>Your Smart Recommendations</h1>

      {best && (
        <div
          className="glass-card"
          style={{
            padding: '35px',
            marginTop: '25px',
            border: '1px solid #A855F7'
          }}
        >
          <p style={{ color: '#F59E0B' }}>
            ⭐ BEST MATCH
          </p>

          <h2 style={{ fontSize: '32px', marginTop: '10px' }}>
            {best.name}
          </h2>

          <p style={{ color: '#94A3B8' }}>
            {best.location}
          </p>

          <h1
            className="gradient-text-purple-cyan"
            style={{ fontSize: '60px', margin: '20px 0' }}
          >
            {best.matchScore}%
          </h1>

          <p>Capacity: {best.capacity} People</p>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              margin: '20px 0'
            }}
          >
            {best.facilities.map((facility) => (
              <span
                key={facility}
                style={{
                  padding: '7px 12px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '8px'
                }}
              >
                ✓ {facility}
              </span>
            ))}
          </div>

          <button
            className="btn-gradient"
            onClick={() => onBook(best)}
          >
            Book This Resource
          </button>
        </div>
      )}

      <h2 style={{ marginTop: '40px' }}>
        Alternative Options
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(260px,1fr))',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        {alternatives.map((resource) => (
          <div
            key={resource.id}
            className="glass-card"
            style={{ padding: '25px' }}
          >
            <h3>{resource.name}</h3>

            <p
              style={{
                fontSize: '28px',
                color: '#22D3EE',
                margin: '15px 0'
              }}
            >
              {resource.matchScore}% Match
            </p>

            <p style={{ color: '#94A3B8' }}>
              Capacity: {resource.capacity}
            </p>

            <button
              className="btn-secondary"
              onClick={() => onBook(resource)}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              View & Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}