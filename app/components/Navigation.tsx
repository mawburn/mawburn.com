import { Link, NavLink } from 'react-router'

export const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Résumé' },
  { to: '/contact', label: 'Contact' },
] as const

const linkBase = 'rounded px-3 py-1.5 text-sm transition-colors'

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-forest-bg/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[880px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-6 py-2">
        <Link to="/" className="group flex items-baseline gap-2.5">
          <span className="text-lg font-bold text-text-primary transition-colors group-hover:text-mist-light">
            mawburn
          </span>
          <span className="font-mono text-xs text-text-muted">/ Matt Burnett</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-0.5">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={'end' in item ? item.end : false}
                  prefetch="intent"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? 'border border-moss-accent/40 bg-surface-dark font-semibold text-moss-bright'
                        : 'border border-transparent text-text-muted hover:text-text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
