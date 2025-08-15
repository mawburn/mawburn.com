import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MarkdownContent } from '~/components/MarkdownContent'

describe('MarkdownContent', () => {
  describe('HTML content rendering', () => {
    it('displays HTML content correctly', () => {
      const html = '<p>Test content</p>'
      render(<MarkdownContent html={html} />)

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('accepts and applies custom props', () => {
      const html = '<p>Test content</p>'
      render(
        <MarkdownContent
          html={html}
          className="custom-class"
          data-testid="markdown-content"
          id="test-id"
        />
      )

      const container = screen.getByTestId('markdown-content')
      expect(container).toHaveAttribute('id', 'test-id')
      expect(container).toHaveClass('custom-class')
    })

    it('renders complex HTML structures with all elements', () => {
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
        <blockquote>A quote</blockquote>
        <code>inline code</code>
      `
      render(<MarkdownContent html={html} />)

      expect(screen.getByRole('heading', { level: 1, name: 'Main Heading' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'Subheading' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'a link' })).toHaveAttribute('href', '/link')
      expect(screen.getAllByRole('list')).toHaveLength(2)
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Ordered item 1')).toBeInTheDocument()
      expect(screen.getByText('A quote')).toBeInTheDocument()
      expect(screen.getByText('inline code')).toBeInTheDocument()
    })

    describe('Edge cases', () => {
      it('handles empty HTML gracefully', () => {
        const { container } = render(<MarkdownContent html="" />)
        const div = container.firstChild as HTMLElement
        expect(div).toBeInTheDocument()
        expect(div.innerHTML).toBe('')
      })

      it('properly decodes HTML entities', () => {
        const htmlWithEntities = '<p>Test with &lt;special&gt; characters &amp; entities</p>'
        render(<MarkdownContent html={htmlWithEntities} />)
        expect(screen.getByText('Test with <special> characters & entities')).toBeInTheDocument()
      })

      it('handles malformed HTML without crashing', () => {
        const malformedHtml = '<p>Unclosed paragraph <strong>bold text'
        expect(() => render(<MarkdownContent html={malformedHtml} />)).not.toThrow()
        expect(screen.getByText('Unclosed paragraph')).toBeInTheDocument()
        expect(screen.getByText('bold text')).toBeInTheDocument()
      })
    })
  })
})
