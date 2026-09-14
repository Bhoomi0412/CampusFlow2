import { useState } from 'react';

export default function BookResource({
  resource,
  searchParams,
  onConfirm
}) {
  const [purpose, setPurpose] = useState('');

  return (
    <div className="main-content" style={{ maxWidth: '900px' }}>
      <h1>Confirm Your Booking</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(300px,1fr))',
          gap: '25px',
          marginTop: '25px'
        }}
      >
        <div className="glass-card" style={{ padding: '30px' }}>
          <h2>{resource.name}</h2>

          <p style={{ color: '#94A3B8', margin: '10px 0' }}>
            {resource.location}
          </p>

          <hr
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              margin: '20px 0'
            }}
          />

          <p>Date: <b>{searchParams.date}</b></p>
          <br />

          <p>
            Time:{' '}
            <b>
              {searchParams.startTime} - {searchParams.endTime}
            </b>
          </p>

          <br />

          <p>
            Attendees: <b>{searchParams.people}</b>
          </p>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <label style={{ color: '#94A3B8' }}>
            Event Purpose
          </label>

          <input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Example: Technical Workshop"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '10px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white'
            }}
          />

          <button
            className="btn-gradient"
            onClick={() => onConfirm(purpose)}
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '25px'
            }}
          >
            Confirm Booking Request
          </button>
        </div>
      </div>
    </div>
  );
}