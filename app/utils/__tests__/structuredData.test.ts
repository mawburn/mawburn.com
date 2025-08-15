import { describe, expect, it } from 'vitest'

import type { BlogPost } from '../blogTypes'
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
  generatePersonStructuredData,
  generateWebSiteStructuredData,
} from '../structuredData'

describe('structuredData', () => {
  describe('generateArticleStructuredData', () => {
    const basePost: BlogPost = {
      slug: 'test-post',
      title: 'Test Blog Post',
      date: '2024-01-15',
      excerpt: 'This is a test blog post excerpt',
      tags: ['javascript', 'react', 'testing'],
      content: 'Full blog post content here',
      readTime: 5,
    }

    it('generates correct structured data for blog post with all image types', () => {
      const post: BlogPost = {
        ...basePost,
        images: {
          default: '/images/test.webp',
          og: '/images/test-og.webp',
          twitter: '/images/test-twitter.webp',
        },
      }
      const url = 'https://mawburn.com/blog/test-post'

      const result = generateArticleStructuredData(post, url)

      expect(result['@context']).toBe('https://schema.org')
      expect(result['@type']).toBe('BlogPosting')
      expect(result.headline).toBe('Test Blog Post')
      expect(result.description).toBe('This is a test blog post excerpt')
      expect(result.image).toEqual([
        'https://mawburn.com/images/test.webp',
        'https://mawburn.com/images/test-og.webp',
        'https://mawburn.com/images/test-twitter.webp',
      ])
      expect(result.datePublished).toBe('2024-01-15T00:00:00.000Z')
      expect(result.dateModified).toBe('2024-01-15T00:00:00.000Z')
      expect(result.author).toEqual({
        '@type': 'Person',
        name: 'Matt Burnett',
        url: 'https://mawburn.com',
      })
      expect(result.publisher).toEqual({
        '@type': 'Person',
        name: 'Matt Burnett',
      })
      expect(result.mainEntityOfPage).toEqual({
        '@type': 'WebPage',
        '@id': url,
      })
      expect(result.keywords).toBe('javascript, react, testing')
    })

    it('generates correct structured data with single default image', () => {
      const post: BlogPost = {
        ...basePost,
        images: {
          default: '/images/single.webp',
        },
      }
      const url = 'https://mawburn.com/blog/test-post'

      const result = generateArticleStructuredData(post, url)

      expect(result.image).toBe('https://mawburn.com/images/single.webp')
    })

    it('handles missing images gracefully', () => {
      const post: BlogPost = {
        ...basePost,
      }
      const url = 'https://mawburn.com/blog/test-post'

      const result = generateArticleStructuredData(post, url)

      expect(result.image).toBeUndefined()
    })

    describe('Edge cases', () => {
      it('handles empty tags array', () => {
        const post: BlogPost = {
          ...basePost,
          tags: [],
        }
        const url = 'https://mawburn.com/blog/test-post'

        const result = generateArticleStructuredData(post, url)

        expect(result.keywords).toBe('')
      })

      it('throws error for invalid date', () => {
        const post: BlogPost = {
          ...basePost,
          date: 'invalid-date',
        }
        const url = 'https://mawburn.com/blog/test-post'

        expect(() => generateArticleStructuredData(post, url)).toThrow('Invalid time value')
      })

      it('handles partial image objects', () => {
        const post: BlogPost = {
          ...basePost,
          images: {
            og: '/images/og-only.webp',
          },
        }
        const url = 'https://mawburn.com/blog/test-post'

        const result = generateArticleStructuredData(post, url)

        expect(result.image).toBe('https://mawburn.com/images/og-only.webp')
      })

      it('handles special characters in title and excerpt', () => {
        const post: BlogPost = {
          ...basePost,
          title: 'Test & Blog "Post" <with> Special\'s',
          excerpt: 'Excerpt with "quotes" & <tags>',
        }
        const url = 'https://mawburn.com/blog/test-post'

        const result = generateArticleStructuredData(post, url)

        expect(result.headline).toBe('Test & Blog "Post" <with> Special\'s')
        expect(result.description).toBe('Excerpt with "quotes" & <tags>')
      })

      it('handles very long URLs', () => {
        const post: BlogPost = {
          ...basePost,
        }
        const longUrl = 'https://mawburn.com/blog/' + 'a'.repeat(500)

        const result = generateArticleStructuredData(post, longUrl)

        expect(result.mainEntityOfPage?.['@id']).toBe(longUrl)
      })
    })
  })

  describe('generateWebSiteStructuredData', () => {
    it('generates correct website structured data', () => {
      const result = generateWebSiteStructuredData()

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Matt Burnett',
        url: 'https://mawburn.com',
        description:
          'Matt Burnett - Software Engineer - Building high-performance web applications with modern tech.',
        author: {
          '@type': 'Person',
          name: 'Matt Burnett',
        },
      })
    })
  })

  describe('generateBreadcrumbStructuredData', () => {
    it('generates breadcrumb list with single item', () => {
      const items = [{ name: 'Home', url: 'https://mawburn.com' }]

      const result = generateBreadcrumbStructuredData(items)

      expect(result['@context']).toBe('https://schema.org')
      expect(result['@type']).toBe('BreadcrumbList')
      expect(result.itemListElement).toHaveLength(1)
      expect(result.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mawburn.com',
      })
    })

    it('generates breadcrumb list with multiple items', () => {
      const items = [
        { name: 'Home', url: 'https://mawburn.com' },
        { name: 'Blog', url: 'https://mawburn.com/blog' },
        { name: 'Test Post' },
      ]

      const result = generateBreadcrumbStructuredData(items)

      expect(result.itemListElement).toHaveLength(3)
      expect(result.itemListElement[0].position).toBe(1)
      expect(result.itemListElement[1].position).toBe(2)
      expect(result.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Test Post',
        item: undefined,
      })
    })

    describe('Edge cases', () => {
      it('handles empty items array', () => {
        const result = generateBreadcrumbStructuredData([])

        expect(result.itemListElement).toEqual([])
      })

      it('handles items with special characters', () => {
        const items = [
          { name: 'Home & Garden', url: 'https://mawburn.com/home' },
          { name: 'Blog "Posts"', url: 'https://mawburn.com/blog' },
        ]

        const result = generateBreadcrumbStructuredData(items)

        expect(result.itemListElement[0].name).toBe('Home & Garden')
        expect(result.itemListElement[1].name).toBe('Blog "Posts"')
      })

      it('handles items without URL correctly', () => {
        const items = [{ name: 'Home', url: 'https://mawburn.com' }, { name: 'Current Page' }]

        const result = generateBreadcrumbStructuredData(items)

        expect(result.itemListElement[0].item).toBe('https://mawburn.com')
        expect(result.itemListElement[1].item).toBeUndefined()
      })
    })
  })

  describe('generatePersonStructuredData', () => {
    it('generates correct person structured data', () => {
      const result = generatePersonStructuredData()

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Matt Burnett',
        url: 'https://mawburn.com',
        sameAs: [
          'https://github.com/mawburn',
          'https://twitter.com/mawburn_',
          'https://www.linkedin.com/in/mawburn',
        ],
        jobTitle: 'Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Shopify',
        },
      })
    })
  })
})
