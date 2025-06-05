import { blogPostsData } from '~/utils/blogData'
import { describe, expect, it } from 'vitest'

describe('blogPostsData', () => {
  it('exports valid blog post data with correct structure', () => {
    expect(typeof blogPostsData).toBe('object')
    expect(blogPostsData).not.toBeNull()

    const slugs = Object.keys(blogPostsData)
    const posts = Object.values(blogPostsData)

    // Should have at least one blog post
    expect(slugs.length).toBeGreaterThan(0)
    expect(slugs).toContain('2025-06-03-shopify-ai-chat')

    // All entries should be valid
    slugs.forEach((slug, index) => {
      // Valid slug format
      expect(slug).not.toContain('.md')
      expect(slug).not.toContain('/')
      expect(slug.length).toBeGreaterThan(0)

      // Valid content
      const content = posts[index]
      expect(typeof content).toBe('string')
      expect(content.length).toBeGreaterThan(0)
      expect(content).toContain('---')
      expect(content).toMatch(/title:/i)
      expect(content).toMatch(/date:/i)

      // Can be parsed (has frontmatter and content)
      const parts = content.split('---')
      expect(parts.length).toBeGreaterThanOrEqual(3)
      const contentPart = parts.slice(2).join('---').trim()
      expect(contentPart.length).toBeGreaterThan(0)
    })
  })
})
