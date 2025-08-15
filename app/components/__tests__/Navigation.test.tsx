import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Navigation } from '~/components/Navigation'

vi.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useLocation: vi.fn(() => ({ pathname: '/blog' })),
}))

vi.mock('~/components/HouseIcon', () => ({
  HouseIcon: () => (
    <svg data-testid="house-icon">
      <title>House Icon</title>
    </svg>
  ),
}))

vi.mock('~/components/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}))

const { useLocation } = await import('react-router')

describe('Navigation', () => {
  describe('Navigation links', () => {
    it('provides accessible navigation to all main sections', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/blog' } as any)
      render(<Navigation />)

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()

      const homeLink = screen.getByLabelText('Home')
      expect(homeLink).toHaveAttribute('href', '/')
      expect(homeLink).toBeVisible()

      const blogLink = screen.getByText('Blog').closest('a')
      expect(blogLink).toHaveAttribute('href', '/blog')
      expect(blogLink).toBeVisible()

      expect(screen.getByTestId('house-icon')).toBeInTheDocument()
    })

    it('shows theme toggle when not on home page', () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: '/blog' } as any)
      render(<Navigation />)

      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    describe('Edge cases', () => {
      it('hides theme toggle on home page', () => {
        vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as any)
        render(<Navigation />)

        expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument()
      })

      it('handles different page paths correctly', () => {
        vi.mocked(useLocation).mockReturnValue({ pathname: '/blog/some-post' } as any)
        render(<Navigation />)

        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
        expect(screen.getByLabelText('Home')).toBeInTheDocument()
        expect(screen.getByText('Blog')).toBeInTheDocument()
      })
    })
  })
})
