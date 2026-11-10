import { describe, expect, it, vi } from 'vitest'

import { loader as postMdLoader } from '~/routes/blog.post[.]md'
import { loader as llmsFullLoader } from '~/routes/llms-full[.]txt'

const posts = [
  { slug: 'old', title: 'Old', date: '2025-01-01', excerpt: 'e', tags: ['a'], readTime: 1 },
  {
    slug: 'new',
    title: 'New',
    date: '2025-02-01',
    updated: '2025-02-03',
    excerpt: 'e',
    tags: [],
    readTime: 1,
  },
]

vi.mock('~/utils/blog-config', async () => {
  const actual = await vi.importActual<typeof import('~/utils/blog-config')>('~/utils/blog-config')
  return {
    getMarkdownBody: actual.getMarkdownBody,
    blogRawContent: {
      old: "---\ntitle: 'Old'\n---\n\nOld body.",
      new: "---\ntitle: 'New'\n---\n\nNew body.",
    },
    getAllPostsMetadataWithUpdated: vi.fn(async () => posts),
    getPostBySlugWithUpdated: vi.fn(
      async (slug: string) => posts.find(p => p.slug === slug) ?? null
    ),
  }
})

describe('post markdown route', () => {
  it('serves a post as markdown with provenance header and no frontmatter', async () => {
    const res = await postMdLoader({ params: { slug: 'new' } } as never)
    const text = await res.text()

    expect(res.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(text).toContain('# New')
    expect(text).toContain('- URL: https://mawburn.com/blog/new')
    expect(text).toContain('- Updated: 2025-02-03')
    expect(text).toContain('New body.')
    expect(text).not.toContain("title: 'New'")
  })

  it('404s for unknown posts', async () => {
    await expect(postMdLoader({ params: { slug: 'nope' } } as never)).rejects.toMatchObject({
      status: 404,
    })
  })
})

describe('llms-full.txt route', () => {
  it('includes every post in full, newest first, with attribution', async () => {
    const res = await llmsFullLoader()
    const text = await res.text()

    expect(res.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(text).toContain('please credit Matt Burnett')
    expect(text).toContain('Old body.')
    expect(text.indexOf('New body.')).toBeLessThan(text.indexOf('Old body.'))
  })
})
