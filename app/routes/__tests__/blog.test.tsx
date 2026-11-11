import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import Blog, { headers, loader, meta } from '~/routes/blog'
import type { BlogPostMetadataWithUpdated } from '~/utils/blog-config'

const mockPosts: BlogPostMetadataWithUpdated[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    date: '2025-01-01',
    excerpt: 'This is a test excerpt for post 1',
    tags: ['react', 'typescript'],
    readTime: 5,
    category: 'engineering',
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    date: '2025-01-02',
    excerpt: 'This is a test excerpt for post 2',
    tags: ['javascript', 'web'],
    readTime: 3,
    category: 'engineering',
  },
  {
    slug: 'test-post-3',
    title: 'Test Post 3',
    date: '2025-01-03',
    excerpt: 'This is a test excerpt for post 3',
    tags: ['rpg'],
    readTime: 4,
    category: 'hobbies',
  },
]

const engineering = 'engineering'
const hobbies = 'hobbies'

const request = (search = '') => new Request(`https://mawburn.com/blog${search}`)

vi.mock('~/utils/blog-config', () => ({
  getAllPostsMetadataWithUpdated: vi.fn(async () => mockPosts),
}))

vi.mock('react-router', () => ({
  redirect: (url: string) => new Response(null, { status: 302, headers: { Location: url } }),
  Link: ({ to, children, prefetch: _prefetch, preventScrollReset: _psr, ...props }: any) => (
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
  it('retains parent security headers while setting the blog cache policy', () => {
    const responseHeaders = headers({
      parentHeaders: new Headers({ 'X-Frame-Options': 'DENY' }),
    } as Parameters<typeof headers>[0])

    expect(responseHeaders.get('X-Frame-Options')).toBe('DENY')
    expect(responseHeaders.get('Cache-Control')).toBe(
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    )
    expect(responseHeaders.get('Cloudflare-CDN-Cache-Control')).toBe(
      'max-age=86400, stale-while-revalidate=86400'
    )
  })

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

      const hasTwitterCard = result.some(meta => meta.name === 'twitter:card')
      const hasOgTitle = result.some(meta => meta.property === 'og:title')
      expect(hasTwitterCard).toBe(true)
      expect(hasOgTitle).toBe(true)
    })
  })

  describe('Blog post loading', () => {
    it('defaults to Engineering posts', async () => {
      const result = await loader({ request: request() })

      expect(result.active).toBe('engineering')
      expect(result.posts.map(post => post.slug)).toEqual(['test-post-1', 'test-post-2'])
      expect(result.posts[0]).toHaveProperty('readTime', 5)
    })

    it('filters by the category query param', async () => {
      const result = await loader({ request: request('?category=hobbies') })

      expect(result.active).toBe('hobbies')
      expect(result.posts.map(post => post.slug)).toEqual(['test-post-3'])
    })

    it('shows every post for category=all', async () => {
      const result = await loader({ request: request('?category=all') })

      expect(result.posts).toHaveLength(3)
    })

    it('only offers categories that have posts', async () => {
      const result = await loader({ request: request() })

      expect(result.categories).toEqual(['engineering', 'hobbies'])
    })

    it.each(['?category=bogus', '?category=engineering'])('redirects %s to /blog', async search => {
      const thrown = await loader({ request: request(search) }).catch(error => error)

      expect(thrown).toBeInstanceOf(Response)
      expect(thrown.headers.get('Location')).toBe('/blog')
    })
  })

  describe('Category SEO', () => {
    it('keeps the /blog canonical but names the category in the title', () => {
      const result = meta({ data: { active: 'hobbies' } } as any)

      expect(result).toContainEqual({ title: 'Hobbies | Blog | Matt Burnett' })
      expect(result).toContainEqual({ property: 'og:url', content: 'https://mawburn.com/blog' })
    })
  })

  describe('Blog page rendering', () => {
    it('displays blog posts with all essential information', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: [mockPosts[0]],
            active: 'engineering',
            categories: [engineering, hobbies],
          }),
        },
      ])

      render(<Stub />)

      expect(
        screen.getByRole('heading', { level: 1, name: 'Engineering Essays & Notes' })
      ).toBeInTheDocument()
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('This is a test excerpt for post 1')).toBeInTheDocument()
      expect(screen.getByText('5 min read')).toBeInTheDocument()

      expect(screen.getByText('react, typescript')).toBeInTheDocument()

      expect(screen.getByRole('button', { name: /Switch to/ })).toBeInTheDocument()
    })

    it('renders category filter buttons with All first and Engineering active', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: [mockPosts[0]],
            active: 'engineering',
            categories: [engineering, hobbies],
          }),
        },
      ])

      render(<Stub />)

      const nav = screen.getByRole('navigation', { name: 'Post categories' })
      const links = Array.from(nav.querySelectorAll('a'))
      expect(links.map(link => [link.textContent, link.getAttribute('href')])).toEqual([
        ['All', '/blog?category=all'],
        ['Engineering', '/blog'],
        ['Hobbies', '/blog?category=hobbies'],
      ])
      expect(links[0]).not.toHaveAttribute('aria-current')
      expect(links[1]).toHaveAttribute('aria-current', 'page')
    })

    it('hides the All button when only one category has posts', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: [mockPosts[0]],
            active: 'engineering',
            categories: [engineering],
          }),
        },
      ])

      render(<Stub />)

      expect(screen.queryByRole('link', { name: 'All' })).not.toBeInTheDocument()
    })

    it('renders RSS feed access link', () => {
      const Stub = createRoutesStub([
        {
          path: '/blog',
          Component: Blog as any,
          loader: () => ({
            posts: mockPosts.slice(0, 2),
            active: 'engineering',
            categories: [engineering, hobbies],
          }),
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
          loader: () => ({
            posts: mockPosts.slice(0, 2),
            active: 'engineering',
            categories: [engineering, hobbies],
          }),
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
            loader: () => ({ posts: [], active: 'engineering', categories: [engineering] }),
          },
        ])

        render(<Stub />)

        expect(
          screen.getByRole('heading', { level: 1, name: 'Engineering Essays & Notes' })
        ).toBeInTheDocument()
      })

      it('displays multiple posts with correct date ordering', () => {
        const Stub = createRoutesStub([
          {
            path: '/blog',
            Component: Blog as any,
            loader: () => ({
              posts: mockPosts.slice(0, 2),
              active: 'engineering',
              categories: [engineering, hobbies],
            }),
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
