import { render, screen } from '@testing-library/react'
import { Welcome } from '~/welcome/welcome'
import { describe, expect, it } from 'vitest'

describe('Welcome component', () => {
  it('renders correctly with all content and social links', () => {
    render(<Welcome />)

    // Main content
    expect(screen.getByText('Matt Burnett')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('What I do...')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()

    // Social links
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Bluesky')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()

    // Verify links
    expect(screen.getByText('LinkedIn').closest('a')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/burnettmatt/'
    )
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/mawburn'
    )
    expect(screen.getByText('Email').closest('a')).toHaveAttribute(
      'href',
      'mailto:mawburn7@gmail.com'
    )
  })
})
