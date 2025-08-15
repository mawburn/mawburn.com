import { describe, expect, it } from 'vitest'

import type { BlogPost, BlogPostMetadata } from '~/utils/blogTypes'

describe('BlogPost type', () => {
  it('accepts valid BlogPost objects with all required fields', () => {
    const validBlogPost: BlogPost = {
      slug: 'test-post',
      title: 'Test Post',
      date: '2024-01-15',
      excerpt: 'Test excerpt',
      tags: ['test', 'blog'],
      content: '<p>Test content</p>',
      readTime: 5,
    }

    // Type checking - if this compiles, the type is correct
    expect(validBlogPost.slug).toBe('test-post')
    expect(validBlogPost.title).toBe('Test Post')
    expect(validBlogPost.date).toBe('2024-01-15')
    expect(validBlogPost.excerpt).toBe('Test excerpt')
    expect(validBlogPost.tags).toEqual(['test', 'blog'])
    expect(validBlogPost.content).toBe('<p>Test content</p>')
    expect(validBlogPost.readTime).toBe(5)

    // Test with empty tags
    const postNoTags: BlogPost = {
      slug: 'no-tags',
      title: 'Post Without Tags',
      date: '2024-01-15',
      excerpt: 'No tags post',
      tags: [],
      content: 'Content without tags',
      readTime: 2,
    }
    expect(postNoTags.tags).toEqual([])
  })
})

describe('BlogPostMetadata type', () => {
  it('accepts valid BlogPostMetadata objects and excludes content', () => {
    const validMetadata: BlogPostMetadata = {
      slug: 'test-metadata',
      title: 'Test Metadata',
      date: '2024-01-15',
      excerpt: 'Test metadata excerpt',
      tags: ['metadata', 'test'],
      readTime: 4,
    }

    expect(validMetadata.slug).toBe('test-metadata')
    expect(validMetadata.title).toBe('Test Metadata')
    expect(validMetadata.date).toBe('2024-01-15')
    expect(validMetadata.excerpt).toBe('Test metadata excerpt')
    expect(validMetadata.tags).toEqual(['metadata', 'test'])
    expect(validMetadata.readTime).toBe(4)
    expect('content' in validMetadata).toBe(false)
  })

  it('is compatible with BlogPost for metadata extraction', () => {
    const blogPost: BlogPost = {
      slug: 'compatible-post',
      title: 'Compatible Post',
      date: '2024-01-15',
      excerpt: 'Compatible excerpt',
      tags: ['compatible'],
      content: 'Post content here',
      readTime: 2,
    }

    // Should be able to extract metadata from a full blog post
    const metadata: BlogPostMetadata = {
      slug: blogPost.slug,
      title: blogPost.title,
      date: blogPost.date,
      excerpt: blogPost.excerpt,
      tags: blogPost.tags,
      readTime: blogPost.readTime,
    }

    expect(metadata.slug).toBe(blogPost.slug)
    expect(metadata.title).toBe(blogPost.title)
    expect(metadata.readTime).toBe(blogPost.readTime)
  })
})
