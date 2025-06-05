import {
  getCacheKey,
  getCachedResponse,
  setCachedResponse,
  createCacheableResponse,
} from '~/utils/cloudflareCache'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'

// Mock the global caches API
const mockCache = {
  match: vi.fn(),
  put: vi.fn(),
}

const mockCaches = {
  default: mockCache,
}

describe('getCacheKey', () => {
  it('returns correct cache key for various URL patterns', () => {
    // With search params
    expect(getCacheKey(new Request('https://example.com/blog/test-post?foo=bar'))).toBe(
      '/blog/test-post?foo=bar'
    )

    // Without search params
    expect(getCacheKey(new Request('https://example.com/blog'))).toBe('/blog')

    // Root path
    expect(getCacheKey(new Request('https://example.com/'))).toBe('/')

    // Multiple search params
    expect(getCacheKey(new Request('https://example.com/search?q=test&page=2&sort=date'))).toBe(
      '/search?q=test&page=2&sort=date'
    )
  })
})

describe('getCachedResponse', () => {
  beforeEach(() => {
    vi.stubGlobal('caches', mockCaches)
    mockCache.match.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('handles various cache scenarios', async () => {
    const request = new Request('https://example.com/test')

    // Returns cached response when available
    const expectedResponse = new Response('cached content')
    mockCache.match.mockResolvedValue(expectedResponse)
    expect(await getCachedResponse(request)).toBe(expectedResponse)
    expect(mockCache.match).toHaveBeenCalledWith('/test')

    // Returns undefined when no cached response
    mockCache.match.mockResolvedValue(undefined)
    expect(await getCachedResponse(request)).toBeUndefined()
  })

  it('returns undefined when caches API is unavailable', async () => {
    const request = new Request('https://example.com/test')

    // No caches API
    vi.stubGlobal('caches', undefined)
    expect(await getCachedResponse(request)).toBeUndefined()

    // No caches.default
    vi.stubGlobal('caches', {})
    expect(await getCachedResponse(request)).toBeUndefined()
  })
})

describe('setCachedResponse', () => {
  beforeEach(() => {
    vi.stubGlobal('caches', mockCaches)
    mockCache.put.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('caches response with correct headers and max age', async () => {
    const request = new Request('https://example.com/test')
    const response = new Response('test content', {
      headers: { 'Content-Type': 'text/plain' },
    })

    // Default max age
    await setCachedResponse(request, response)
    expect(mockCache.put).toHaveBeenCalledWith('/test', expect.any(Response))
    let [, cachedResponse] = mockCache.put.mock.calls[0]
    expect(cachedResponse.headers.get('Cache-Control')).toBe('public, max-age=86400')
    expect(cachedResponse.headers.get('CF-Cache-Status')).toBe('MISS')

    // Custom max age
    mockCache.put.mockClear()
    await setCachedResponse(request, response, { maxAge: 3600 })
    const [, cachedResponse2] = mockCache.put.mock.calls[0]
    expect(cachedResponse2.headers.get('Cache-Control')).toBe('public, max-age=3600')
  })

  it('does nothing when caches API is unavailable', async () => {
    const request = new Request('https://example.com/test')
    const response = new Response('test content')

    // No caches API
    vi.stubGlobal('caches', undefined)
    await setCachedResponse(request, response)
    expect(mockCache.put).not.toHaveBeenCalled()

    // Reset and test no caches.default
    mockCache.put.mockClear()
    vi.stubGlobal('caches', {})
    await setCachedResponse(request, response)
    expect(mockCache.put).not.toHaveBeenCalled()
  })
})

describe('createCacheableResponse', () => {
  it('creates cacheable response with various data and settings', async () => {
    // Default settings
    const data = { message: 'Hello, World!' }
    const response = createCacheableResponse(data)

    expect(response).toBeInstanceOf(Response)
    expect(await response.json()).toEqual(data)
    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    )
    expect(response.headers.get('CDN-Cache-Control')).toBe('max-age=86400')
    expect(response.headers.get('CF-Cache-Status')).toBe('MISS')

    // Custom settings
    const customResponse = createCacheableResponse(
      { posts: [] },
      {
        maxAge: 43200,
        browserMaxAge: 1800,
        staleWhileRevalidate: 86400,
      }
    )
    expect(customResponse.headers.get('Cache-Control')).toBe(
      'public, max-age=1800, s-maxage=43200, stale-while-revalidate=86400'
    )

    // Handles null data
    const nullResponse = createCacheableResponse(null)
    expect(await nullResponse.json()).toBeNull()
  })
})
