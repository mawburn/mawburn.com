import { describe, expect, it } from 'vitest'

import { cacheHeaders, cachePolicies, preventErrorCaching, routeCacheHeaders } from '~/utils/cache'

describe('cacheHeaders', () => {
  it('sets separate browser and Cloudflare TTLs with stale revalidation', () => {
    expect(cacheHeaders(cachePolicies.blogPost, 'Accept-Encoding')).toEqual({
      'Cache-Control': 'public, max-age=7200, s-maxage=604800, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=604800',
      'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
      Vary: 'Accept-Encoding',
    })
  })

  it('omits stale revalidation and Vary when not requested', () => {
    expect(cacheHeaders(cachePolicies.page)).toEqual({
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'CDN-Cache-Control': 'max-age=3600',
      'Cloudflare-CDN-Cache-Control': 'max-age=3600',
    })
  })
})

describe('preventErrorCaching', () => {
  it('prevents caching errors without dropping unrelated headers', async () => {
    const response = preventErrorCaching(
      new Response('Not found', {
        status: 404,
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'CDN-Cache-Control': 'max-age=3600',
          'Cloudflare-CDN-Cache-Control': 'max-age=3600',
          'X-Frame-Options': 'DENY',
        },
      })
    )

    expect(response.status).toBe(404)
    expect(await response.text()).toBe('Not found')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.has('CDN-Cache-Control')).toBe(false)
    expect(response.headers.has('Cloudflare-CDN-Cache-Control')).toBe(false)
    expect(response.headers.get('X-Frame-Options')).toBe('DENY')
  })

  it('leaves successful responses unchanged', () => {
    const response = new Response('Public page')
    expect(preventErrorCaching(response)).toBe(response)
  })
})

describe('routeCacheHeaders', () => {
  it('overrides cache policy without losing headers from the root route', () => {
    const parent = new Headers({
      'X-Frame-Options': 'DENY',
      'Cache-Control': 'public, max-age=3600',
    })
    const headers = routeCacheHeaders(parent, cachePolicies.blogList)

    expect(headers.get('X-Frame-Options')).toBe('DENY')
    expect(headers.get('Cache-Control')).toBe(
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    )
    expect(headers.get('Vary')).toBe('Accept-Encoding')
    expect(parent.get('Cache-Control')).toBe('public, max-age=3600')
  })
})
