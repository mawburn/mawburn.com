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

  describe('Edge Cases', () => {
    it('should handle extremely large max-age values', () => {
      const data = { test: true }
      const options = {
        browserMaxAge: Number.MAX_SAFE_INTEGER,
        edgeMaxAge: Number.MAX_SAFE_INTEGER,
      }

      const response = createCachedResponse(data, options)
      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe(
        `public, max-age=${Number.MAX_SAFE_INTEGER}, s-maxage=${Number.MAX_SAFE_INTEGER}`
      )
    })

    it('should handle zero max-age values', () => {
      const data = { test: true }
      const options = {
        browserMaxAge: 0,
        edgeMaxAge: 0,
      }

      const response = createCachedResponse(data, options)
      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe('public, max-age=0, s-maxage=0')
    })

    it('should handle negative max-age values', () => {
      const data = { test: true }
      const options = {
        browserMaxAge: -1,
        edgeMaxAge: -100,
      }

      const response = createCachedResponse(data, options)
      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe('public, max-age=-1, s-maxage=-100')
    })

    it('should handle undefined data', async () => {
      expect(() => createCachedResponse(undefined)).toThrow()
    })

    it('should handle circular reference data', async () => {
      const circularData: any = { name: 'test' }
      circularData.self = circularData

      expect(() => createCachedResponse(circularData)).toThrow()
    })

    it('should handle very long ETag values', () => {
      const data = { test: true }
      const longETag = '"' + 'a'.repeat(1000) + '"'
      const options = { etag: longETag }

      const response = createCachedResponse(data, options)
      const etag = response.headers.get('ETag')
      expect(etag).toBe(longETag)
    })

    it('should handle ETag without quotes', () => {
      const data = { test: true }
      const options = { etag: 'no-quotes-etag' }

      const response = createCachedResponse(data, options)
      const etag = response.headers.get('ETag')
      expect(etag).toBe('no-quotes-etag')
    })

    it('should handle special characters in ETag', () => {
      const data = { test: true }
      const options = { etag: '"special-!@#$%^&*()_+-={}|[]\\:";\'<>?,./"' }

      const response = createCachedResponse(data, options)
      const etag = response.headers.get('ETag')
      expect(etag).toBe('"special-!@#$%^&*()_+-={}|[]\\:";\'<>?,./"')
    })

    it('should handle multiple Vary headers', () => {
      const data = { test: true }
      const options = { vary: 'Accept-Language, Accept-Encoding, User-Agent' }

      const response = createCachedResponse(data, options)
      const vary = response.headers.get('Vary')
      expect(vary).toBe('Accept-Language, Accept-Encoding, User-Agent')
    })

    it('should handle empty string Vary header', () => {
      const data = { test: true }
      const options = { vary: '' }

      const response = createCachedResponse(data, options)
      const vary = response.headers.get('Vary')
      expect(vary).toBe('')
    })

    it('should handle extremely large data objects', async () => {
      const largeArray = Array(10000)
        .fill(0)
        .map((_, i) => ({ id: i, data: 'x'.repeat(100) }))
      const largeData = { items: largeArray }

      const response = createCachedResponse(largeData)
      const json = (await response.json()) as any
      expect(json.items).toHaveLength(10000)
      expect(json.items[0]).toEqual({ id: 0, data: 'x'.repeat(100) })
    })

    it('should handle data with special JavaScript values', async () => {
      const specialData = {
        infinity: Infinity,
        negativeInfinity: -Infinity,
        nan: NaN,
        date: new Date('2024-01-01'),
        regex: /test/g,
        func: () => 'test',
      }

      const response = createCachedResponse(specialData)
      const json = (await response.json()) as any

      expect(json.infinity).toBeNull()
      expect(json.negativeInfinity).toBeNull()
      expect(json.nan).toBeNull()
      expect(typeof json.date).toBe('string')
      expect(json.regex).toEqual({})
      expect(json.func).toBeUndefined()
    })

    it('should handle nested arrays and objects deeply', async () => {
      const deepData = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  array: [1, 2, { nested: true }],
                },
              },
            },
          },
        },
      }

      const response = createCachedResponse(deepData)
      const json = (await response.json()) as any
      expect(json.level1.level2.level3.level4.level5.array[2].nested).toBe(true)
    })

    it('should handle numeric config values as strings', () => {
      const data = { test: true }
      const options = {
        browserMaxAge: '3600' as any,
        edgeMaxAge: '86400' as any,
      }

      const response = createCachedResponse(data, options)
      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe('public, max-age=3600, s-maxage=86400')
    })

    it('should handle NaN and Infinity in config values', () => {
      const data = { test: true }
      const options = {
        browserMaxAge: NaN,
        edgeMaxAge: Infinity,
      }

      const response = createCachedResponse(data, options)
      const cacheControl = response.headers.get('Cache-Control')
      expect(cacheControl).toBe('public, max-age=NaN, s-maxage=Infinity')
    })
  })
})
