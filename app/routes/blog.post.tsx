import { Link } from 'react-router'

import { Footer } from '~/components/Footer'
import { RSSIcon } from '~/components/icons'
import { MarkdownContent } from '~/components/MarkdownContent'
import { ShareButtons } from '~/components/ShareButtons'
import { getPostBySlug } from '~/utils/blog'
import type { BlogPost } from '~/utils/blogTypes'

import type { Route } from './+types/blog.post'

export const links: Route.LinksFunction = () => [
  {
    rel: 'preload',
    href: '/fonts/Inter_18pt-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Inter_18pt-Bold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
]

export function meta({ params }: Route.MetaArgs) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return [{ title: 'Post Not Found | Matt Burnett' }]
  }

  const url = `https://mawburn.com/blog/${params.slug}`
  const hasImages = post.images && post.images.default

  // For OG, prefer default image since it's the right size (1200x630)
  const ogImageUrl = post.images?.default ? `https://mawburn.com${post.images.default}` : undefined

  // Use twitter-specific image if available
  const twitterImageUrl = post.images?.twitter
    ? `https://mawburn.com${post.images.twitter}`
    : ogImageUrl

  const metaTags = [
    { title: `${post.title} | Matt Burnett` },
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: post.tags.join(', ') },
    { name: 'author', content: 'mawburn' },
    { name: 'robots', content: 'index, follow' },
    { name: 'article:author', content: 'mawburn' },
    { name: 'article:published_time', content: new Date(post.date).toISOString() },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'mawburn.com' },
    { property: 'og:article:author', content: 'mawburn' },
    { property: 'og:article:published_time', content: new Date(post.date).toISOString() },
    { name: 'twitter:card', content: hasImages ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: post.title },
    { name: 'twitter:description', content: post.excerpt },
    { name: 'reading_time', content: `${post.readTime} min read` },
  ]

  post.tags.forEach(tag => {
    metaTags.push({ property: 'og:article:tag', content: tag })
  })

  if (ogImageUrl) {
    metaTags.push(
      { property: 'og:image', content: ogImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: post.title }
    )
  }

  if (twitterImageUrl) {
    metaTags.push(
      { name: 'twitter:image', content: twitterImageUrl },
      { name: 'twitter:image:alt', content: post.title }
    )
  }

  return metaTags
}

export function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  return {
    post,
  }
}

export function headers() {
  return {
    'Cache-Control': 'public, max-age=7200, s-maxage=604800, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'max-age=604800',
    'Cloudflare-CDN-Cache-Control': 'max-age=604800',
    Vary: 'Accept-Encoding',
  }
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData as { post: BlogPost }

  return (
    <div className="min-h-screen bg-white dark:bg-[oklch(25%_0.015_260)] transition-colors flex flex-col">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
          <a
            href="/rss.xml"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 transition-colors"
            title="RSS Feed"
          >
            <RSSIcon size={24} />
            <span className="text-sm font-medium">RSS</span>
          </a>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              style={{ fontSize: '2.25rem' }}
            >
              {post.title}
            </h1>
            <div className="flex items-center text-gray-700 dark:text-gray-200 mb-4 space-x-2">
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-block font-bold text-gray-700 dark:text-gray-200 text-xs">
                Tags:
              </span>{' '}
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {post.tags.join(', ')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-200 font-medium">Share:</span>
              <ShareButtons title={post.title} url={`https://mawburn.com/blog/${post.slug}`} />
            </div>
          </header>

          <MarkdownContent html={post.content} />
        </article>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          All posts are written by me, though AI helps with proofreading and editing.
        </p>
      </div>
      <Footer maxWidth="max-w-3xl" />
    </div>
  )
}
