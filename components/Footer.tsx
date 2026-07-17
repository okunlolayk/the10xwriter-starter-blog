import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="full-bleed bg-ink mt-24 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/"
            className="text-paper-alt flex items-center gap-2.5 font-mono text-[15px] font-semibold"
          >
            <span className="bg-signal inline-block h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,107,0,0.18)]" />
            {siteMetadata.headerTitle}
          </Link>
          <div className="hover:[&_a]:border-signal [&_svg]:!fill-paper-alt/70 hover:[&_svg]:!fill-signal flex flex-wrap gap-3 [&_a]:flex [&_a]:h-10 [&_a]:w-10 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_a]:border-white/15 [&_a]:transition-colors [&_svg]:!h-4 [&_svg]:!w-4">
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
            <SocialIcon kind="x" href={siteMetadata.x} size={5} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size={5} />
            <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          </div>
        </div>

        <div className="text-paper-alt/40 mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-6 font-mono text-[11px]">
          <span>
            © {new Date().getFullYear()} {siteMetadata.author} — {siteMetadata.title}. Research like
            a team. Write like one person.
          </span>
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="text-paper-alt/40 hover:text-signal"
          >
            Built on the Tailwind Next.js starter
          </Link>
        </div>
      </div>
    </footer>
  )
}
