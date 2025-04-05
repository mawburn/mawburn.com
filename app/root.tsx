import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { lazy, Suspense } from 'react'

import type { Route } from './+types/root'
import './app.css'

// Preload the background component during idle time
if (import.meta.env.PROD && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    import('./components/SynthwaveBackground')
  })
}

const SynthwaveBackground = lazy(() =>
  import('./components/SynthwaveBackground').then(module => {
    return { default: module.default }
  })
)

export const links: Route.LinksFunction = () => []

const fontPreloadLinks: Array<React.ComponentProps<'link'>> = [
  {
    rel: 'preload',
    href: '/fonts/OutrunFuture.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    fetchPriority: 'high',
  },
  {
    rel: 'preload',
    href: '/fonts/Lexend-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    fetchPriority: 'high',
  },
  {
    rel: 'preload',
    href: '/fonts/Lexend-Bold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    fetchPriority: 'low',
  },
  {
    rel: 'preload',
    href: '/fonts/Sacramento-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    fetchPriority: 'high',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Matt Burnett" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Matt Burnett | Software Engineer" />
        <meta
          property="og:description"
          content="Software Engineer - Building high-performance web applications with modern tech."
        />
        <meta property="og:site_name" content="Matt Burnett" />
        {fontPreloadLinks.map(link => (
          <link key={link.href} {...link} />
        ))}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Base styles that ensure text is visible */
          body {
            opacity: 1;
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          /* Ensure main heading is always visible */
          .main-heading {
            display: block;
            min-height: 70px;
          }
        `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Suspense fallback={null}>
          <SynthwaveBackground />
        </Suspense>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
