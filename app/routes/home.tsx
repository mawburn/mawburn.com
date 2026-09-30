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
    { title: 'Matt Burnett | Senior / Staff Software Engineer' },
    {
      name: 'description',
      content:
        'Senior/Staff-level software engineer with nearly 15 years building full-stack products and high-scale systems with TypeScript, React, Node.js, Go, SQL, and cloud infrastructure.',
    },
    {
      name: 'keywords',
      content:
        'Senior Software Engineer, Staff Software Engineer, Full Stack Engineer, TypeScript, React, Node.js, Go, Java, SQL, Cloud Infrastructure, Software Architecture, Technical Leadership, Shopify',
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
