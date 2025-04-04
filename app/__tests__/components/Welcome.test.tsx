import { render, screen } from '@testing-library/react'
import { Welcome } from '~/welcome/welcome'
import { describe, expect, it } from 'vitest'

describe('Welcome component', () => {
  it('renders correctly with a message', () => {
    render(<Welcome message="Test message" />)
    
    expect(screen.getByText('Matt Burnett')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    
    expect(screen.getByText('What I do...')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Bluesky')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('has correct links to social media', () => {
    render(<Welcome message="Test message" />)
    
    const linkedInLink = screen.getByText('LinkedIn').closest('a')
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/burnettmatt/')
    
    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/mawburn')
    
    const emailLink = screen.getByText('Email').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:mawburn7@gmail.com')
  })
})