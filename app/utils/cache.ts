export interface CacheOptions {
  browserMaxAge?: number // Browser cache in seconds
  edgeMaxAge?: number // Edge cache in seconds
  etag?: string // ETag for cache validation
  vary?: string // Vary header
}

export const createCachedResponse = <T>(data: T, options: CacheOptions = {}) => {
  const {
    browserMaxAge = 3600, // 1 hour default
    edgeMaxAge = 86400, // 24 hours default
    etag,
    vary = 'Accept-Encoding',
  } = options

  const headers: Record<string, string> = {
    'Cache-Control': `public, max-age=${browserMaxAge}, s-maxage=${edgeMaxAge}`,
    'CDN-Cache-Control': `max-age=${edgeMaxAge}`,
    Vary: vary,
  }

  if (etag) {
    headers['ETag'] = etag
  }

  return Response.json(data, { headers })
}

// Predefined cache configurations
export const cacheConfigs = {
  blogList: {
    browserMaxAge: 3600, // 1 hour
    edgeMaxAge: 86400, // 24 hours
  },
  blogPost: {
    browserMaxAge: 7200, // 2 hours
    edgeMaxAge: 604800, // 1 week
  },
  staticContent: {
    browserMaxAge: 31536000, // 1 year
    edgeMaxAge: 31536000, // 1 year
  },
} as const
