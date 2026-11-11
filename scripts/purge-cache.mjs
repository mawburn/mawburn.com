#!/usr/bin/env node
/**
 * Purges Cloudflare's edge cache after `wrangler deploy`, so the edge stops serving pages and
 * loader data from the previous build. Needs CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN
 * (a token with Zone → Cache Purge); skips with a warning when either is missing.
 */
const { CLOUDFLARE_ZONE_ID: zone, CLOUDFLARE_API_TOKEN: token } = process.env

if (!zone || !token) {
  console.warn('! Skipping cache purge: set CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN')
  process.exit(0)
}

const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ purge_everything: true }),
})
const result = await response.json().catch(() => ({}))

if (!response.ok || !result.success) {
  console.error('✗ Cache purge failed:', JSON.stringify(result.errors ?? response.status))
  process.exit(1)
}
console.log('✓ Edge cache purged')
