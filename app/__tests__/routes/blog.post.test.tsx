import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
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
  describe('meta function', () => {
    it('should return correct meta tags for existing post', () => {
      const result = meta({ params: { slug: 'test-post' } } as any)

      expect(result).toEqual([
        { title: 'Test Blog Post | Matt Burnett' },
        { name: 'description', content: 'This is a test post excerpt' },
        { name: 'keywords', content: 'react, testing' },
        { name: 'author', content: 'mawburn' },
        { name: 'robots', content: 'index, follow' },
        { name: 'article:author', content: 'mawburn' },
        { name: 'article:published_time', content: new Date('2025-01-01').toISOString() },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: 'Test Blog Post' },
        { property: 'og:description', content: 'This is a test post excerpt' },
        { property: 'og:url', content: 'https://mawburn.com/blog/test-post' },
        { property: 'og:site_name', content: 'mawburn.com' },
        { property: 'og:article:author', content: 'mawburn' },
        { property: 'og:article:published_time', content: new Date('2025-01-01').toISOString() },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Test Blog Post' },
        { name: 'twitter:description', content: 'This is a test post excerpt' },
        { name: 'reading_time', content: '5 min read' },
        { property: 'og:article:tag', content: 'react' },
        { property: 'og:article:tag', content: 'testing' },
      ])
    })

    it('should return not found meta for non-existing post', () => {
      const result = meta({ params: { slug: 'non-existing' } } as any)
      expect(result).toEqual([{ title: 'Post Not Found | Matt Burnett' }])
    })
  })

  describe('loader function', () => {
    it('should return post data for existing post', async () => {
      const result = loader({ params: { slug: 'test-post' } } as any)
      expect(result).toBeInstanceOf(Response)
      const data = await result.json()
      expect(data).toEqual({ post: mockPost })
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
      expect(screen.getByText('react')).toBeInTheDocument()
      expect(screen.getByText('testing')).toBeInTheDocument()
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
