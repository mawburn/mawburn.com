import { Link, useLocation } from 'react-router'
import { HouseIcon } from './HouseIcon'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-white hover:text-cyan-300 transition-colors p-1"
            aria-label="Home"
          >
            <HouseIcon className="w-8 h-8" />
          </Link>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/blog"
                className="text-white hover:text-cyan-300 transition-colors text-lg font-bold tracking-wider"
              >
                Blog
              </Link>
            </li>
            {!isHomePage && (
              <li>
                <ThemeToggle />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
