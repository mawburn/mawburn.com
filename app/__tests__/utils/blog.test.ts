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

const { getAllPostsMetadata, getPostBySlug, findPostImage, findPostImages } = await import(
  '~/utils/blog'
)

describe('getAllPostsMetadata', () => {
  it('returns array of posts with required metadata fields', () => {
    const posts = getAllPostsMetadata()

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThanOrEqual(0)

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

  it('returns post with all required fields and handles images correctly', () => {
    // Post without frontmatter image
    const postNoImage = getPostBySlug('past-post')
    if (postNoImage) {
      expect(postNoImage).toHaveProperty('slug')
      expect(postNoImage).toHaveProperty('title')
      expect(postNoImage).toHaveProperty('date')
      expect(postNoImage).toHaveProperty('excerpt')
      expect(postNoImage).toHaveProperty('tags')
      expect(postNoImage).toHaveProperty('content')
      expect(postNoImage).toHaveProperty('readTime')
      expect(postNoImage).toHaveProperty('image')
      expect(postNoImage).toHaveProperty('images')
      expect(postNoImage.image).toMatch(/^\/images\/past-post\.(jpg|jpeg|png|webp)$/)
    }

    // Post with custom frontmatter image
    const postWithImage = getPostBySlug('post-with-image')
    if (postWithImage) {
      expect(postWithImage.image).toBe('/images/custom-post-image.jpg')
    }
  })
})

describe('findPostImage', () => {
  it('returns correct image path based on slug and frontmatter', () => {
    // Default image path when no frontmatter
    expect(findPostImage('test-post')).toMatch(/^\/images\/test-post\.(jpg|jpeg|png|webp)$/)
    expect(findPostImage('test-post', undefined)).toMatch(
      /^\/images\/test-post\.(jpg|jpeg|png|webp)$/
    )

    // Special characters in slug
    expect(findPostImage('2025-05-26-shopify-ai-chat')).toMatch(
      /^\/images\/2025-05-26-shopify-ai-chat\.(jpg|jpeg|png|webp)$/
    )

    // Frontmatter image (relative path)
    expect(findPostImage('test-post', 'custom-image.png')).toBe('/images/custom-image.png')

    // Frontmatter image (absolute path)
    expect(findPostImage('test-post', '/custom/path/image.webp')).toBe('/custom/path/image.webp')
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
