import { Link } from 'react-router'

import { Bluesky, GitHubIcon, InstagramIcon, LinkedIn, RedditIcon } from '~/components/icons'

const socialLinks = [
  { href: 'https://github.com/mawburn', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.linkedin.com/in/burnettmatt/', label: 'LinkedIn', Icon: LinkedIn },
  { href: 'https://www.instagram.com/_mawburn', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.reddit.com/user/_mawburn', label: 'Reddit', Icon: RedditIcon },
  { href: 'https://bsky.app/profile/mawburn.com', label: 'Bluesky', Icon: Bluesky },
] as const

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-forest-bg py-8">
      <div className="mx-auto flex max-w-[880px] flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-text-muted sm:flex-row">
        <span>Matt Burnett &copy; {new Date().getFullYear()} &middot; mawburn.com</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {socialLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-moss-bright"
              >
                <link.Icon size={16} />
                <span aria-hidden="true">{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="/rss.xml" className="transition-colors hover:text-moss-bright">
              RSS
            </a>
          </li>
          <li>
            <Link to="/resume" className="transition-colors hover:text-moss-bright">
              Résumé
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
