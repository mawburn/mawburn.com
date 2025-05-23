import { createCachedResponse, cacheConfigs } from '~/utils/cache'
import { describe, expect, it } from 'vitest'

describe('createCachedResponse', () => {
  it('creates a response with default cache settings', async () => {
    const data = { message: 'Hello, World!' }
    const response = createCachedResponse(data)

    expect(response).toBeInstanceOf(Response)

    const json = await response.json()
    expect(json).toEqual(data)

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=3600, s-maxage=86400')

    const cdnCacheControl = response.headers.get('CDN-Cache-Control')
    expect(cdnCacheControl).toBe('max-age=86400')

    const vary = response.headers.get('Vary')
    expect(vary).toBe('Accept-Encoding')
  })

  it('creates a response with custom cache settings', async () => {
    const data = { posts: [] }
    const options = {
      browserMaxAge: 1800,
      edgeMaxAge: 43200,
      etag: '"test-etag"',
      vary: 'Accept-Language',
    }

    const response = createCachedResponse(data, options)

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=1800, s-maxage=43200')

    const cdnCacheControl = response.headers.get('CDN-Cache-Control')
    expect(cdnCacheControl).toBe('max-age=43200')

    const etag = response.headers.get('ETag')
    expect(etag).toBe('"test-etag"')

    const vary = response.headers.get('Vary')
    expect(vary).toBe('Accept-Language')
  })

  it('creates a response without ETag when not provided', () => {
    const data = { test: true }
    const response = createCachedResponse(data)

    const etag = response.headers.get('ETag')
    expect(etag).toBeNull()
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

    const response = createCachedResponse(complexData)
    const json = await response.json()

    expect(json).toEqual(complexData)
  })

  it('handles null data', async () => {
    const nullResponse = createCachedResponse(null)
    const nullJson = await nullResponse.json()
    expect(nullJson).toBeNull()
  })

  it('handles empty object', async () => {
    const response = createCachedResponse({})
    const json = await response.json()
    expect(json).toEqual({})
  })

  it('allows partial options override', () => {
    const data = { test: true }
    const response = createCachedResponse(data, { browserMaxAge: 7200 })

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=7200, s-maxage=86400')

    // Should still have defaults for other options
    const vary = response.headers.get('Vary')
    expect(vary).toBe('Accept-Encoding')
  })
})

describe('cacheConfigs', () => {
  it('has correct blogList configuration', () => {
    expect(cacheConfigs.blogList).toEqual({
      browserMaxAge: 3600, // 1 hour
      edgeMaxAge: 86400, // 24 hours
    })
  })

  it('has correct blogPost configuration', () => {
    expect(cacheConfigs.blogPost).toEqual({
      browserMaxAge: 7200, // 2 hours
      edgeMaxAge: 604800, // 1 week
    })
  })

  it('has correct staticContent configuration', () => {
    expect(cacheConfigs.staticContent).toEqual({
      browserMaxAge: 31536000, // 1 year
      edgeMaxAge: 31536000, // 1 year
    })
  })

  it('can be used with createCachedResponse', async () => {
    const data = { slug: 'test-post', content: 'Post content' }
    const response = createCachedResponse(data, cacheConfigs.blogPost)

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBe('public, max-age=7200, s-maxage=604800')
  })
})
