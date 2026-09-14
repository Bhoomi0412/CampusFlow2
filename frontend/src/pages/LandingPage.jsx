import {
  Sparkles,
  Search,
  ShieldAlert,
  CheckCircle,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

export default function LandingPage({ onLogin }) {
  const features = [
    {
      icon: <Search size={25} />,
      title: 'Smart Venue Finder',
      text: 'Find the perfect campus resource instantly.'
    },
    {
      icon: <BrainCircuit size={25} />,
      title: 'Smart Match Score',
      text: 'Get intelligent recommendations.'
    },
    {
      icon: <ShieldAlert size={25} />,
      title: 'Conflict Detection',
      text: 'Automatically prevent booking clashes.'
    },
    {
      icon: <CheckCircle size={25} />,
      title: 'Easy Booking',
      text: 'Book resources with a simple workflow.'
    }
  ];

  return (
    <div>
      <section
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 20px'
        }}
      >
        <div style={{ maxWidth: '950px' }}>
          <div
            style={{
              display: 'inline-flex',
              gap: '8px',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '30px',
              background: 'rgba(124,58,237,0.15)',
              color: '#A855F7'
            }}
          >
            <Sparkles size={16} />
            NEXT-GEN CAMPUS MANAGEMENT
          </div>

          <h1
            style={{
              fontSize: 'clamp(45px,7vw,85px)',
              marginTop: '25px',
              lineHeight: 1.05
            }}
          >
            Smart Campus.
            <br />

            <span className="gradient-text-purple-cyan">
              Smarter Resource Management.
            </span>
          </h1>

          <p
            style={{
              color: '#94A3B8',
              fontSize: '18px',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '25px auto'
            }}
          >
            Book smarter, avoid scheduling conflicts and optimize your
            campus resources with intelligent recommendations.
          </p>

          <button
            onClick={onLogin}
            className="btn-gradient"
            style={{
              fontSize: '17px',
              padding: '16px 30px'
            }}
          >
            Get Started
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="main-content">
        <h2
          style={{
            textAlign: 'center',
            fontSize: '32px',
            marginBottom: '35px'
          }}
        >
          Everything Your Campus Needs
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(220px,1fr))',
            gap: '20px'
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card"
              style={{ padding: '28px' }}
            >
              <div style={{ color: '#22D3EE' }}>
                {feature.icon}
              </div>

              <h3 style={{ margin: '18px 0 10px' }}>
                {feature.title}
              </h3>

              <p
                style={{
                  color: '#94A3B8',
                  lineHeight: 1.5
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}