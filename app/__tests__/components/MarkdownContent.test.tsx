import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MarkdownContent } from '~/components/MarkdownContent'

describe('MarkdownContent', () => {
  it('renders HTML content with default styling and accepts props', () => {
    const html = '<p>Test content</p>'
    const { container } = render(
      <MarkdownContent
        html={html}
        className="custom-class"
        data-testid="markdown-content"
        id="test-id"
      />
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()

    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass(
      'text-gray-800',
      'dark:text-gray-200',
      'leading-relaxed',
      'mb-12',
      'custom-class'
    )
    expect(div).toHaveAttribute('data-testid', 'markdown-content')
    expect(div).toHaveAttribute('id', 'test-id')
  })

  it('renders complex HTML with multiple elements', () => {
    const html = `
      <h1>Main Heading</h1>
      <p>First paragraph with <a href="/link">a link</a></p>
      <h2>Subheading</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
      </ol>
    `
    render(<MarkdownContent html={html} />)

    expect(screen.getByText('Main Heading')).toBeInTheDocument()
    expect(screen.getByText('First paragraph with')).toBeInTheDocument()
    expect(screen.getByText('a link')).toBeInTheDocument()
    expect(screen.getByText('Subheading')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Ordered item 1')).toBeInTheDocument()
    expect(screen.getByText('Ordered item 2')).toBeInTheDocument()
  })

  it('handles edge cases including empty HTML and special characters', () => {
    // Empty HTML
    const { container, rerender } = render(<MarkdownContent html="" />)
    const div = container.firstChild as HTMLElement
    expect(div).toBeInTheDocument()
    expect(div.innerHTML).toBe('')

    // Special characters
    const htmlWithSpecialChars = '<p>Test with &lt;special&gt; characters &amp; entities</p>'
    rerender(<MarkdownContent html={htmlWithSpecialChars} />)
    expect(screen.getByText('Test with <special> characters & entities')).toBeInTheDocument()
  })
})
