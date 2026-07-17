'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostCoverCard from '@/components/PostCoverCard'
import tagData from 'app/tag-data.json'

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

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

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
          <p className="text-paper-alt/65 mt-4 max-w-lg text-[15.5px]">
            Every article maps back to one link in the research-to-draft pipeline. Filter by pillar,
            or scroll the full stack.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 py-12 sm:flex-row sm:gap-12">
        <aside className="bg-paper-alt h-fit shrink-0 border border-black/15 sm:w-56">
          <div className="px-5 py-5">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-pen font-mono text-xs font-semibold tracking-wide uppercase">
                All Posts
              </h3>
            ) : (
              <Link
                href="/blog"
                className="text-ink hover:text-pen font-mono text-xs font-semibold tracking-wide uppercase"
              >
                All Posts
              </Link>
            )}
            <ul className="mt-3 space-y-1">
              {sortedTags.map((t) => (
                <li key={t}>
                  {decodeURI(pathname.split('/tags/')[1] || '') === slug(t) ? (
                    <span className="text-pen block px-1 py-1.5 font-mono text-[13px] font-semibold">
                      {t} ({tagCounts[t]})
                    </span>
                  ) : (
                    <Link
                      href={`/tags/${slug(t)}`}
                      className="text-ink-soft hover:text-pen block px-1 py-1.5 font-mono text-[13px]"
                      aria-label={`View posts tagged ${t}`}
                    >
                      {t} ({tagCounts[t]})
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col divide-y divide-black/10 border border-black/20">
            {!displayPosts.length && <p className="text-ink-soft p-6">No posts found.</p>}
            {displayPosts.map((post) => (
              <PostCoverCard key={post.path} {...post} />
            ))}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}
