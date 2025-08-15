import { describe, expect, it } from 'vitest'

import routes from '../routes'

describe('routes', () => {
  it('exports an array of route configurations', () => {
    expect(Array.isArray(routes)).toBe(true)
    expect(routes.length).toBeGreaterThan(0)
  })

  it('includes home route as index', () => {
    const homeRoute = routes.find(route => route.file === 'routes/home.tsx')
    expect(homeRoute).toBeDefined()
    expect(homeRoute?.index).toBe(true)
  })

  it('includes blog route', () => {
    const blogRoute = routes.find(route => route.path === 'blog')
    expect(blogRoute).toBeDefined()
    expect(blogRoute?.file).toBe('routes/blog.tsx')
  })

  it('includes blog post route with slug parameter', () => {
    const blogPostRoute = routes.find(route => route.path === 'blog/:slug')
    expect(blogPostRoute).toBeDefined()
    expect(blogPostRoute?.file).toBe('routes/blog.post.tsx')
  })

  it('includes sitemap.xml route', () => {
    const sitemapRoute = routes.find(route => route.path === 'sitemap.xml')
    expect(sitemapRoute).toBeDefined()
    expect(sitemapRoute?.file).toBe('routes/sitemap[.]xml.tsx')
  })

  it('includes rss.xml route', () => {
    const rssRoute = routes.find(route => route.path === 'rss.xml')
    expect(rssRoute).toBeDefined()
    expect(rssRoute?.file).toBe('routes/rss[.]xml.tsx')
  })

  it('includes Chrome DevTools well-known route', () => {
    const devToolsRoute = routes.find(
      route => route.path === '.well-known/appspecific/com.chrome.devtools.json'
    )
    expect(devToolsRoute).toBeDefined()
    expect(devToolsRoute?.file).toBe(
      'routes/[.well-known].appspecific[.]com.chrome.devtools.json.tsx'
    )
  })

  it('has exactly 6 routes', () => {
    expect(routes).toHaveLength(6)
  })

  describe('Edge cases', () => {
    it('all routes have file property', () => {
      routes.forEach(route => {
        expect(route.file).toBeDefined()
        expect(typeof route.file).toBe('string')
      })
    })

    it('all non-index routes have path property', () => {
      routes.forEach(route => {
        if (!route.index) {
          expect(route.path).toBeDefined()
          expect(typeof route.path).toBe('string')
        }
      })
    })

    it('only one index route exists', () => {
      const indexRoutes = routes.filter(route => route.index === true)
      expect(indexRoutes).toHaveLength(1)
    })

    it('no duplicate paths exist', () => {
      const paths = routes.filter(route => route.path).map(route => route.path)
      const uniquePaths = new Set(paths)
      expect(uniquePaths.size).toBe(paths.length)
    })

    it('all route files use correct extension', () => {
      routes.forEach(route => {
        expect(route.file).toMatch(/\.tsx$/)
      })
    })

    it('all route files start with routes/', () => {
      routes.forEach(route => {
        expect(route.file).toMatch(/^routes\//)
      })
    })
  })
})
