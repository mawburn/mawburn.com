import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import BlogPost, { loader, meta } from '~/routes/blog.post'
import type { BlogPost as BlogPostType } from '~/utils/blogTypes'

const mockPost: BlogPostType = {
  slug: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-01',
  excerpt: 'This is a test post excerpt',
  tags: ['react', 'testing'],
  readTime: 5,
  content: '<p>This is the blog post content</p>',
}

vi.mock('~/utils/blog', () => ({
  getPostBySlug: vi.fn((slug: string) => {
    if (slug === 'test-post') return mockPost
    return null
  }),
}))

vi.mock('~/utils/cache', () => ({
  createCachedResponse: vi.fn(data => data),
  cacheConfigs: {
    blogPost: { maxAge: 7200 },
  },
}))

vi.mock('~/components/Footer', () => ({
  Footer: ({ maxWidth }: { maxWidth?: string }) => (
    <footer data-testid="blog-footer" data-max-width={maxWidth}>
      Blog Footer
    </footer>
  ),
}))

vi.mock('react-router', () => ({
  Link: ({ to, children, className, ...props }: any) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  ),
  createRoutesStub: (
    routes: Array<{
      path: string
      Component: React.ComponentType<any>
      loader?: () => any
    }>
  ) => {
    return () => {
      const route = routes[0]
      const loaderData = route.loader ? route.loader() : {}
      const RouteComponent = route.Component as any
      return <RouteComponent loaderData={loaderData} params={{}} matches={[]} />
    }
  },
}))

import { createRoutesStub } from 'react-router'

describe('BlogPost Route', () => {
  describe('SEO metadata', () => {
    it('generates complete SEO metadata for existing post', () => {
      const result = meta({ params: { slug: 'test-post' } } as any)

      const titleMeta = result.find((meta: any) => meta.title)
      const descriptionMeta = result.find((meta: any) => meta.name === 'description')
      const keywordsMeta = result.find((meta: any) => meta.name === 'keywords')
      const ogTypeMeta = result.find((meta: any) => meta.property === 'og:type')
      const twitterCardMeta = result.find((meta: any) => meta.name === 'twitter:card')
      const readingTimeMeta = result.find((meta: any) => meta.name === 'reading_time')

      expect(titleMeta?.title).toBe('Test Blog Post | Matt Burnett')
      expect(descriptionMeta?.content).toBe('This is a test post excerpt')
      expect(keywordsMeta?.content).toBe('react, testing')
      expect(ogTypeMeta?.content).toBe('article')
      expect(twitterCardMeta?.content).toBe('summary')
      expect(readingTimeMeta?.content).toBe('5 min read')

      expect(result.length).toBeGreaterThan(10)
    })

    it('returns not found metadata for non-existing post', () => {
      const result = meta({ params: { slug: 'non-existing' } } as any)

      expect(result).toHaveLength(1)
      expect(result[0]).toHaveProperty('title', 'Post Not Found | Matt Burnett')
    })
  })

  describe('loader function', () => {
    it('should return post data for existing post', () => {
      const result = loader({ params: { slug: 'test-post' } } as any)
      expect(result).toEqual({ post: mockPost })
    })

    it('should throw 404 for non-existing post', () => {
      expect(() => {
        loader({ params: { slug: 'non-existing' } } as any)
      }).toThrow()
    })
  })

  describe('BlogPost Component', () => {
    it('should render blog post correctly', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog/:slug',
          Component: BlogPost as any,
          loader: () => ({ post: mockPost }),
        },
      ])

      render(<Stub />)

      expect(screen.getByText('Back to Blog')).toBeInTheDocument()
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
      expect(screen.getByText('This is the blog post content')).toBeInTheDocument()
      expect(screen.getByText('react, testing')).toBeInTheDocument()
      expect(screen.getByText('5 min read')).toBeInTheDocument()
      expect(screen.getByTestId('blog-footer')).toBeInTheDocument()
      expect(screen.getByTestId('blog-footer')).toHaveAttribute('data-max-width', 'max-w-3xl')
    })

    it('should display formatted date and navigation', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog/:slug',
          Component: BlogPost as any,
          loader: () => ({ post: mockPost }),
        },
      ])

      render(<Stub />)

      // Check date format
      expect(screen.getByText(/\w+ \d{1,2}, \d{4}/)).toBeInTheDocument()

      // Check back link
      const backLink = screen.getByText('Back to Blog')
      expect(backLink.closest('a')).toHaveAttribute('href', '/blog')
    })
  })
})
