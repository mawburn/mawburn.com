import { describe, expect, it, vi } from 'vitest'

// Mock the blogData module with simpler test data
vi.mock('~/utils/blogData', () => ({
  blogPostsData: {
    'past-post': `---
title: "Past Post"
date: "2023-01-01"
excerpt: "This is a past post"
tags: ["past"]
---

This is published content.`,
    'post-with-image': `---
title: "Post with Image"
date: "2023-01-02"
excerpt: "This post has a custom image"
image: "custom-post-image.jpg"
tags: ["image"]
---

This post has a custom image specified.`,
  },
}))

// Mock dateUtils to control development mode
vi.mock('~/utils/dateUtils', () => ({
  isInDevelopment: vi.fn(() => false),
  isPostPublished: vi.fn(() => true),
  formatPublishDate: vi.fn(() => 'January 1, 2023'),
}))

const { getAllPostsMetadata, getPostBySlug, findPostImage, findPostImages } = await import('~/utils/blog')

describe('getAllPostsMetadata', () => {
  it('returns array of post metadata', () => {
    const posts = getAllPostsMetadata()

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThanOrEqual(0)
  })

  it('includes required metadata fields', () => {
    const posts = getAllPostsMetadata()

    if (posts.length > 0) {
      const post = posts[0]
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('excerpt')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('readTime')
    }
  })
})

describe('getPostBySlug', () => {
  it('returns null for non-existent post', () => {
    const post = getPostBySlug('non-existent-post')
    expect(post).toBeNull()
  })

  it('returns post object with required fields when found', () => {
    const post = getPostBySlug('past-post')

    if (post) {
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('excerpt')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('readTime')
      expect(post).toHaveProperty('image')
      expect(post).toHaveProperty('images')
    }
  })

  it('includes default image path for post without frontmatter image', () => {
    const post = getPostBySlug('past-post')

    if (post) {
      expect(post.image).toBeTruthy()
      expect(post.image).toMatch(/^\/images\/past-post\.(jpg|jpeg|png|webp)$/)
    }
  })

  it('includes custom image path from frontmatter', () => {
    const post = getPostBySlug('post-with-image')

    if (post) {
      expect(post.image).toBe('/images/custom-post-image.jpg')
    }
  })
})

describe('findPostImage', () => {
  it('returns image path for given slug when no frontmatter image', () => {
    const imagePath = findPostImage('test-post')
    expect(imagePath).toBeTruthy()
    expect(imagePath).toMatch(/^\/images\/test-post\.(jpg|jpeg|png|webp)$/)
  })

  it('returns image path for slug with special characters', () => {
    const imagePath = findPostImage('2025-05-26-shopify-ai-chat')
    expect(imagePath).toBeTruthy()
    expect(imagePath).toMatch(/^\/images\/2025-05-26-shopify-ai-chat\.(jpg|jpeg|png|webp)$/)
  })

  it('returns frontmatter image when provided', () => {
    const imagePath = findPostImage('test-post', 'custom-image.png')
    expect(imagePath).toBe('/images/custom-image.png')
  })

  it('returns frontmatter image with full path as-is', () => {
    const imagePath = findPostImage('test-post', '/custom/path/image.webp')
    expect(imagePath).toBe('/custom/path/image.webp')
  })

  it('handles undefined frontmatter image', () => {
    const imagePath = findPostImage('test-post', undefined)
    expect(imagePath).toBeTruthy()
    expect(imagePath).toMatch(/^\/images\/test-post\.(jpg|jpeg|png|webp)$/)
  })
})

describe('findPostImages', () => {
  it('returns all image sizes for a slug', () => {
    const images = findPostImages('test-post')
    
    expect(images.default).toBeTruthy()
    expect(images.og).toBeTruthy()
    expect(images.twitter).toBeTruthy()
    expect(images.small).toBeTruthy()
    
    // Should follow the naming convention
    expect(images.default).toMatch(/^\/images\/test-post\.(jpg|jpeg|png|webp)$/)
    expect(images.og).toMatch(/^\/images\/test-post-og\.(jpg|jpeg|png|webp)$/)
    expect(images.twitter).toMatch(/^\/images\/test-post-twitter\.(jpg|jpeg|png|webp)$/)
    expect(images.small).toMatch(/^\/images\/test-post-small\.(jpg|jpeg|png|webp)$/)
  })

  it('uses frontmatter image for all sizes when provided', () => {
    const images = findPostImages('test-post', 'custom-image.png')
    
    expect(images.default).toBe('/images/custom-image.png')
    expect(images.og).toBe('/images/custom-image.png')
    expect(images.twitter).toBe('/images/custom-image.png')
    expect(images.small).toBe('/images/custom-image.png')
  })

  it('preserves full path for frontmatter images', () => {
    const images = findPostImages('test-post', '/custom/path/image.webp')
    
    expect(images.default).toBe('/custom/path/image.webp')
    expect(images.og).toBe('/custom/path/image.webp')
    expect(images.twitter).toBe('/custom/path/image.webp')
    expect(images.small).toBe('/custom/path/image.webp')
  })
})
