import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Navigation } from '~/components/Navigation'

vi.mock('react-router', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  ),
  useLocation: vi.fn(() => ({ pathname: '/blog' })),
}))

vi.mock('~/components/HouseIcon', () => ({
  HouseIcon: ({ className }: { className?: string }) => (
    <svg data-testid="house-icon" className={className}>
      <title>House Icon</title>
    </svg>
  ),
}))

vi.mock('~/components/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}))

const { useLocation } = await import('react-router')

describe('Navigation Component', () => {
  it('should render navigation links correctly', () => {
    render(<Navigation />)

    expect(screen.getByTestId('house-icon')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()

    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toHaveAttribute('href', '/')

    const blogLink = screen.getByText('Blog').closest('a')
    expect(blogLink).toHaveAttribute('href', '/blog')
  })

  it('should show theme toggle on non-home pages', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/blog' } as any)

    render(<Navigation />)

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('should hide theme toggle on home page', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/' } as any)

    render(<Navigation />)

    expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument()
  })

  it('should have correct CSS classes for styling', () => {
    render(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')

    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toHaveClass('text-white', 'hover:text-cyan-300')

    const blogLink = screen.getByText('Blog').closest('a')
    expect(blogLink).toHaveClass('text-white', 'hover:text-cyan-300')
  })

  it('should render house icon with correct size', () => {
    render(<Navigation />)

    const houseIcon = screen.getByTestId('house-icon')
    expect(houseIcon).toHaveClass('w-8', 'h-8')
  })
})
