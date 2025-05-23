import { blogPostsData } from '~/utils/blogData'
import { describe, expect, it } from 'vitest'

describe('blogPostsData', () => {
  it('exports blogPostsData as an object', () => {
    expect(typeof blogPostsData).toBe('object')
    expect(blogPostsData).not.toBeNull()
  })

  it('contains blog post data keyed by slug', () => {
    const slugs = Object.keys(blogPostsData)

    // Should have at least one blog post
    expect(slugs.length).toBeGreaterThan(0)

    // All keys should be valid slugs (no file extensions)
    slugs.forEach(slug => {
      expect(slug).not.toContain('.md')
      expect(slug).not.toContain('/')
      expect(typeof slug).toBe('string')
      expect(slug.length).toBeGreaterThan(0)
    })
  })

  it('contains valid markdown content for each post', () => {
    const posts = Object.values(blogPostsData)

    posts.forEach(content => {
      expect(typeof content).toBe('string')
      expect(content.length).toBeGreaterThan(0)

      // Should contain frontmatter markers
      expect(content).toContain('---')

      // Should have basic frontmatter fields
      expect(content).toMatch(/title:/i)
      expect(content).toMatch(/date:/i)
    })
  })

  it('creates correct slugs from file paths', () => {
    const slugs = Object.keys(blogPostsData)

    // Test that we have the expected blog post
    expect(slugs).toContain('2025-05-26-shopify-ai-chat')
  })

  it('loads content that can be parsed', () => {
    // Get the first post to test
    const firstSlug = Object.keys(blogPostsData)[0]
    const content = blogPostsData[firstSlug]

    // Should be able to split into frontmatter and content
    const lines = content.split('\n')
    const firstFrontmatterIndex = lines.findIndex(line => line === '---')
    const secondFrontmatterIndex = lines.findIndex(
      (line, index) => index > firstFrontmatterIndex && line === '---'
    )

    expect(firstFrontmatterIndex).toBeGreaterThanOrEqual(0)
    expect(secondFrontmatterIndex).toBeGreaterThan(firstFrontmatterIndex)
  })

  it('includes content beyond frontmatter', () => {
    const posts = Object.values(blogPostsData)

    posts.forEach(content => {
      // Split by frontmatter delimiters
      const parts = content.split('---')

      // Should have at least 3 parts: empty, frontmatter, content
      expect(parts.length).toBeGreaterThanOrEqual(3)

      // The content part (after second ---) should exist and not be empty
      const contentPart = parts.slice(2).join('---').trim()
      expect(contentPart.length).toBeGreaterThan(0)
    })
  })

  it('maintains consistent data structure', () => {
    // All entries should be string content
    Object.entries(blogPostsData).forEach(([slug, content]) => {
      expect(typeof slug).toBe('string')
      expect(typeof content).toBe('string')
      expect(slug.length).toBeGreaterThan(0)
      expect(content.length).toBeGreaterThan(0)
    })
  })
})
