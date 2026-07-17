export default function StatusPill() {
  return (
    <div className="pointer-events-none absolute right-4 bottom-4 sm:right-5 sm:bottom-5">
      <div
        className="flex items-center gap-2.5 rounded-full border px-3.5 py-2 backdrop-blur-md"
        style={{
          borderColor: 'rgba(245,241,236,0.14)',
          background: 'rgba(10,10,10,0.55)',
        }}
      >
        <span className="flex items-end gap-[2px]" aria-hidden="true">
          {[5, 9, 4, 11, 6].map((h, i) => (
            <span
              key={i}
              className="pill-bar block w-[2px] rounded-full bg-[#FF7A00]"
              style={{ height: h, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </span>
        <span className="font-sans text-[11.5px] text-[rgba(245,241,236,0.72)]">
          AI tools. Real workflow. Better writing.
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
      </div>

      <style>{`
        @keyframes pill-bounce {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .pill-bar { animation: pill-bounce 1.1s ease-in-out infinite; transform-origin: bottom; }
        @media (prefers-reduced-motion: reduce) {
          .pill-bar { animation: none; }
        }
      `}</style>
    </div>
  )
}
