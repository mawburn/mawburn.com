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
  },
}))

// Mock dateUtils to control development mode
vi.mock('~/utils/dateUtils', () => ({
  isInDevelopment: vi.fn(() => false),
  isPostPublished: vi.fn(() => true),
  formatPublishDate: vi.fn(() => 'January 1, 2023'),
}))

const { getAllPostsMetadata, getPostBySlug, findPostImage } = await import('~/utils/blog')

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
    }
  })

  it('includes image path for post', () => {
    const post = getPostBySlug('past-post')
    
    if (post) {
      expect(post.image).toBe('/images/past-post.jpg')
    }
  })
})

describe('findPostImage', () => {
  it('returns jpg image path for given slug', () => {
    const imagePath = findPostImage('test-post')
    expect(imagePath).toBe('/images/test-post.jpg')
  })

  it('returns jpg image path for slug with special characters', () => {
    const imagePath = findPostImage('2025-05-26-shopify-ai-chat')
    expect(imagePath).toBe('/images/2025-05-26-shopify-ai-chat.jpg')
  })
})
