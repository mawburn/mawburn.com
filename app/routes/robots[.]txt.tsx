import { cacheHeaders, cachePolicies } from '~/utils/cache'

// Search and AI crawlers are welcome. Content is free to read and summarize;
// please attribute Matt Burnett (see /llms.txt).
const aiCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]

export function loader() {
  const body = `User-agent: *
Allow: /

${aiCrawlers.map(bot => `User-agent: ${bot}`).join('\n')}
Allow: /

Sitemap: https://mawburn.com/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...cacheHeaders(cachePolicies.text),
    },
  })
}
