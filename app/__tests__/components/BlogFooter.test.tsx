import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { BlogFooter } from '~/components/BlogFooter'

describe('BlogFooter Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-01-01'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render copyright text', () => {
    render(<BlogFooter />)

    expect(screen.getByText(/© \d{4} Matt Burnett\. All rights reserved\./)).toBeInTheDocument()
  })

  it('should use default max-width when none provided', () => {
    render(<BlogFooter />)

    const container = document.querySelector('.container')
    expect(container).toHaveClass('max-w-4xl')
  })

  it('should use custom max-width when provided', () => {
    render(<BlogFooter maxWidth="max-w-3xl" />)

    const container = document.querySelector('.container')
    expect(container).toHaveClass('max-w-3xl')
  })

  it('should have correct styling classes', () => {
    render(<BlogFooter />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('mt-auto')

    const textElement = screen.getByText(/© \d{4} Matt Burnett\. All rights reserved\./)
    expect(textElement).toHaveClass(
      'bg-gradient-to-r',
      'from-fuchsia-500',
      'via-purple-500',
      'to-fuchsia-400',
      'bg-clip-text',
      'text-transparent'
    )
  })

  it('should be centered and have proper container structure', () => {
    render(<BlogFooter />)

    const container = document.querySelector('.container')
    expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-6')

    const textContainer = document.querySelector('.text-center')
    expect(textContainer).toHaveClass('text-center', 'text-sm')
  })
})
