import { Link } from 'react-router'
import { HouseIcon } from './HouseIcon'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white hover:text-cyan-300 transition-colors p-1">
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
          </ul>
        </div>
      </div>
    </nav>
  )
}
