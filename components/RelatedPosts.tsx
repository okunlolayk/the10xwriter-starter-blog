'use client'

import { useRef, useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  posts: CoreContent<Blog>[]
}

function RelatedCard({ post }: { post: CoreContent<Blog> }) {
  const cover = post.images?.[0]
  const primaryTag = post.tags?.[0]

  return (
    <Link
      href={`/${post.path}`}
      className="group w-[240px] flex-shrink-0 snap-start sm:w-[260px]"
    >
      <div className="relative aspect-video overflow-hidden rounded-sm border border-black/10 bg-linear-to-br from-[#20242C] to-[#3C4453]">
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            sizes="260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute bottom-3 left-3 h-6 w-6 rounded-full border border-signal/40 bg-signal/15">
            <span className="absolute inset-[7px] rounded-full bg-signal" />
          </span>
        )}
      </div>
      <div className="pt-3">
        <div className="flex items-center gap-3">
          {primaryTag && (
            <span className="wiki-tag text-pen font-mono text-[10.5px] uppercase">
              {primaryTag}
            </span>
          )}
          <span className="text-ink-soft font-mono text-[10.5px]">
            {formatDate(post.date, siteMetadata.locale)}
          </span>
        </div>
        <h4 className="mt-1.5 font-serif text-[15.5px] leading-snug font-semibold text-ink group-hover:text-pen">
          {post.title}
        </h4>
      </div>
    </Link>
  )
}

export default function RelatedPosts({ posts }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)

  if (!posts.length) return null

  const go = (dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const next = Math.min(Math.max(index + dir, 0), posts.length - 1)
    setIndex(next)
    const child = track.children[next] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  return (
    <div className="mt-14 border-t border-black/10 pt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <span className="wiki-tag text-pen mb-2 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
            Keep reading
          </span>
          <h3 className="font-serif text-[22px] leading-tight font-semibold text-ink">
            More on the same pillars
          </h3>
        </div>
        {posts.length > 2 && (
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous related post"
              disabled={index === 0}
              className="border-ink/20 text-ink-soft hover:border-pen hover:text-pen flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next related post"
              disabled={index === posts.length - 1}
              className="border-ink/20 text-ink-soft hover:border-pen hover:text-pen flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {posts.map((post) => (
          <RelatedCard key={post.path} post={post} />
        ))}
      </div>
    </div>
  )
}
