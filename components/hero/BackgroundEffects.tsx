const DRIFT_PARTICLES = [
  { left: '12%', top: '18%', delay: '0s', dur: '14s', size: 3 },
  { left: '78%', top: '12%', delay: '2.2s', dur: '17s', size: 2 },
  { left: '85%', top: '62%', delay: '1.1s', dur: '15s', size: 4 },
  { left: '22%', top: '72%', delay: '3.4s', dur: '19s', size: 2 },
  { left: '55%', top: '85%', delay: '0.6s', dur: '16s', size: 3 },
  { left: '40%', top: '10%', delay: '4.1s', dur: '18s', size: 2 },
  { left: '65%', top: '40%', delay: '2.8s', dur: '13s', size: 3 },
  { left: '30%', top: '45%', delay: '1.6s', dur: '20s', size: 2 },
  { left: '90%', top: '30%', delay: '3.9s', dur: '15s', size: 3 },
  { left: '8%', top: '55%', delay: '0.9s', dur: '17s', size: 2 },
  { left: '48%', top: '68%', delay: '2.4s', dur: '14s', size: 4 },
  { left: '70%', top: '78%', delay: '3.1s', dur: '18s', size: 2 },
]

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 62% 48%, rgba(255,122,0,0.16), transparent 58%)',
        }}
      />
      {/* vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,241,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,236,0.5) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      {/* soft noise */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* drifting bokeh particles */}
      {DRIFT_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="drift-particle absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: '#FF9E4E',
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(255,122,0,0.35)`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      <style>{`
        @keyframes drift {
          0%   { transform: translate(0,0); opacity: 0; }
          10%  { opacity: .9; }
          50%  { transform: translate(16px,-26px); }
          90%  { opacity: .5; }
          100% { transform: translate(-10px,-46px); opacity: 0; }
        }
        .drift-particle { animation: drift linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift-particle { animation: none; opacity: .3; }
        }
      `}</style>
    </div>
  )
}
