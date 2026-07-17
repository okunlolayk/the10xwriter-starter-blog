type Props = {
  id: string
  title: string
}

// Use inside any .mdx blog post: <YouTubeEmbed id="VIDEO_ID" title="Video title" />
export default function YouTubeEmbed({ id, title }: Props) {
  return (
    <div className="not-prose my-8">
      <div className="aspect-video overflow-hidden rounded-sm border border-black/15">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-ink-soft mt-2 font-mono text-[12px]">{title}</p>
    </div>
  )
}
