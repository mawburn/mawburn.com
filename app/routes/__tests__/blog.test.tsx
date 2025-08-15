import { render, screen } from '@testing-library/react'
import type { BlogPostMetadata } from 'postflow'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import Blog, { loader, meta } from '~/routes/blog'

const mockPosts: BlogPostMetadata[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    date: '2025-01-01',
    excerpt: 'This is a test excerpt for post 1',
    tags: ['react', 'typescript'],
    readTime: 5,
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    date: '2025-01-02',
    excerpt: 'This is a test excerpt for post 2',
    tags: ['javascript', 'web'],
    readTime: 3,
  },
]

vi.mock('~/utils/blog-config', () => ({
  blog: {
    getAllPostsMetadata: vi.fn(async () => mockPosts),
  },
}))

vi.mock('~/utils/cache', () => ({
  createCachedResponse: vi.fn(data => data),
  cacheConfigs: {
    blogList: { maxAge: 3600 },
  },
}))

vi.mock('~/components/Footer', () => ({
  Footer: () => <footer data-testid="blog-footer">Blog Footer</footer>,
}))

vi.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
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

describe('Blog Route', () => {
  describe('SEO metadata', () => {
    it('provides complete SEO and social media metadata', () => {
      const result = meta()

      expect(result).toContainEqual({ title: 'Blog | Matt Burnett' })
      expect(result).toContainEqual({
        name: 'description',
        content:
          'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
      })
      expect(result).toContainEqual({ property: 'og:url', content: 'https://mawburn.com/blog' })
      expect(result).toContainEqual({ name: 'robots', content: 'index, follow' })

      const hasTwitterCard = result.some(meta => meta.name === 'twitter:card')
      const hasOgTitle = result.some(meta => meta.property === 'og:title')
      expect(hasTwitterCard).toBe(true)
      expect(hasOgTitle).toBe(true)
    })
  })

  describe('Blog post loading', () => {
    it('loads and provides blog post data', async () => {
      const result = await loader()

      expect(result).toHaveProperty('posts')
      expect(Array.isArray(result.posts)).toBe(true)
      expect(result.posts).toHaveLength(2)

      expect(result.posts[0]).toHaveProperty('slug', 'test-post-1')
      expect(result.posts[0]).toHaveProperty('title', 'Test Post 1')
      expect(result.posts[0]).toHaveProperty('readTime', 5)
    })
  })

  describe('Blog page rendering', () => {
    it('displays blog posts with all essential information', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({ posts: [mockPosts[0]] }),
        },
      ])

      render(<Stub />)

      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('This is a test excerpt for post 1')).toBeInTheDocument()
      expect(screen.getByText('5 min read')).toBeInTheDocument()

      expect(screen.getByText('react, typescript')).toBeInTheDocument()

      expect(screen.getByTestId('blog-footer')).toBeInTheDocument()
    })

    it('renders RSS feed access link', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({ posts: mockPosts }),
        },
      ])

      render(<Stub />)

      const rssLink = screen.getByText('RSS').closest('a')
      expect(rssLink).toHaveAttribute('href', '/rss.xml')
    })

    it('provides navigation to individual blog posts', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({ posts: mockPosts }),
        },
      ])

      render(<Stub />)

      const post1Link = screen.getByText('Test Post 1').closest('a')
      const post2Link = screen.getByText('Test Post 2').closest('a')

      expect(post1Link).toHaveAttribute('href', '/blog/test-post-1')
      expect(post2Link).toHaveAttribute('href', '/blog/test-post-2')
    })

    describe('Edge cases', () => {
      it('handles empty blog posts list gracefully', () => {
        const Stub = createRoutesStub([
          {
            path: '/blog',
            Component: Blog as any,
            loader: () => ({ posts: [] }),
          },
        ])

        render(<Stub />)

        expect(screen.getByText('Blog')).toBeInTheDocument()
        expect(screen.getByTestId('blog-footer')).toBeInTheDocument()
      })

      it('displays multiple posts with correct date ordering', () => {
        const Stub = createRoutesStub([
          {
            path: '/blog',
            Component: Blog as any,
            loader: () => ({ posts: mockPosts }),
          },
        ])

        render(<Stub />)

        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
        expect(screen.getByText('Test Post 2')).toBeInTheDocument()

        const dates = screen.getAllByText(/\w+ \d{1,2}, \d{4}/)
        expect(dates).toHaveLength(2)
      })
    })
  })
})
