import type { LoaderFunctionArgs } from 'react-router'

import { getAllPostsMetadata } from '~/utils/blog'
import type { BlogPostMetadata } from '~/utils/blogTypes'

export async function loader({ request }: LoaderFunctionArgs) {
  const posts = getAllPostsMetadata()
  const host = new URL(request.url).origin

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Matt Burnett's Blog</title>
    <description>Thoughts on web development, technology, and software engineering</description>
    <link>${host}/blog</link>
    <atom:link href="${host}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post: BlogPostMetadata) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${host}/blog/${post.slug}</link>
      <guid isPermaLink="true">${host}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=86400',
      'Cloudflare-CDN-Cache-Control': 'max-age=86400',
      ETag: `"rss-${posts.length}"`,
      Vary: 'Accept-Encoding',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
