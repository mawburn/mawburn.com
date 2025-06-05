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
import './app.css'

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
  },
  {
    rel: 'preload',
    href: '/fonts/Lexend-Bold.woff2',
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
    ? fontPreloadLinks.filter(link => link.href?.includes('Lexend'))
    : isHomeRoute
      ? fontPreloadLinks.filter(
          link => link.href?.includes('OutrunFuture') || link.href?.includes('Sacramento')
        )
      : fontPreloadLinks

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
        {fontsToLoad.map(link => (
          <link key={link.href} {...link} />
        ))}
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
