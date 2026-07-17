import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="bg-ink/90 fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="text-paper-alt flex items-center gap-2.5 font-mono text-[15px] font-semibold tracking-tight">
            <span className="bg-signal inline-block h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,107,0,0.18)]" />
            {typeof siteMetadata.headerTitle === 'string'
              ? siteMetadata.headerTitle
              : siteMetadata.headerTitle}
          </div>
        </Link>

        <div className="flex items-center gap-4 leading-5 sm:gap-6">
          <div className="no-scrollbar hidden max-w-40 items-center gap-x-6 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-paper-alt/70 hover:text-signal m-1 font-mono text-sm transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              className="bg-signal text-ink shrink-0 rounded-sm px-4 py-2 font-mono text-[13px] font-semibold whitespace-nowrap transition-transform hover:-translate-y-px"
            >
              Join the list
            </Link>
          </div>
          <div className="[&_button]:text-paper-alt [&_button:hover]:text-signal [&_svg]:text-paper-alt [&_svg:hover]:text-signal flex items-center gap-4">
            <SearchButton />
            <ThemeSwitch />
          </div>
          <div className="[&_svg]:text-paper-alt [&_svg:hover]:text-signal">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
