import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import { meta } from '~/routes/blog.post'
import { getPostBySlugWithUpdated } from '~/utils/blog-config'
import { generateArticleStructuredData } from '~/utils/structuredData'

describe('Shopify retrospective image', () => {
  it('uses the title-card image for social cards and article structured data', async () => {
    const slug = '2026-10-08-leaving-shopify'
    const post = await getPostBySlugWithUpdated(slug)
    expect(post).not.toBeNull()
    if (!post) throw new Error('Shopify retrospective not found')

    expect(post.images).toMatchObject({
      default: `/images/${slug}.webp`,
      twitter: `/images/${slug}.webp`,
      small: `/images/${slug}.webp`,
    })
    for (const image of Object.values(post.images ?? {})) {
      expect(existsSync(resolve('public', image.replace(/^\//, '')))).toBe(true)
    }

    const tags = meta({ params: { slug }, data: { post } } as Parameters<typeof meta>[0])
    expect(tags).toEqual(
      expect.arrayContaining([
        { property: 'og:image', content: `https://mawburn.com/images/${slug}.webp` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `https://mawburn.com/images/${slug}.webp` },
      ])
    )
    expect(generateArticleStructuredData(post, `https://mawburn.com/blog/${slug}`)).toHaveProperty(
      'image',
      expect.arrayContaining([`https://mawburn.com/images/${slug}.webp`])
    )
  })
})
