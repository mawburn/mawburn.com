import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Footer } from '~/components/Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-01-01'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the copyright with the current year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      `Matt Burnett © ${new Date().getFullYear()}`
    )
  })

  it('links to every social profile, safely opening in a new tab', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    for (const name of ['GitHub', 'LinkedIn', 'Instagram', 'Reddit', 'Bluesky']) {
      const link = screen.getByRole('link', { name: new RegExp(name) })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/rss.xml')
  })
})
