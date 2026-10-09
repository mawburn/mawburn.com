import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loader } from '~/routes/llms[.]txt'
import { getAllPostsMetadataWithUpdated } from '~/utils/blog-config'

vi.mock('~/utils/blog-config', () => ({
  getAllPostsMetadataWithUpdated: vi.fn(),
}))

describe('llms.txt route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getAllPostsMetadataWithUpdated).mockResolvedValue([
      {
        slug: 'older-post',
        title: 'Older Post',
        date: '2025-01-01',
        excerpt: 'Older post excerpt.',
        tags: ['test'],
        readTime: 4,
      },
      {
        slug: 'newer-post',
        title: 'Newer [Post]',
        date: '2025-02-01',
        excerpt: 'Newer post excerpt with extra\n whitespace.',
        tags: ['test'],
        readTime: 5,
      },
    ])
  })

  it('returns clean markdown with existing profile sections and dynamic blog posts', async () => {
    const response = await loader()
    const text = await response.text()

    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(text).toContain('# Matt Burnett')
    expect(text).toContain('## Professional profile')
    expect(text).toContain('## Selected work')
    expect(text).toContain('## Writing')
    expect(text).toContain('## Technical areas')
    expect(text).toContain('## Blog Posts')

    expect(text).toContain(
      '- [Newer \\[Post\\]](https://mawburn.com/blog/newer-post): Newer post excerpt with extra whitespace.'
    )
    expect(text).toContain(
      '- [Older Post](https://mawburn.com/blog/older-post): Older post excerpt.'
    )
  })

  it('uses shared blog metadata and sorts posts newest first', async () => {
    const response = await loader()
    const text = await response.text()

    expect(getAllPostsMetadataWithUpdated).toHaveBeenCalledTimes(1)
    expect(text.indexOf('https://mawburn.com/blog/newer-post')).toBeLessThan(
      text.indexOf('https://mawburn.com/blog/older-post')
    )
  })

  it('preserves text cache headers', async () => {
    const response = await loader()

    expect(response.headers.get('Cache-Control')).toBe('public, max-age=86400, s-maxage=86400')
    expect(response.headers.get('CDN-Cache-Control')).toBe('max-age=86400')
    expect(response.headers.get('Cloudflare-CDN-Cache-Control')).toBe('max-age=86400')
  })
})
