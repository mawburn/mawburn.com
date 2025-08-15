import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loader } from '~/routes/rss[.]xml'

const mockGenerateRSSResponse = vi.fn()

vi.mock('postflow', () => ({
  RSSGenerator: vi.fn(() => ({
    generateRSSResponse: mockGenerateRSSResponse,
  })),
}))

vi.mock('~/utils/blog-config', () => ({
  blog: {
    getAllPostsMetadata: vi.fn(),
    getSiteConfig: vi.fn(() => ({
      title: 'Matt Burnett - Developer & Creator',
      description: 'A blog about web development, technology, and creativity',
      baseUrl: 'https://mawburn.com',
      language: 'en-us',
    })),
  },
}))

import { blog } from '~/utils/blog-config'

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
    vi.mocked(blog.getAllPostsMetadata).mockResolvedValue(mockPosts)

    const mockResponse = new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Matt Burnett - Developer &amp; Creator</title>
<description>A blog about web development, technology, and creativity</description>
<link>https://mawburn.com/blog</link>
<atom:link href="https://mawburn.com/rss.xml" rel="self" type="application/rss+xml" />
<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${mockPosts
  .map(
    post => `<item>
<title>${post.title.replace(/&/g, '&amp;')}</title>
<description>${post.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</description>
<link>https://mawburn.com/blog/${post.slug}</link>
<guid isPermaLink="true">https://mawburn.com/blog/${post.slug}</guid>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map(tag => `<category>${tag}</category>`).join('\n')}
</item>`
  )
  .join('\n')}
</channel>
</rss>`,
      {
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    )

    mockGenerateRSSResponse.mockReturnValue(mockResponse)
  })

  it('generates valid RSS XML with correct headers and structure', async () => {
    const response = await loader()
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
    expect(text).toContain('<title>Matt Burnett - Developer &amp; Creator</title>')
    expect(text).toContain(
      '<description>A blog about web development, technology, and creativity</description>'
    )
    expect(text).toContain('<link>https://mawburn.com/blog</link>')
    expect(text).toContain(
      '<atom:link href="https://mawburn.com/rss.xml" rel="self" type="application/rss+xml" />'
    )
    expect(text).toContain('<language>en-us</language>')
    expect(text).toContain('<lastBuildDate>')
  })

  it('includes all blog posts as items', async () => {
    const response = await loader()
    const text = await response.text()

    expect(text).toContain('<title>Test Post 1</title>')
    expect(text).toContain('<description>This is test post 1</description>')
    expect(text).toContain('<link>https://mawburn.com/blog/test-post-1</link>')
    expect(text).toContain('<guid isPermaLink="true">https://mawburn.com/blog/test-post-1</guid>')

    expect(text).toContain('<title>Test Post 2 &amp; Special Characters</title>')
    expect(text).toContain('<link>https://mawburn.com/blog/test-post-2</link>')
  })

  it('escapes special XML characters', async () => {
    const response = await loader()
    const text = await response.text()

    expect(text).toContain('Test Post 2 &amp; Special Characters')
    expect(text).toContain('with &lt;special&gt; characters &amp; &quot;quotes&quot;')
  })

  it('includes post categories from tags', async () => {
    const response = await loader()
    const text = await response.text()

    expect(text).toContain('<category>test</category>')
    expect(text).toContain('<category>post</category>')
    expect(text).toContain('<category>special</category>')
  })

  it('formats dates correctly', async () => {
    const response = await loader()
    const text = await response.text()

    const date1 = new Date('2024-01-01').toUTCString()
    const date2 = new Date('2024-01-02').toUTCString()

    expect(text).toContain(`<pubDate>${date1}</pubDate>`)
    expect(text).toContain(`<pubDate>${date2}</pubDate>`)
  })

  it('handles empty posts array', async () => {
    vi.mocked(blog.getAllPostsMetadata).mockResolvedValue([])

    const emptyResponse = new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Matt Burnett - Developer &amp; Creator</title>
<description>A blog about web development, technology, and creativity</description>
<link>https://mawburn.com/blog</link>
<atom:link href="https://mawburn.com/rss.xml" rel="self" type="application/rss+xml" />
<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
</channel>
</rss>`,
      {
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    )

    mockGenerateRSSResponse.mockReturnValue(emptyResponse)

    const response = await loader()
    const text = await response.text()

    expect(text).toContain('<channel>')
    expect(text).not.toContain('<item>')
    expect(text).toContain('</channel>')
  })
})
