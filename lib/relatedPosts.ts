import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

/**
 * Ranks every other post by how many tags it shares with `current`,
 * highest overlap first. Ties break by most recent. Posts with zero
 * overlapping tags are excluded entirely.
 */
export function getRelatedPosts(
  current: CoreContent<Blog>,
  allPosts: CoreContent<Blog>[],
  limit = 8
): CoreContent<Blog>[] {
  const currentTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()))
  if (currentTags.size === 0) return []

  const scored = allPosts
    .filter((p) => p.path !== current.path)
    .map((p) => {
      const overlap = (p.tags ?? []).filter((t) => currentTags.has(t.toLowerCase())).length
      return { post: p, overlap }
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })

  return scored.slice(0, limit).map((s) => s.post)
}
