import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Layout, ErrorBoundary } from '~/root'

vi.mock('react-router', () => ({
  Links: () => <div data-testid="links" />,
  Meta: () => <div data-testid="meta" />,
  Scripts: () => <div data-testid="scripts" />,
  ScrollRestoration: () => <div data-testid="scroll-restoration" />,
  useLocation: vi.fn(() => ({ pathname: '/blog' })),
  isRouteErrorResponse: vi.fn((error: any) => error && typeof error.status === 'number'),
}))

vi.mock('~/components/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}))

const { useLocation } = await import('react-router')

describe('Root Layout', () => {
  it('should render layout with basic structure', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('scripts')).toBeInTheDocument()
    expect(screen.getByTestId('scroll-restoration')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should have correct HTML structure and meta tags', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    const html = document.documentElement
    expect(html).toHaveAttribute('lang', 'en')

    const metaTags = document.head.querySelectorAll('meta')
    const charsetMeta = Array.from(metaTags).find(meta => meta.getAttribute('charSet'))
    expect(charsetMeta).toHaveAttribute('charSet', 'utf-8')
  })

  it('should load only Lexend fonts for blog routes', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/blog/test-post' } as any)

    render(
      <Layout>
        <div>Blog Content</div>
      </Layout>
    )

    const links = document.head.querySelectorAll('link[rel="preload"]')
    const fontLinks = Array.from(links).filter(link =>
      link.getAttribute('href')?.includes('fonts/')
    )

    fontLinks.forEach(link => {
      const href = link.getAttribute('href')
      expect(href).toMatch(/Lexend/)
    })
  })

  it('should load correct fonts based on route', () => {
    // Test home route
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as any)
    const { unmount } = render(
      <Layout>
        <div>Home Content</div>
      </Layout>
    )

    let links = document.head.querySelectorAll('link[rel="preload"]')
    let fontLinks = Array.from(links).filter(link => link.getAttribute('href')?.includes('fonts/'))
    let fontNames = fontLinks.map(link => link.getAttribute('href'))
    expect(fontNames.some(href => href?.includes('OutrunFuture'))).toBe(true)
    expect(fontNames.some(href => href?.includes('Sacramento'))).toBe(true)
    expect(fontNames.some(href => href?.includes('Lexend'))).toBe(false)

    unmount()

    // Test other routes
    vi.mocked(useLocation).mockReturnValue({ pathname: '/some-other-route' } as any)
    render(
      <Layout>
        <div>Other Content</div>
      </Layout>
    )

    links = document.head.querySelectorAll('link[rel="preload"]')
    fontLinks = Array.from(links).filter(link => link.getAttribute('href')?.includes('fonts/'))
    expect(fontLinks.length).toBe(4) // All 4 fonts
  })

  it('should include dark mode script', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    const scripts = document.head.querySelectorAll('script')
    const darkModeScript = Array.from(scripts).find(script =>
      script.innerHTML.includes("localStorage.getItem('theme')")
    )
    expect(darkModeScript).toBeTruthy()
  })

  it('should have correct body structure with padding', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    const contentDiv = screen.getByText('Test Content').parentElement
    expect(contentDiv).toHaveClass('pt-16')
  })
})

describe('ErrorBoundary', () => {
  it('should render 404 error for route error response', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
    }

    render(<ErrorBoundary error={mockError as any} params={{}} />)

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('The requested page could not be found.')).toBeInTheDocument()
  })

  it('should handle different error types', () => {
    // Route error response
    const routeError = { status: 500, statusText: 'Internal Server Error' }
    const { unmount } = render(<ErrorBoundary error={routeError as any} params={{}} />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
    unmount()

    // Development mode with stack trace
    const originalEnv = import.meta.env
    vi.stubGlobal('import.meta.env', { ...originalEnv, DEV: true })
    const jsError = new Error('Test error message')
    jsError.stack = 'Error: Test error\n  at test.js:1:1'
    render(<ErrorBoundary error={jsError} params={{}} />)
    expect(screen.getByText('Test error message')).toBeInTheDocument()
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument()
    vi.stubGlobal('import.meta.env', originalEnv)
  })
})
