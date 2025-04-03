import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { lazy, Suspense } from 'react'

import type { Route } from './+types/root'
import './app.css'

const SynthwaveBackground = lazy(() => import('./components/SynthwaveBackground'))

export const links: Route.LinksFunction = () => []

const fontPreloadLinks: Array<React.ComponentProps<'link'>> = [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
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
          @font-face {
            font-family: 'Lexend';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Lexend Regular'), local('Lexend-Regular'), url(https://fonts.gstatic.com/s/lexend/v7/wlpwgwvFAVdoq2_v-6QU.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Lexend';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Lexend Bold'), local('Lexend-Bold'), url(https://fonts.gstatic.com/s/lexend/v7/wlpzgwvFAVdoq2_v9KQU4Hn2.woff2) format('woff2');
          }
          @font-face {
            font-family: 'Sacramento';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Sacramento'), local('Sacramento-Regular'), url(https://fonts.gstatic.com/s/sacramento/v13/buEzpo6gcdjy0EiZMBUG4C0f_Q.woff2) format('woff2');
          }
          body {
            font-family: 'Lexend', ui-sans-serif, system-ui, -apple-system, sans-serif;
          }
        `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body style={{ backgroundColor: '#00001a' }}>
        <Suspense fallback={null}>
          <SynthwaveBackground />
        </Suspense>
        {children}
        <ScrollRestoration />
        <Scripts />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&family=Sacramento&display=swap"
          media="print"
          onLoad={e => {
            const target = e.currentTarget
            target.media = 'all'
          }}
        />
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
