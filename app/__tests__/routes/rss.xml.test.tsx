import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loader } from '~/routes/rss[.]xml'
import * as blogUtils from '~/utils/blog'

vi.mock('~/utils/blog')

describe('RSS Feed Route', () => {
  const mockPosts = [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-01',
      excerpt: 'This is test post 1',
      tags: ['test', 'post'],
      readTime: 5,
      image: null,
      author: 'Test Author',
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2 & Special Characters',
      date: '2024-01-02',
      excerpt: 'This is test post 2 with <special> characters & "quotes"',
      tags: ['test', 'special'],
      readTime: 3,
      image: null,
      author: 'Test Author',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(blogUtils.getAllPostsMetadata).mockReturnValue(mockPosts)
  })

  it('generates valid RSS XML with correct headers and structure', async () => {
    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    // Headers
    expect(response.headers.get('Content-Type')).toBe('application/rss+xml; charset=utf-8')
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    )

    // XML structure
    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(text).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">')
    expect(text).toContain('<channel>')
    expect(text).toContain('</channel>')
    expect(text).toContain('</rss>')

    // Channel metadata
    expect(text).toContain("<title>Matt Burnett's Blog</title>")
    expect(text).toContain(
      '<description>Thoughts on web development, technology, and software engineering</description>'
    )
    expect(text).toContain('<link>https://example.com/blog</link>')
    expect(text).toContain(
      '<atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml" />'
    )
    expect(text).toContain('<language>en-us</language>')
    expect(text).toContain('<lastBuildDate>')
  })

  it('includes all blog posts as items', async () => {
    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    expect(text).toContain('<title>Test Post 1</title>')
    expect(text).toContain('<description>This is test post 1</description>')
    expect(text).toContain('<link>https://example.com/blog/test-post-1</link>')
    expect(text).toContain('<guid isPermaLink="true">https://example.com/blog/test-post-1</guid>')

    expect(text).toContain('<title>Test Post 2 &amp; Special Characters</title>')
    expect(text).toContain('<link>https://example.com/blog/test-post-2</link>')
  })

  it('escapes special XML characters', async () => {
    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    expect(text).toContain('Test Post 2 &amp; Special Characters')
    expect(text).toContain('with &lt;special&gt; characters &amp; &quot;quotes&quot;')
  })

  it('includes post categories from tags', async () => {
    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    expect(text).toContain('<category>test</category>')
    expect(text).toContain('<category>post</category>')
    expect(text).toContain('<category>special</category>')
  })

  it('formats dates correctly', async () => {
    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    const date1 = new Date('2024-01-01').toUTCString()
    const date2 = new Date('2024-01-02').toUTCString()

    expect(text).toContain(`<pubDate>${date1}</pubDate>`)
    expect(text).toContain(`<pubDate>${date2}</pubDate>`)
  })

  it('handles empty posts array', async () => {
    vi.mocked(blogUtils.getAllPostsMetadata).mockReturnValue([])

    const request = new Request('https://example.com/rss.xml')
    const response = await loader({ request, params: {}, context: {} })
    const text = await response.text()

    expect(text).toContain('<channel>')
    expect(text).not.toContain('<item>')
    expect(text).toContain('</channel>')
  })
})
