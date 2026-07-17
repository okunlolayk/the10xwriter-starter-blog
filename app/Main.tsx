import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import Hero from '@/components/hero/Hero'
import PostCoverCard from '@/components/PostCoverCard'
import BrandNewsletterForm from '@/components/BrandNewsletterForm'
import VideoCarousel from '@/components/VideoCarousel'

const MAX_DISPLAY = 4

const pillars = [
  {
    tag: 'Prompting',
    title: 'Cross-model fluency',
    body: 'Why the same prompt behaves differently in Claude, Gemini, and ChatGPT — and how to write for each.',
  },
  {
    tag: 'Searching',
    title: 'Beyond Google',
    body: 'Search engines and databases that surface what generic search buries.',
  },
  {
    tag: 'Second Brain',
    title: 'Thematic writing',
    body: 'Turning raw research notes into structured drafts, Obsidian-style.',
  },
  {
    tag: 'Research',
    title: 'The NotebookLM stack',
    body: 'NotebookLM, Zotero, Scispace, and Jenni — how they connect, not just what they do.',
  },
  {
    tag: 'Data Analysis',
    title: 'Find the pattern first',
    body: 'Reading your research for insight before you write a single sentence.',
  },
  {
    tag: 'Freelancing',
    title: 'The system, monetized',
    body: 'Pricing, proposals, and delivery speed once AI is genuinely part of your process.',
  },
]

export default function Home({ posts }) {
  return (
    <>
      {/* ============ HERO ============ */}
      <Hero />

      {/* ============ PROBLEM STRIP ============ */}
      <section className="full-bleed bg-ink border-t border-white/15 pb-24">
        <div className="mx-auto max-w-5xl px-4 pt-11 sm:px-6">
          <p className="text-paper-alt/90 max-w-3xl font-serif text-[22px] leading-[1.4] font-normal italic sm:text-[32px]">
            Most &quot;AI for writers&quot; content teaches tricks.{' '}
            <span className="text-signal not-italic">This teaches the system underneath them</span>{' '}
            — the exact stack, in the exact order, that turns research into a finished draft.
          </p>
          <Link
            href="/blog/the-system-underneath-the-tricks"
            className="border-signal/50 text-paper-alt/80 hover:border-signal hover:text-signal mt-6 inline-flex items-center gap-2 border-b pb-0.5 font-mono text-[13px] transition-colors"
          >
            Read the full breakdown →
          </Link>
        </div>
      </section>

      {/* ============ YOUTUBE ============ */}
      <section className="full-bleed bg-ink border-t border-white/15 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="wiki-tag text-signal mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
                Videos
              </span>
              <h2 className="text-paper-alt font-serif text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
                Watch the stack in action
              </h2>
            </div>
            <a
              href={siteMetadata.youtube || '#'}
              target="_blank"
              rel="noreferrer"
              className="border-signal/60 text-paper-alt/80 hover:border-signal hover:text-signal border-b pb-0.5 font-mono text-[13px] whitespace-nowrap transition-colors"
            >
              Subscribe on YouTube →
            </a>
          </div>
          <VideoCarousel />
        </div>
      </section>

      {/* ============ THE SYSTEM / PILLARS ============ */}
      <section className="py-20">
        <div className="mb-12 max-w-xl">
          <span className="wiki-tag text-pen mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
            The System
          </span>
          <h2 className="font-serif text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
            Seven pillars. One stack.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px border border-black/20 bg-black/20 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.tag}
              className="bg-paper-alt flex min-h-[180px] flex-col justify-between p-6"
            >
              <div>
                <span className="wiki-tag text-pen font-mono text-xs">{p.tag}</span>
                <h3 className="mt-3 font-serif text-[18px] leading-snug font-semibold">
                  {p.title}
                </h3>
                <p className="text-ink-soft mt-2.5 text-sm leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ JOURNAL PREVIEW ============ */}
      <section className="py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="wiki-tag text-pen mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
              Journal
            </span>
            <h2 className="font-serif text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
              Notes from the desk
            </h2>
          </div>
          <Link
            href="/blog"
            className="border-pen text-pen border-b pb-0.5 font-mono text-[13px] whitespace-nowrap"
          >
            View all notes →
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-black/10 border border-black/20">
          {!posts.length && <p className="text-ink-soft p-6">No posts found.</p>}
          {posts.slice(0, MAX_DISPLAY).map((post) => (
            <PostCoverCard key={post.path} {...post} />
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="full-bleed bg-ink py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <BrandNewsletterForm />
        </div>
      </section>
    </>
  )
}
