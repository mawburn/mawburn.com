import { lazy, startTransition, Suspense } from 'react'

import { Footer } from '~/components/Footer'
import { Welcome } from '~/welcome/welcome'

import type { Route } from './+types/home'

export const links: Route.LinksFunction = () => [
  {
    rel: 'canonical',
    href: 'https://mawburn.com',
  },
]

const SynthwaveBackground = lazy(() =>
  import('~/components/SynthwaveBackground').then(module => {
    // Preload in a lower priority after initial render
    startTransition(() => {})
    return module
  })
)

export function meta() {
  return [
    { title: 'Matt Burnett | Software Engineer' },
    {
      name: 'description',
      content:
        'Matt Burnett - Software Engineer - Building high-performance web applications with modern tech.',
    },
    {
      name: 'keywords',
      content:
        'Software Engineer, Frontend Developer, React Developer, Full Stack Developer, TypeScript, JavaScript, Web Development, React.js, Node.js, TailwindCSS, Web Applications, UI/UX, SPA, Progressive Web Apps, Modern Web Development, API Integration, Responsive Design',
    },
  ]
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Welcome />
      <Footer />
      <Suspense fallback={<div className="fixed inset-0 -z-50 bg-black" />}>
        <SynthwaveBackground />
      </Suspense>
    </div>
  )
}
