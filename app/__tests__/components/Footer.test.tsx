import { render, screen } from '@testing-library/react'
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

  it('should render with correct structure and default max-width', () => {
    render(<Footer />)

    // Check copyright text
    expect(screen.getByText(/© \d{4} Matt Burnett\. All rights reserved\./)).toBeInTheDocument()

    // Check structure and styling
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('mt-auto')

    const container = document.querySelector('.container')
    expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-6', 'max-w-4xl')

    const textElement = screen.getByText(/© \d{4} Matt Burnett\. All rights reserved\./)
    expect(textElement).toHaveClass('text-black', 'dark:text-white')
  })

  it('should use custom max-width when provided', () => {
    render(<Footer maxWidth="max-w-3xl" />)

    const container = document.querySelector('.container')
    expect(container).toHaveClass('max-w-3xl')
    expect(container).not.toHaveClass('max-w-4xl')
  })
})
