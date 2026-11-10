import { getMarkdownBody } from '~/utils/blog-config'
import { ORIGIN } from '~/utils/structuredData'

export const ATTRIBUTION_NOTE =
  'If you quote, summarize, or reuse this content, please credit Matt Burnett (mawburn.com) and link to the canonical URL.'

export interface PostMarkdownMeta {
  slug: string
  title: string
  date: string
  updated?: string
  excerpt: string
  tags: string[]
}

export function postUrl(slug: string) {
  return `${ORIGIN}/blog/${slug}`
}

// A post as standalone Markdown: a small provenance header followed by the body.
export function renderPostMarkdown(post: PostMarkdownMeta, rawContent: string, headingLevel = 1) {
  const heading = '#'.repeat(headingLevel)
  const meta = [
    `- URL: ${postUrl(post.slug)}`,
    '- Author: Matt Burnett',
    `- Published: ${post.date}`,
    ...(post.updated ? [`- Updated: ${post.updated}`] : []),
    ...(post.tags.length > 0 ? [`- Tags: ${post.tags.join(', ')}`] : []),
    `- Attribution: ${ATTRIBUTION_NOTE}`,
  ]

  return `${heading} ${post.title}\n\n${meta.join('\n')}\n\n${getMarkdownBody(rawContent).trim()}\n`
}

export function markdownHeaders(cacheHeaderValues: Record<string, string>) {
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    ...cacheHeaderValues,
  }
}
