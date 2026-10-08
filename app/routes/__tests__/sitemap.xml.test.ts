import type { BlogPostMetadata } from 'postflow'
import { describe, expect, it, vi } from 'vitest'

import { loader } from '~/routes/sitemap[.]xml'

const mockPosts: BlogPostMetadata[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    date: '2025-01-01',
    excerpt: 'Test excerpt 1',
    tags: ['react'],
    readTime: 5,
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    date: '2025-01-02',
    excerpt: 'Test excerpt 2',
    tags: ['javascript'],
    readTime: 3,
  },
]

vi.mock('~/utils/blog-config', () => ({
  getAllPostsMetadataWithUpdated: vi.fn(async () => mockPosts),
}))

describe('Sitemap XML Route', () => {
  it('generates valid XML sitemap', async () => {
    const response = await loader()
    const xml = await response.text()

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('</urlset>')
  })

  it('includes important public HTML pages and blog posts', async () => {
    const response = await loader()
    const xml = await response.text()

    expect(xml).toContain('<loc>https://mawburn.com/</loc>')
    expect(xml).toContain('<loc>https://mawburn.com/resume</loc>')
    expect(xml).toContain('<loc>https://mawburn.com/blog</loc>')
    expect(xml).toContain('<loc>https://mawburn.com/blog/test-post-1</loc>')
    expect(xml).toContain('<lastmod>2025-01-01T00:00:00.000Z</lastmod>')
    expect(xml).toContain('<loc>https://mawburn.com/blog/test-post-2</loc>')
    expect(xml).toContain('<lastmod>2025-01-02T00:00:00.000Z</lastmod>')
  })

  it('does not include utility routes', async () => {
    const response = await loader()
    const xml = await response.text()

    expect(xml).not.toContain('/robots.txt')
    expect(xml).not.toContain('/llms.txt')
    expect(xml).not.toContain('/resume.md')
    expect(xml).not.toContain('/rss.xml')
    expect(xml).not.toContain('/.well-known/')
  })

  it('has correct response headers', async () => {
    const response = await loader()

    expect(response.headers.get('Content-Type')).toBe('application/xml; charset=utf-8')
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
    )
  })
})
