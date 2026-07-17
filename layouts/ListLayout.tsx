'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostCoverCard from '@/components/PostCoverCard'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 font-mono text-[13px]">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="text-pen"
        >
          ← Previous
        </Link>
      ) : (
        <span className="text-ink-soft/40">← Previous</span>
      )}
      <span className="text-ink-soft">
        {currentPage} of {totalPages}
      </span>
      {nextPage ? (
        <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className="text-pen">
          Next →
        </Link>
      ) : (
        <span className="text-ink-soft/40">Next →</span>
      )}
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="full-bleed bg-ink border-b border-black/10 pt-2 pb-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <span className="wiki-tag text-signal mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
            Journal
          </span>
          <h1 className="text-paper-alt font-serif text-[34px] leading-[1.1] font-semibold sm:text-[48px]">
            {title}
          </h1>
          <div className="relative mt-6 max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search the journal"
                className="border-paper-alt/25 text-paper-alt placeholder:text-paper-alt/40 focus:border-signal block w-full rounded-sm border bg-transparent px-4 py-2.5 font-mono text-sm focus:ring-0 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="flex flex-col divide-y divide-black/10 border border-black/20">
          {!filteredBlogPosts.length && <p className="text-ink-soft p-6">No posts found.</p>}
          {displayPosts.map((post) => (
            <PostCoverCard key={post.path} {...post} />
          ))}
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </>
  )
}
