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
  it('returns pathname and search params as cache key', () => {
    const request = new Request('https://example.com/blog/test-post?foo=bar')
    const cacheKey = getCacheKey(request)

    expect(cacheKey).toBe('/blog/test-post?foo=bar')
  })

  it('returns pathname only when no search params', () => {
    const request = new Request('https://example.com/blog')
    const cacheKey = getCacheKey(request)

    expect(cacheKey).toBe('/blog')
  })

  it('handles root path', () => {
    const request = new Request('https://example.com/')
    const cacheKey = getCacheKey(request)

    expect(cacheKey).toBe('/')
  })

  it('includes multiple search parameters', () => {
    const request = new Request('https://example.com/search?q=test&page=2&sort=date')
    const cacheKey = getCacheKey(request)

    expect(cacheKey).toBe('/search?q=test&page=2&sort=date')
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

  it('returns cached response when available', async () => {
    const expectedResponse = new Response('cached content')
    mockCache.match.mockResolvedValue(expectedResponse)

    const request = new Request('https://example.com/test')
    const cachedResponse = await getCachedResponse(request)

    expect(cachedResponse).toBe(expectedResponse)
    expect(mockCache.match).toHaveBeenCalledWith('/test')
  })

  it('returns undefined when no cached response', async () => {
    mockCache.match.mockResolvedValue(undefined)

    const request = new Request('https://example.com/test')
    const cachedResponse = await getCachedResponse(request)

    expect(cachedResponse).toBeUndefined()
  })

  it('returns undefined when caches API is not available', async () => {
    vi.stubGlobal('caches', undefined)

    const request = new Request('https://example.com/test')
    const cachedResponse = await getCachedResponse(request)

    expect(cachedResponse).toBeUndefined()
  })

  it('returns undefined when caches.default is not available', async () => {
    vi.stubGlobal('caches', {})

    const request = new Request('https://example.com/test')
    const cachedResponse = await getCachedResponse(request)

    expect(cachedResponse).toBeUndefined()
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

  it('caches response with default max age', async () => {
    const request = new Request('https://example.com/test')
    const response = new Response('test content', {
      headers: { 'Content-Type': 'text/plain' },
    })

    await setCachedResponse(request, response)

    expect(mockCache.put).toHaveBeenCalledWith('/test', expect.any(Response))

    // Check that the cached response has correct headers
    const [, cachedResponse] = mockCache.put.mock.calls[0]
    expect(cachedResponse.headers.get('Cache-Control')).toBe('public, max-age=86400')
    expect(cachedResponse.headers.get('CF-Cache-Status')).toBe('MISS')
  })

  it('caches response with custom max age', async () => {
    const request = new Request('https://example.com/test')
    const response = new Response('test content')

    await setCachedResponse(request, response, { maxAge: 3600 })

    const [, cachedResponse] = mockCache.put.mock.calls[0]
    expect(cachedResponse.headers.get('Cache-Control')).toBe('public, max-age=3600')
  })

  it('preserves original response headers', async () => {
    const request = new Request('https://example.com/test')
    const response = new Response('test content', {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'test-value',
      },
    })

    await setCachedResponse(request, response)

    const [, cachedResponse] = mockCache.put.mock.calls[0]
    expect(cachedResponse.headers.get('Cache-Control')).toBe('public, max-age=86400')
    expect(cachedResponse.headers.get('CF-Cache-Status')).toBe('MISS')
  })

  it('does nothing when caches API is not available', async () => {
    vi.stubGlobal('caches', undefined)

    const request = new Request('https://example.com/test')
    const response = new Response('test content')

    await setCachedResponse(request, response)

    expect(mockCache.put).not.toHaveBeenCalled()
  })

  it('does nothing when caches.default is not available', async () => {
    vi.stubGlobal('caches', {})

    const request = new Request('https://example.com/test')
    const response = new Response('test content')

    await setCachedResponse(request, response)

    expect(mockCache.put).not.toHaveBeenCalled()
  })
})

describe('createCacheableResponse', () => {
  it('creates response with default cache settings', async () => {
    const data = { message: 'Hello, World!' }
    const response = createCacheableResponse(data)

    expect(response).toBeInstanceOf(Response)

    const json = await response.json()
    expect(json).toEqual(data)

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')

    const cdnCacheControl = response.headers.get('CDN-Cache-Control')
    expect(cdnCacheControl).toBe('max-age=86400')

    const vary = response.headers.get('Vary')
    expect(vary).toBe('Accept-Encoding')

    const cfCacheStatus = response.headers.get('CF-Cache-Status')
    expect(cfCacheStatus).toBe('MISS')
  })

  it('creates response with custom cache settings', async () => {
    const data = { posts: [] }
    const options = {
      maxAge: 43200,
      browserMaxAge: 1800,
      staleWhileRevalidate: 86400,
    }

    const response = createCacheableResponse(data, options)

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=1800, s-maxage=43200, stale-while-revalidate=86400')

    const cdnCacheControl = response.headers.get('CDN-Cache-Control')
    expect(cdnCacheControl).toBe('max-age=43200')
  })

  it('handles complex data objects', async () => {
    const complexData = {
      posts: [
        { id: 1, title: 'Post 1', tags: ['tag1', 'tag2'] },
        { id: 2, title: 'Post 2', tags: ['tag3'] },
      ],
      metadata: {
        total: 2,
        page: 1,
      },
    }

    const response = createCacheableResponse(complexData)
    const json = await response.json()

    expect(json).toEqual(complexData)
  })

  it('allows partial options override', () => {
    const data = { test: true }
    const response = createCacheableResponse(data, { browserMaxAge: 7200 })

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=7200, s-maxage=86400, stale-while-revalidate=604800')
  })

  it('handles null data', async () => {
    const nullResponse = createCacheableResponse(null)
    const nullJson = await nullResponse.json()
    expect(nullJson).toBeNull()
  })
})
