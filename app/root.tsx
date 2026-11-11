import './app.css'

import { useEffect } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import type { Route } from './+types/root'
import { cacheHeaders, cachePolicies } from './utils/cache'
import { reloadOnce } from './utils/reload-once'
import { generatePersonStructuredData, generateWebSiteStructuredData } from './utils/structuredData'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  {
    rel: 'preconnect',
    href: 'https://static.cloudflareinsights.com',
  },
  {
    rel: 'dns-prefetch',
    href: 'https://static.cloudflareinsights.com',
  },
]

export function headers() {
  return {
    Link: '<https://static.cloudflareinsights.com>; rel=preconnect',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    ...cacheHeaders(cachePolicies.page),
  }
}

const fontPreloadLinks: Array<React.ComponentProps<'link'>> = [
  {
    rel: 'preload',
    href: '/fonts/InstrumentSans-Variable.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
    fetchPriority: 'high',
  },
  {
    // Used by the header wordmark on every page; otherwise only discovered after the CSS loads.
    rel: 'preload',
    href: '/fonts/JetBrainsMono-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const websiteStructuredData = generateWebSiteStructuredData()
  const personStructuredData = generatePersonStructuredData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Matt Burnett" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#111a22" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for initial render */
              *, ::before, ::after { box-sizing: border-box; }
              html { -webkit-text-size-adjust: 100%; line-height: 1.5; color-scheme: dark; background: #111a22; }
              body { margin: 0; background: #111a22; color: #e8f2f6; font-family: 'Instrument Sans', 'Instrument Sans Fallback', system-ui, -apple-system, sans-serif; }
            `,
          }}
        />
        {fontPreloadLinks.map(link => (
          <link key={link.href} {...link} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
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
  const isRouteError = isRouteErrorResponse(error)

  // Unexpected errors are usually a stale page/data/chunk from another deploy: reload once to heal.
  useEffect(() => {
    if (isRouteError) return
    if (reloadOnce(window.location.pathname + window.location.search)) window.location.reload()
  }, [isRouteError])

  if (isRouteError) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto max-w-[880px] p-6">
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
