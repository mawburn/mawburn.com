import { describe, expect, it } from 'vitest'

import { markdownToHtml } from '~/utils/markdown'

describe('markdownToHtml', () => {
  it('converts basic markdown elements', () => {
    // Basic elements
    const basicHtml = markdownToHtml('# Hello World\n\nThis is a paragraph.')
    expect(basicHtml).toContain('<h1>Hello World</h1>')
    expect(basicHtml).toContain('<p>This is a paragraph.</p>')

    // Text formatting
    const formattedHtml = markdownToHtml('**Bold text** and *italic text*')
    expect(formattedHtml).toContain('<strong>Bold text</strong>')
    expect(formattedHtml).toContain('<em>italic text</em>')

    // Links
    expect(markdownToHtml('[GitHub](https://github.com)')).toContain(
      '<a href="https://github.com">GitHub</a>'
    )
    expect(markdownToHtml('Visit https://example.com for more info')).toContain(
      '<a href="https://example.com">https://example.com</a>'
    )

    // Code
    const codeBlock = markdownToHtml('```javascript\nconsole.log("Hello");\n```')
    expect(codeBlock).toContain('<pre><code')
    expect(codeBlock).toContain('console.log')
    expect(markdownToHtml('Use the `console.log()` function')).toContain(
      '<code>console.log()</code>'
    )
  })

  it('converts lists, blockquotes, and headings', () => {
    // Unordered list
    const ulHtml = markdownToHtml(`- Item 1\n- Item 2\n- Item 3`)
    expect(ulHtml).toContain('<ul>')
    expect(ulHtml).toContain('<li>Item 1</li>')
    expect(ulHtml).toContain('<li>Item 2</li>')
    expect(ulHtml).toContain('<li>Item 3</li>')

    // Ordered list
    const olHtml = markdownToHtml(`1. First item\n2. Second item\n3. Third item`)
    expect(olHtml).toContain('<ol>')
    expect(olHtml).toContain('<li>First item</li>')
    expect(olHtml).toContain('<li>Second item</li>')
    expect(olHtml).toContain('<li>Third item</li>')

    // Blockquote
    const blockquoteHtml = markdownToHtml('> This is a blockquote')
    expect(blockquoteHtml).toContain('<blockquote>')
    expect(blockquoteHtml).toContain('This is a blockquote')

    // HTML passthrough
    expect(markdownToHtml('Regular text with <strong>HTML</strong> tags')).toContain(
      '<strong>HTML</strong>'
    )

    // Multiple headings
    const headingsHtml = markdownToHtml(`# H1 Heading\n## H2 Heading\n### H3 Heading`)
    expect(headingsHtml).toContain('<h1>H1 Heading</h1>')
    expect(headingsHtml).toContain('<h2>H2 Heading</h2>')
    expect(headingsHtml).toContain('<h3>H3 Heading</h3>')
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
