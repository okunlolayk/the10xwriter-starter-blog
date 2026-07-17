'use client'

interface Props {
  size: number
  rippleKey: number
}

const RAY_ANGLES = [12, 55, 98, 141, 184, 227, 270, 313]

export default function YouCore({ size, rippleKey }: Props) {
  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 flex items-center justify-center"
      style={{ width: size * 2.6, height: size * 2.6, transform: 'translate(-50%, -50%)' }}
    >
      {/* light rays — slow independent rotation, lens-flare feel */}
      <div className="you-rays absolute inset-0">
        {RAY_ANGLES.map((deg, i) => (
          <span
            key={deg}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: size * (i % 2 === 0 ? 1.3 : 0.85),
              height: 1,
              transform: `rotate(${deg}deg)`,
              background:
                'linear-gradient(90deg, rgba(255,168,80,0.55), rgba(255,122,0,0) 85%)',
            }}
          />
        ))}
      </div>

      {/* ripple, retriggered by key change */}
      <span key={rippleKey} className="you-ripple absolute rounded-full" />

      {/* rotating rings */}
      <span
        className="absolute rounded-full border border-[#FF7A00]/30"
        style={{
          width: size * 1.55,
          height: size * 1.55,
          borderStyle: 'dashed',
          animation: 'spin-slow 22s linear infinite',
        }}
      />
      <span
        className="absolute rounded-full border border-[#FF7A00]/16"
        style={{ width: size * 1.9, height: size * 1.9, animation: 'spin-slow-rev 32s linear infinite' }}
      />

      {/* outer soft bloom */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 2.1,
          height: size * 2.1,
          background: 'radial-gradient(circle, rgba(255,122,0,0.18), transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* glowing sphere */}
      <div
        className="you-core-pulse relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(circle at 35% 30%, #FFE3C2 0%, #FFB067 28%, #FF8A28 55%, #FF6A00 78%, #C24A00 100%)',
          boxShadow:
            '0 0 50px 10px rgba(255,122,0,0.35), 0 0 110px 30px rgba(255,122,0,0.16), inset 0 -8px 20px rgba(150,50,0,0.35)',
        }}
      >
        <span className="font-mono text-[13px] font-bold tracking-[0.14em] text-[#1a0e00] uppercase">
          You
        </span>
      </div>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-slow-rev { to { transform: rotate(-360deg); } }
        @keyframes rays-rotate { to { transform: rotate(360deg); } }
        .you-rays { animation: rays-rotate 60s linear infinite; }
        @keyframes core-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .you-core-pulse { animation: core-breathe 4.2s ease-in-out infinite; }
        @keyframes ripple-out {
          0% { width: 20%; height: 20%; opacity: .4; border-width: 1.5px; }
          100% { width: 260%; height: 260%; opacity: 0; border-width: .5px; }
        }
        .you-ripple {
          border: 1px solid rgba(255,142,50,0.55);
          animation: ripple-out 2.8s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .you-core-pulse, .you-ripple, .you-rays { animation: none; }
        }
      `}</style>
    </div>
  )
}
