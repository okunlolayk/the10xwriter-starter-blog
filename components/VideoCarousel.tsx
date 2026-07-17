'use client'

import { useRef, useState } from 'react'

// Swap the id/title/tag on each slide as real uploads go live.
// All five currently point at the same placeholder video.
const videos = [
  { id: '28TGfTZweqw', tag: 'Intro', title: 'Welcome to the10XWriter: The System, Explained' },
  { id: '28TGfTZweqw', tag: 'Research', title: 'NotebookLM as Your Research Hub: Full Workflow' },
  {
    id: '28TGfTZweqw',
    tag: 'Prompting',
    title: 'Why Your Prompts Work in Claude but Fail in Gemini',
  },
  {
    id: '28TGfTZweqw',
    tag: 'Second Brain',
    title: 'The Obsidian Vault Behind Every Article I Ship',
  },
  {
    id: '28TGfTZweqw',
    tag: 'Freelancing',
    title: 'How I Price Freelance Writing Now That I Use AI',
  },
]

function Slide({ id, tag, title }: (typeof videos)[number]) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="w-[85%] flex-shrink-0 snap-center sm:w-[420px]">
      <div className="border-paper-alt/12 aspect-video overflow-hidden rounded-sm border bg-black">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${title}`}
            className="group relative h-full w-full"
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-signal flex h-14 w-14 items-center justify-center rounded-full shadow-[0_0_0_14px_rgba(255,107,0,0.12)]">
                <svg width="18" height="18" viewBox="0 0 20 20">
                  <polygon points="5,3 17,10 5,17" fill="var(--color-ink)" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="pt-4">
        <span className="wiki-tag text-signal font-mono text-xs uppercase">{tag}</span>
        <h4 className="text-paper-alt mt-2 font-serif text-[17px] leading-snug font-semibold">
          {title}
        </h4>
      </div>
    </div>
  )
}

export default function VideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const go = (dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const next = Math.min(Math.max(index + dir, 0), videos.length - 1)
    setIndex(next)
    const child = track.children[next] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {videos.map((v, i) => (
          <Slide key={`${v.id}-${i}`} {...v} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          {videos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? 'bg-signal' : 'bg-paper-alt/25'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous video"
            disabled={index === 0}
            className="border-paper-alt/25 text-paper-alt/70 hover:border-signal hover:text-signal flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next video"
            disabled={index === videos.length - 1}
            className="border-paper-alt/25 text-paper-alt/70 hover:border-signal hover:text-signal flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
