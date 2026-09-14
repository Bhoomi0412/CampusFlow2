import {
  Presentation,
  Mic,
  Wifi,
  Wind,
  MonitorSmartphone,
  BrainCircuit
} from 'lucide-react';

export default function VenueFinder({
  searchParams,
  setSearchParams,
  onSearch,
  isSearching
}) {
  const facilities = [
    { name: 'Projector', icon: <Presentation size={18} /> },
    { name: 'Microphone', icon: <Mic size={18} /> },
    { name: 'WiFi', icon: <Wifi size={18} /> },
    { name: 'Air Conditioning', icon: <Wind size={18} /> },
    { name: 'Smart Board', icon: <MonitorSmartphone size={18} /> }
  ];

  const toggleFacility = (name) => {
    const current = [...searchParams.facilities];

    if (current.includes(name)) {
      setSearchParams({
        ...searchParams,
        facilities: current.filter((item) => item !== name)
      });
    } else {
      setSearchParams({
        ...searchParams,
        facilities: [...current, name]
      });
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1>Find Your Perfect Resource</h1>

        <p style={{ color: '#94A3B8', marginTop: '10px' }}>
          Tell us what you need and CampusFlow will find the
          best match.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '35px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(190px,1fr))',
            gap: '18px'
          }}
        >
          <Input
            label="Number of People"
            type="number"
            value={searchParams.people}
            onChange={(value) =>
              setSearchParams({
                ...searchParams,
                people: value
              })
            }
          />

          <Input
            label="Date"
            type="date"
            value={searchParams.date}
            onChange={(value) =>
              setSearchParams({
                ...searchParams,
                date: value
              })
            }
          />

          <Input
            label="Start Time"
            type="time"
            value={searchParams.startTime}
            onChange={(value) =>
              setSearchParams({
                ...searchParams,
                startTime: value
              })
            }
          />

          <Input
            label="End Time"
            type="time"
            value={searchParams.endTime}
            onChange={(value) =>
              setSearchParams({
                ...searchParams,
                endTime: value
              })
            }
          />
        </div>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>
          Required Facilities
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {facilities.map((facility) => {
            const active =
              searchParams.facilities.includes(facility.name);

            return (
              <button
                key={facility.name}
                onClick={() => toggleFacility(facility.name)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: active
                    ? 'rgba(34,211,238,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: active
                    ? '1px solid #22D3EE'
                    : '1px solid rgba(255,255,255,0.1)',
                  color: active ? '#22D3EE' : 'white'
                }}
              >
                {facility.icon}
                {facility.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={onSearch}
          disabled={isSearching}
          className="btn-gradient"
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: '35px',
            padding: '16px'
          }}
        >
          {isSearching ? (
            <>
              <BrainCircuit className="rotating-icon" />
              Analyzing Campus Resources...
            </>
          ) : (
            '✨ FIND BEST MATCH'
          )}
        </button>
      </div>
    </div>
  );
}

function Input({ label, type, value, onChange }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          color: '#94A3B8'
        }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '13px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.04)',
          color: 'white'
        }}
      />
    </div>
  );
}