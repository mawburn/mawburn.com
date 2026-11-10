import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { Welcome } from '~/welcome/welcome'

const posts = [
  {
    slug: '2026-10-08-shopify',
    title: 'What did I actually do at Shopify?',
    date: '2026-10-08',
    readTime: 8,
  },
  { slug: '2025-06-06-rats', title: 'Nine Brains, One Giant Rat', date: '2025-06-06', readTime: 5 },
]

const renderWelcome = (recentPosts = posts) =>
  render(
    <MemoryRouter>
      <Welcome recentPosts={recentPosts} />
    </MemoryRouter>
  )

describe('Welcome component', () => {
  it('renders the hero, sections and a single h1', () => {
    renderWelcome()

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Matt Burnett')
    expect(screen.getByRole('heading', { name: 'What I do' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Selected Work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument()
  })

  it('links recent posts to their blog routes', () => {
    renderWelcome()

    expect(
      screen.getByRole('link', { name: 'What did I actually do at Shopify?' })
    ).toHaveAttribute('href', '/blog/2026-10-08-shopify')
  })

  it('hides the recent writing section when there are no posts', () => {
    renderWelcome([])

    expect(screen.queryByRole('heading', { name: 'Recent Writing' })).not.toBeInTheDocument()
  })

  it('exposes the contact email', () => {
    renderWelcome()

    expect(screen.getByRole('link', { name: 'mawburn7@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:mawburn7@gmail.com'
    )
  })

  it('hides the decorative forest hero from assistive tech', () => {
    const { container } = renderWelcome()

    expect(container.querySelector('svg.forest-hero')).toHaveAttribute('aria-hidden', 'true')
  })
})
