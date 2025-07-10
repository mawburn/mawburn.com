import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { loader } from '~/routes/sitemap[.]xml'
import type { BlogPostMetadata } from '~/utils/blogTypes'

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

vi.mock('~/utils/blog', () => ({
  getAllPostsMetadata: vi.fn(() => mockPosts),
}))

describe('Sitemap XML Route', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-15T10:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should generate valid XML sitemap', async () => {
    const response = await loader()
    const xml = await response.text()

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('</urlset>')
  })

  it('should include static pages with correct properties', async () => {
    const response = await loader()
    const xml = await response.text()

    // Home page
    expect(xml).toContain('<loc>https://mawburn.com</loc>')
    expect(xml).toContain('<priority>1.0</priority>')
    expect(xml).toContain('<changefreq>weekly</changefreq>')

    // Blog listing page
    expect(xml).toContain('<loc>https://mawburn.com/blog</loc>')
    expect(xml).toContain('<priority>0.8</priority>')
  })

  it('should include blog posts with correct URLs and metadata', async () => {
    const response = await loader()
    const xml = await response.text()

    // Test post 1
    expect(xml).toContain('<loc>https://mawburn.com/blog/test-post-1</loc>')
    expect(xml).toContain('<lastmod>2025-01-01T00:00:00.000Z</lastmod>')
    expect(xml).toContain('<priority>0.7</priority>')
    expect(xml).toContain('<changefreq>monthly</changefreq>')

    // Test post 2
    expect(xml).toContain('<loc>https://mawburn.com/blog/test-post-2</loc>')
    expect(xml).toContain('<lastmod>2025-01-02T00:00:00.000Z</lastmod>')
  })

  it('should have correct response headers', async () => {
    const response = await loader()

    expect(response.headers.get('Content-Type')).toBe('application/xml')
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
    )
  })

  it('should use current date for static pages lastmod', async () => {
    const response = await loader()
    const xml = await response.text()

    expect(xml).toContain('<lastmod>2025-01-15T10:00:00.000Z</lastmod>')
  })

  it('should handle empty blog posts', async () => {
    vi.mocked(await import('~/utils/blog')).getAllPostsMetadata.mockReturnValue([])

    const response = await loader()
    const xml = await response.text()

    // Should still include static pages
    expect(xml).toContain('<loc>https://mawburn.com</loc>')
    expect(xml).toContain('<loc>https://mawburn.com/blog</loc>')

    // Should not include any blog post URLs
    expect(xml).not.toContain('/blog/test-post')
  })
})
