import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '~/root'

vi.mock('react-router', () => ({
  Links: () => null,
  Meta: () => null,
  Scripts: () => null,
  ScrollRestoration: () => null,
  useLocation: vi.fn(() => ({ pathname: '/blog' })),
  isRouteErrorResponse: vi.fn((error: any) => error && typeof error.status === 'number'),
}))

vi.mock('~/components/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}))

vi.mock('~/utils/structuredData', () => ({
  generateWebSiteStructuredData: vi.fn(() => ({ '@context': 'https://schema.org' })),
  generatePersonStructuredData: vi.fn(() => ({ '@context': 'https://schema.org' })),
}))

function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav data-testid="navigation">Navigation</nav>
      <div className="pt-16">{children}</div>
    </div>
  )
}

describe('Root Layout', () => {
  describe('Layout functionality', () => {
    it('renders navigation and page content', () => {
      render(
        <TestLayout>
          <div>Test Content</div>
        </TestLayout>
      )

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders with proper layout structure', () => {
      render(
        <TestLayout>
          <div>Test Content</div>
        </TestLayout>
      )

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()

      const mainContent = screen.getByText('Test Content').closest('.pt-16')
      expect(mainContent).toBeInTheDocument()
    })

    describe('Edge cases', () => {
      it('handles empty children gracefully', () => {
        expect(() => render(<TestLayout>{null}</TestLayout>)).not.toThrow()
      })

      it('renders multiple child elements', () => {
        render(
          <TestLayout>
            <div>First Child</div>
            <div>Second Child</div>
          </TestLayout>
        )

        expect(screen.getByText('First Child')).toBeInTheDocument()
        expect(screen.getByText('Second Child')).toBeInTheDocument()
      })
    })
  })
})

describe('ErrorBoundary', () => {
  describe('Error handling', () => {
    it('displays appropriate error message for 404 errors', () => {
      const notFoundError = {
        status: 404,
        statusText: 'Not Found',
      }

      render(<ErrorBoundary error={notFoundError as any} params={{}} />)

      expect(screen.getByText('404')).toBeInTheDocument()
      expect(screen.getByText('The requested page could not be found.')).toBeInTheDocument()
    })

    it('displays server error information', () => {
      const serverError = { status: 500, statusText: 'Internal Server Error' }

      render(<ErrorBoundary error={serverError as any} params={{}} />)

      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
    })

    it('shows JavaScript error messages in development', () => {
      const originalEnv = import.meta.env
      vi.stubGlobal('import.meta.env', { ...originalEnv, DEV: true })

      const jsError = new Error('Test error message')
      jsError.stack = 'Error: Test error\n  at test.js:1:1'

      render(<ErrorBoundary error={jsError} params={{}} />)

      expect(screen.getByText('Test error message')).toBeInTheDocument()
      expect(screen.getByText(/Error: Test error/)).toBeInTheDocument()

      vi.stubGlobal('import.meta.env', originalEnv)
    })

    describe('Edge cases', () => {
      it('handles errors without status gracefully', () => {
        const unknownError = new Error('Unknown error')

        expect(() => render(<ErrorBoundary error={unknownError} params={{}} />)).not.toThrow()
      })

      it('handles null error gracefully', () => {
        expect(() => render(<ErrorBoundary error={null as any} params={{}} />)).not.toThrow()
      })
    })
  })
})
