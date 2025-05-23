import { markdownToHtml } from '~/utils/markdown'
import { describe, expect, it } from 'vitest'

describe('markdownToHtml', () => {
  it('converts basic markdown to HTML', () => {
    const markdown = '# Hello World\n\nThis is a paragraph.'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<h1>Hello World</h1>')
    expect(html).toContain('<p>This is a paragraph.</p>')
  })

  it('converts bold and italic text', () => {
    const markdown = '**Bold text** and *italic text*'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<strong>Bold text</strong>')
    expect(html).toContain('<em>italic text</em>')
  })

  it('converts links correctly', () => {
    const markdown = '[GitHub](https://github.com)'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<a href="https://github.com">GitHub</a>')
  })

  it('auto-links URLs', () => {
    const markdown = 'Visit https://example.com for more info'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<a href="https://example.com">https://example.com</a>')
  })

  it('converts code blocks', () => {
    const markdown = '```javascript\nconsole.log("Hello");\n```'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<pre><code')
    expect(html).toContain('console.log')
  })

  it('converts inline code', () => {
    const markdown = 'Use the `console.log()` function'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<code>console.log()</code>')
  })

  it('converts lists', () => {
    const markdown = `- Item 1
- Item 2
- Item 3`
    const html = markdownToHtml(markdown)

    expect(html).toContain('<ul>')
    expect(html).toContain('<li>Item 1</li>')
    expect(html).toContain('<li>Item 2</li>')
    expect(html).toContain('<li>Item 3</li>')
  })

  it('converts numbered lists', () => {
    const markdown = `1. First item
2. Second item
3. Third item`
    const html = markdownToHtml(markdown)

    expect(html).toContain('<ol>')
    expect(html).toContain('<li>First item</li>')
    expect(html).toContain('<li>Second item</li>')
    expect(html).toContain('<li>Third item</li>')
  })

  it('converts blockquotes', () => {
    const markdown = '> This is a blockquote'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<blockquote>')
    expect(html).toContain('This is a blockquote')
  })

  it('handles HTML in markdown (when html option is enabled)', () => {
    const markdown = 'Regular text with <strong>HTML</strong> tags'
    const html = markdownToHtml(markdown)

    expect(html).toContain('<strong>HTML</strong>')
  })

  it('converts multiple headings', () => {
    const markdown = `# H1 Heading
## H2 Heading
### H3 Heading`
    const html = markdownToHtml(markdown)

    expect(html).toContain('<h1>H1 Heading</h1>')
    expect(html).toContain('<h2>H2 Heading</h2>')
    expect(html).toContain('<h3>H3 Heading</h3>')
  })

  it('handles empty input', () => {
    expect(markdownToHtml('')).toBe('')
    const whitespaceResult = markdownToHtml('   ')
    expect(typeof whitespaceResult).toBe('string')
  })

  it('handles complex markdown with multiple elements', () => {
    const markdown = `# Blog Post Title

This is a **paragraph** with *emphasis* and a [link](https://example.com).

## Code Example

Here's some code:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

And here's a list:

- Item one
- Item two with \`inline code\`
- Item three

> Quote of the day`

    const html = markdownToHtml(markdown)

    expect(html).toContain('<h1>Blog Post Title</h1>')
    expect(html).toContain('<h2>Code Example</h2>')
    expect(html).toContain('<strong>paragraph</strong>')
    expect(html).toContain('<em>emphasis</em>')
    expect(html).toContain('<a href="https://example.com">link</a>')
    expect(html).toContain('<pre><code class="language-javascript">')
    expect(html).toContain('<ul>')
    expect(html).toContain('<code>inline code</code>')
    expect(html).toContain('<blockquote>')
  })
})
