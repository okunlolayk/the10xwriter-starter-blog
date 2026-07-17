import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

interface PostCoverCardProps {
  path: string
  title: string
  summary?: string
  date: string
  tags?: string[]
  images?: string[]
  readingTime?: { text: string }
}

const PostCoverCard = ({
  path,
  title,
  summary,
  date,
  tags,
  images,
  readingTime,
}: PostCoverCardProps) => {
  const primaryTag = tags?.[0]
  const cover = images?.[0]

  return (
    <Link
      href={`/${path}`}
      className="group bg-paper-alt grid grid-cols-1 border-b border-black/10 transition-colors last:border-b-0 hover:bg-white sm:grid-cols-[220px_1fr]"
    >
      {/* cover — left side, per brand spec */}
      <div className="relative min-h-[160px] overflow-hidden bg-linear-to-br bg-[image:linear-gradient(rgba(246,244,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(246,244,238,0.06)_1px,transparent_1px)] from-[#20242C] to-[#3C4453] bg-[length:26px_26px]">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="220px"
            className="!h-full !w-full object-cover"
          />
        ) : (
          <span className="border-signal/40 bg-signal/15 group-hover:bg-signal/30 absolute bottom-3.5 left-3.5 h-8 w-8 rounded-full border transition-colors">
            <span className="bg-signal absolute inset-[9px] rounded-full" />
          </span>
        )}
      </div>

      {/* body — right side */}
      <div className="flex flex-col justify-center gap-2.5 px-6 py-6 sm:px-7">
        <div className="flex flex-wrap items-center gap-4">
          {primaryTag && (
            <span className="wiki-tag text-pen font-mono text-[11.5px] uppercase">
              {primaryTag}
            </span>
          )}
          <span className="text-ink-soft font-mono text-[11.5px]">
            {formatDate(date, siteMetadata.locale)}
            {readingTime ? ` · ${readingTime.text}` : ''}
          </span>
        </div>
        <h3 className="text-ink font-serif text-[21px] leading-[1.28] font-semibold">{title}</h3>
        {summary && (
          <p className="text-ink-soft max-w-xl text-[14.5px] leading-relaxed">{summary}</p>
        )}
        <span className="text-ink group-hover:border-pen group-hover:text-pen mt-1 inline-flex w-fit border-b border-black/20 font-mono text-[12.5px] transition-colors">
          Read the note →
        </span>
      </div>
    </Link>
  )
}

export default PostCoverCard
