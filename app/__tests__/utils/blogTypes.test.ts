import type { BlogPost, BlogPostMetadata } from '~/utils/blogTypes'
import { describe, expect, it } from 'vitest'

describe('BlogPost type', () => {
  it('accepts valid BlogPost objects', () => {
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
  })

  it('requires all fields in BlogPost', () => {
    // This test ensures all required fields are present
    const blogPost: BlogPost = {
      slug: 'required-field',
      title: 'Required Field',
      date: '2024-01-15',
      excerpt: 'Required excerpt',
      tags: [],
      content: 'Required content',
      readTime: 1,
    }

    // Verify all properties exist
    expect(typeof blogPost.slug).toBe('string')
    expect(typeof blogPost.title).toBe('string')
    expect(typeof blogPost.date).toBe('string')
    expect(typeof blogPost.excerpt).toBe('string')
    expect(Array.isArray(blogPost.tags)).toBe(true)
    expect(typeof blogPost.content).toBe('string')
    expect(typeof blogPost.readTime).toBe('number')
  })

  it('allows empty arrays for tags', () => {
    const blogPost: BlogPost = {
      slug: 'no-tags',
      title: 'Post Without Tags',
      date: '2024-01-15',
      excerpt: 'No tags post',
      tags: [],
      content: 'Content without tags',
      readTime: 2,
    }

    expect(blogPost.tags).toEqual([])
  })

  it('allows multiple tags', () => {
    const blogPost: BlogPost = {
      slug: 'multi-tags',
      title: 'Post With Multiple Tags',
      date: '2024-01-15',
      excerpt: 'Multi tag post',
      tags: ['javascript', 'react', 'typescript', 'web-development'],
      content: 'Content with multiple tags',
      readTime: 3,
    }

    expect(blogPost.tags).toHaveLength(4)
    expect(blogPost.tags).toContain('javascript')
    expect(blogPost.tags).toContain('typescript')
  })
})

describe('BlogPostMetadata type', () => {
  it('accepts valid BlogPostMetadata objects', () => {
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
  })

  it('requires all fields in BlogPostMetadata', () => {
    const metadata: BlogPostMetadata = {
      slug: 'required-metadata',
      title: 'Required Metadata',
      date: '2024-01-15',
      excerpt: 'Required metadata excerpt',
      tags: ['required'],
      readTime: 1,
    }

    // Verify all properties exist and have correct types
    expect(typeof metadata.slug).toBe('string')
    expect(typeof metadata.title).toBe('string')
    expect(typeof metadata.date).toBe('string')
    expect(typeof metadata.excerpt).toBe('string')
    expect(Array.isArray(metadata.tags)).toBe(true)
    expect(typeof metadata.readTime).toBe('number')
  })

  it('does not include content field', () => {
    const metadata: BlogPostMetadata = {
      slug: 'no-content',
      title: 'No Content Field',
      date: '2024-01-15',
      excerpt: 'Metadata without content',
      tags: [],
      readTime: 1,
    }

    // TypeScript should prevent adding content field
    expect('content' in metadata).toBe(false)
  })

  it('is compatible with BlogPost for common fields', () => {
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

  it('allows empty tags array', () => {
    const metadata: BlogPostMetadata = {
      slug: 'empty-tags',
      title: 'Empty Tags',
      date: '2024-01-15',
      excerpt: 'No tags metadata',
      tags: [],
      readTime: 1,
    }

    expect(metadata.tags).toEqual([])
    expect(Array.isArray(metadata.tags)).toBe(true)
  })
})
