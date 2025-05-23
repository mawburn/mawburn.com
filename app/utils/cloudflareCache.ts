// Cloudflare-specific caching utilities for Workers

export const getCacheKey = (request: Request): string => {
  const url = new URL(request.url)
  return `${url.pathname}${url.search}`
}

export const getCachedResponse = async (request: Request): Promise<Response | undefined> => {
  if (typeof caches === 'undefined' || !('default' in caches)) {
    return undefined
  }
  const cache = (caches as any).default
  const cacheKey = getCacheKey(request)
  return await cache.match(cacheKey)
}

export const setCachedResponse = async (
  request: Request,
  response: Response,
  options: { maxAge?: number } = {}
): Promise<void> => {
  if (typeof caches === 'undefined' || !('default' in caches)) {
    return
  }
  const cache = (caches as any).default
  const cacheKey = getCacheKey(request)
  const { maxAge = 86400 } = options // Default 24 hours

  // Clone response and add cache headers
  const cachedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...response.headers,
      'Cache-Control': `public, max-age=${maxAge}`,
      'CF-Cache-Status': 'MISS',
    },
  })

  await cache.put(cacheKey, cachedResponse)
}

export const createCacheableResponse = <T>(
  data: T,
  options: {
    maxAge?: number
    browserMaxAge?: number
    staleWhileRevalidate?: number
  } = {}
): Response => {
  const {
    maxAge = 86400, // 24 hours default
    browserMaxAge = 3600, // 1 hour default
    staleWhileRevalidate = 604800, // 1 week default
  } = options

  return Response.json(data, {
    headers: {
      'Cache-Control': `public, max-age=${browserMaxAge}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
      'CDN-Cache-Control': `max-age=${maxAge}`,
      Vary: 'Accept-Encoding',
      'CF-Cache-Status': 'MISS',
    },
  })
}
