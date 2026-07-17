import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import RelatedPosts from '@/components/RelatedPosts'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  relatedPosts?: CoreContent<Blog>[]
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  relatedPosts = [],
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, readingTime, images } = content
  const basePath = path.split('/')[0]
  const cover = images?.[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="full-bleed bg-ink border-b border-black/10 pt-4 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link
              href={`/${basePath}`}
              className="text-paper-alt/50 hover:text-signal font-mono text-[12.5px] transition-colors"
            >
              ← Back to the Journal
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {tags?.[0] && (
                <span className="wiki-tag text-signal font-mono text-xs uppercase">{tags[0]}</span>
              )}
              <span className="text-paper-alt/45 font-mono text-[12px]">
                {formatDate(date, siteMetadata.locale)}
                {readingTime ? ` · ${readingTime.text}` : ''}
              </span>
            </div>
            <h1 className="text-paper-alt mt-4 font-serif text-[32px] leading-[1.12] font-semibold sm:text-[42px]">
              {title}
            </h1>
            {authorDetails?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {authorDetails.map((author) => (
                  <div className="flex items-center gap-2.5" key={author.name}>
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <span className="text-paper-alt/70 font-mono text-[12.5px]">{author.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {cover && (
          <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
            <div className="relative aspect-video overflow-hidden rounded-sm border border-black/10">
              <Image src={cover} alt={title} fill sizes="768px" className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 pt-10 pb-8 sm:px-6">
          <div className="prose max-w-none">{children}</div>

          <div className="text-ink-soft mt-8 flex flex-wrap items-center gap-4 border-t border-black/10 pt-6 font-mono text-[12.5px]">
            <Link href={discussUrl(path)} rel="nofollow" className="hover:text-pen">
              Discuss on X
            </Link>
            <span className="opacity-40">·</span>
            <Link href={editUrl(filePath)} className="hover:text-pen">
              View on GitHub
            </Link>
          </div>

          {tags && tags.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-1 border-t border-black/10 pt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="wiki-tag text-pen mr-3 font-mono text-[11.5px] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {siteMetadata.comments && (
            <div className="pt-10 pb-6 text-center" id="comment">
              <Comments slug={slug} />
            </div>
          )}

          <footer className="mt-10 border-t border-black/10 pt-6">
            <div className="flex flex-col gap-3 font-mono text-[13px] sm:flex-row sm:justify-between">
              {prev && prev.path && (
                <Link href={`/${prev.path}`} className="text-pen hover:text-signal">
                  ← {prev.title}
                </Link>
              )}
              {next && next.path && (
                <Link href={`/${next.path}`} className="text-pen hover:text-signal sm:ml-auto">
                  {next.title} →
                </Link>
              )}
            </div>
          </footer>

          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>
    </SectionContainer>
  )
}
