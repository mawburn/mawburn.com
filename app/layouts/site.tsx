import { Outlet } from 'react-router'

import { Footer } from '~/components/Footer'
import { Navigation } from '~/components/Navigation'

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
