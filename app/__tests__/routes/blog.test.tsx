import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import Blog, { loader, meta } from '~/routes/blog'
import type { BlogPostMetadata } from '~/utils/blogTypes'

vi.mock('~/utils/blog', () => ({
  getAllPostsMetadata: vi.fn(
    () =>
      [
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
      ] as BlogPostMetadata[]
  ),
}))

vi.mock('~/utils/cache', () => ({
  createCachedResponse: vi.fn(data => data),
  cacheConfigs: {
    blogList: { maxAge: 3600 },
  },
}))

vi.mock('~/components/BlogFooter', () => ({
  BlogFooter: () => <footer data-testid="blog-footer">Blog Footer</footer>,
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

describe('Blog Route', () => {
  describe('meta function', () => {
    it('should return correct meta tags', () => {
      const result = meta({} as any)
      expect(result).toEqual([
        { title: 'Blog | Matt Burnett' },
        {
          name: 'description',
          content:
            'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
        },
        {
          name: 'keywords',
          content:
            'Software Engineering, Web Development, React, TypeScript, JavaScript, Frontend Development, Full Stack, Tabletop Gaming, Programming Blog, Tech Blog',
        },
        { name: 'author', content: 'mawburn' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Blog | Matt Burnett' },
        {
          property: 'og:description',
          content:
            'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
        },
        { property: 'og:url', content: 'https://mawburn.com/blog' },
        { property: 'og:site_name', content: 'mawburn.com' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Blog | Matt Burnett' },
        {
          name: 'twitter:description',
          content:
            'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
        },
        { name: 'canonical', content: 'https://mawburn.com/blog' },
      ])
    })
  })

  describe('loader function', () => {
    it('should return posts data with cache config', () => {
      const result = loader()
      expect(result).toEqual({
        posts: [
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
        ],
      })
    })
  })

  describe('Blog Component', () => {
    it('should render blog listing page correctly', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: [
              {
                slug: 'test-post-1',
                title: 'Test Post 1',
                date: '2025-01-01',
                excerpt: 'This is a test excerpt for post 1',
                tags: ['react', 'typescript'],
                readTime: 5,
              },
            ],
          }),
        },
      ])

      render(<Stub />)

      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('This is a test excerpt for post 1')).toBeInTheDocument()
      expect(screen.getByText('react')).toBeInTheDocument()
      expect(screen.getByText('typescript')).toBeInTheDocument()
      expect(screen.getByText('5 min read')).toBeInTheDocument()
      expect(screen.getByTestId('blog-footer')).toBeInTheDocument()
    })

    it('should render multiple blog posts', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: [
              {
                slug: 'test-post-1',
                title: 'Test Post 1',
                date: '2025-01-01',
                excerpt: 'This is a test excerpt for post 1',
                tags: ['react'],
                readTime: 5,
              },
              {
                slug: 'test-post-2',
                title: 'Test Post 2',
                date: '2025-01-02',
                excerpt: 'This is a test excerpt for post 2',
                tags: ['javascript'],
                readTime: 3,
              },
            ],
          }),
        },
      ])

      render(<Stub />)

      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      // Multiple dates should be present
      const dates = screen.getAllByText(/\w+ \d{1,2}, \d{4}/)
      expect(dates).toHaveLength(2)
    })
  })
})
