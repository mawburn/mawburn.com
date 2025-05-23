import type { Route } from './+types/home'
import { Welcome } from '~/welcome/welcome'
import { lazy, Suspense, startTransition } from 'react'

const SynthwaveBackground = lazy(() =>
  import('~/components/SynthwaveBackground').then(module => {
    // Preload in a lower priority after initial render
    startTransition(() => {})
    return module
  })
)

export function meta(_args: Route.MetaArgs) {
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
    <>
      <Welcome />
      <Suspense fallback={<div className="fixed inset-0 -z-50 bg-black" />}>
        <SynthwaveBackground />
      </Suspense>
    </>
  )
}
