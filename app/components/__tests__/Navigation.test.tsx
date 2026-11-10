import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { Navigation } from '~/components/Navigation'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navigation />
    </MemoryRouter>
  )

describe('Navigation', () => {
  it('links to all five primary pages', () => {
    renderAt('/')

    const nav = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(nav).toBeInTheDocument()

    const expected: Record<string, string> = {
      Home: '/',
      About: '/about',
      Blog: '/blog',
      Résumé: '/resume',
      Contact: '/contact',
    }
    for (const [label, href] of Object.entries(expected)) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('marks the current page with aria-current', () => {
    renderAt('/about')

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })

  it('keeps Blog active on nested blog post routes', () => {
    renderAt('/blog/some-post')

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not render a theme toggle (the toggle is blog-only)', () => {
    renderAt('/blog')

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
