'use client'

import dynamic from 'next/dynamic'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'

// Client-only — the ecosystem uses rAF, Canvas, and window, none of which
// should run on the server.
const HeroEcosystem = dynamic(() => import('./HeroEcosystem'), {
  ssr: false,
  loading: () => <div className="bg-ink h-full w-full" />,
})

export default function Hero() {
  return (
    <section className="full-bleed relative bg-ink pt-6 pb-16 sm:pb-[90px]">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="wiki-tag text-pen mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
            AI-augmented research &amp; writing
          </span>
          <h1 className="text-paper-alt font-serif text-[38px] leading-[1.05] font-semibold sm:text-5xl md:text-[64px]">
            Research like a team.
            <br />
            Write like <em className="text-signal italic not-italic">one</em> person.
          </h1>
          <p className="text-paper-alt/70 mt-6 max-w-md text-lg leading-relaxed">
            {siteMetadata.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href="#newsletter"
              className="text-paper-alt inline-flex items-center gap-2 rounded-sm px-5 py-3.5 font-mono text-sm backdrop-blur-md transition-all hover:-translate-y-px"
              style={{
                background:
                  'linear-gradient(160deg, rgba(245,241,236,0.14), rgba(245,241,236,0.04))',
                border: '1px solid rgba(245,241,236,0.22)',
                boxShadow:
                  '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 8px rgba(0,0,0,0.25)',
              }}
            >
              Get the research stack cheat sheet
            </Link>
          </div>
        </div>

        <div className="h-[272px] sm:h-[336px]">
          <HeroEcosystem />
        </div>
      </div>

      {/* scroll cue — centered, chevron pointing down */}
      <div className="absolute right-0 bottom-5 left-0 flex flex-col items-center gap-2">
        <span className="text-paper-alt/45 font-mono text-[11px] tracking-wide">
          scroll — see the stack
        </span>
        <svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          className="scroll-chevron"
          aria-hidden="true"
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="rgba(245,241,236,0.45)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes chevron-bounce {
          0%, 100% { transform: translateY(0); opacity: .6; }
          50% { transform: translateY(4px); opacity: 1; }
        }
        .scroll-chevron { animation: chevron-bounce 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .scroll-chevron { animation: none; }
        }
      `}</style>
    </section>
  )
}
