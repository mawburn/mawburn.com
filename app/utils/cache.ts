export type CachePolicy = {
  browserMaxAge: number
  edgeMaxAge: number
  staleWhileRevalidate?: number
}

// Cloudflare uses the more specific CDN header; Cache-Control remains useful to
// browsers and other shared caches. Only use these policies for public content.
export function cacheHeaders(
  { browserMaxAge, edgeMaxAge, staleWhileRevalidate }: CachePolicy,
  vary?: string
): Record<string, string> {
  const stale =
    staleWhileRevalidate === undefined ? '' : `, stale-while-revalidate=${staleWhileRevalidate}`
  return {
    'Cache-Control': `public, max-age=${browserMaxAge}, s-maxage=${edgeMaxAge}${stale}`,
    'CDN-Cache-Control': `max-age=${edgeMaxAge}`,
    'Cloudflare-CDN-Cache-Control': `max-age=${edgeMaxAge}${stale}`,
    ...(vary ? { Vary: vary } : {}),
  }
}

export const cachePolicies = {
  page: { browserMaxAge: 3600, edgeMaxAge: 3600 },
  blogList: { browserMaxAge: 3600, edgeMaxAge: 86400, staleWhileRevalidate: 86400 },
  blogPost: { browserMaxAge: 7200, edgeMaxAge: 604800, staleWhileRevalidate: 86400 },
  sitemap: { browserMaxAge: 86400, edgeMaxAge: 604800, staleWhileRevalidate: 86400 },
  text: { browserMaxAge: 86400, edgeMaxAge: 86400 },
} satisfies Record<string, CachePolicy>

// React Router selects the deepest route's headers. Merge instead of dropping
// the root's security headers when a route supplies its own cache policy.
export function routeCacheHeaders(parentHeaders: Headers, policy: CachePolicy): Headers {
  const headers = new Headers(parentHeaders)
  for (const [name, value] of Object.entries(cacheHeaders(policy, 'Accept-Encoding'))) {
    headers.set(name, value)
  }
  return headers
}

export function preventErrorCaching(response: Response): Response {
  if (response.status < 400) return response

  // A route can inherit public cache headers even when its loader fails.
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'no-store')
  headers.delete('CDN-Cache-Control')
  headers.delete('Cloudflare-CDN-Cache-Control')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
