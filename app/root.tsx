import './app.css'

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'

import type { Route } from './+types/root'
import { Navigation } from './components/Navigation'
import { generatePersonStructuredData, generateWebSiteStructuredData } from './utils/structuredData'

export const links: Route.LinksFunction = () => [
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
    Link: [
      '</fonts/Inter_18pt-Regular.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous',
      '</fonts/Inter_18pt-Bold.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous',
      '<https://static.cloudflareinsights.com>; rel=preconnect',
    ].join(', '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'public, max-age=3600',
  }
}

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
    href: '/fonts/Inter_18pt-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Inter_18pt-Italic.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Inter_18pt-Bold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Inter_18pt-BoldItalic.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Sacramento-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isBlogRoute = location.pathname.startsWith('/blog')

  const isHomeRoute = location.pathname === '/'

  const fontsToLoad = isBlogRoute
    ? fontPreloadLinks.filter(link => link.href?.includes('Inter'))
    : isHomeRoute
      ? fontPreloadLinks.filter(
          link => link.href?.includes('OutrunFuture') || link.href?.includes('Sacramento')
        )
      : fontPreloadLinks

  const websiteStructuredData = generateWebSiteStructuredData()
  const personStructuredData = generatePersonStructuredData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Matt Burnett" />
        <meta name="robots" content="index, follow" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                if (shouldUseDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for initial render */
              *, ::before, ::after { box-sizing: border-box; }
              html { -webkit-text-size-adjust: 100%; line-height: 1.5; }
              body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
              .dark { color-scheme: dark; }
              .pt-16 { padding-top: 4rem; }
              .flex { display: flex; }
              .flex-col { flex-direction: column; }
              .min-h-screen { min-height: 100vh; }
              .fixed { position: fixed; }
              .inset-0 { inset: 0; }
              .-z-50 { z-index: -50; }
              .bg-black { background-color: #000; }
              /* Navigation critical styles */
              nav { position: fixed; top: 0; width: 100%; z-index: 50; }
            `,
          }}
        />
        {fontsToLoad.map(link => (
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
        <Navigation />
        <div className="pt-16">{children}</div>
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
