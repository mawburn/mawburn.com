import { Link } from 'react-router'

import { BlogShell, BlogToolbar } from '~/components/BlogShell'
import { MarkdownContent } from '~/components/MarkdownContent'
import { ShareButtons } from '~/components/ShareButtons'
import type { BlogPostWithUpdated } from '~/utils/blog-config'
import { blogRawContent, getPostBySlugWithUpdated } from '~/utils/blog-config'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { datePart, formatPublishDate } from '~/utils/dateUtils'
import { markdownToHtml } from '~/utils/markdown'
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
} from '~/utils/structuredData'

import type { Route } from './+types/blog.post'

export function meta({ params, data }: Route.MetaArgs) {
  const post = data?.post
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

  const metaTags: Array<{ [key: string]: string }> = [
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

  if (post.updated) {
    const updatedIso = new Date(post.updated).toISOString()
    metaTags.push(
      { name: 'article:modified_time', content: updatedIso },
      { property: 'article:modified_time', content: updatedIso },
      { property: 'og:article:modified_time', content: updatedIso }
    )
  }

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

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlugWithUpdated(params.slug)
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }

  const rawMarkdown = blogRawContent[params.slug]
  if (rawMarkdown) {
    const frontmatterEnd = rawMarkdown.indexOf('---', 3)
    const markdownBody =
      frontmatterEnd >= 0 ? rawMarkdown.slice(frontmatterEnd + 3).trim() : rawMarkdown
    post.content = markdownToHtml(markdownBody)
  }

  return {
    post,
  }
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.blogPost)
}

const formatWordCount = (wordCount?: number) =>
  wordCount ? `${wordCount.toLocaleString()} words` : undefined

export default function BlogPost({ loaderData, params }: Route.ComponentProps) {
  const { post } = loaderData as { post: BlogPostWithUpdated }
  const url = `https://mawburn.com/blog/${params.slug}`

  const articleStructuredData = generateArticleStructuredData(post, url)
  const publishedDay = datePart(post.date)
  const updatedDay = post.updated ? datePart(post.updated) : undefined
  const showUpdatedDate = updatedDay !== undefined && publishedDay !== updatedDay
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://mawburn.com' },
    { name: 'Blog', url: 'https://mawburn.com/blog' },
    { name: post.title },
  ])

  return (
    <>
      <link rel="canonical" href={url} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <BlogShell>
        <BlogToolbar
          left={
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-100"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          }
        />

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              style={{ fontSize: '2.25rem' }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-4">
              <time dateTime={publishedDay}>{formatPublishDate(post.date)}</time>
              {post.wordCount ? (
                <>
                  <span aria-hidden="true">•</span>
                  <span>{formatWordCount(post.wordCount)}</span>
                </>
              ) : null}
              <span aria-hidden="true">•</span>
              <span>{post.readTime} min read</span>
              {showUpdatedDate ? (
                <span className="basis-full text-xs font-normal text-gray-500 dark:text-gray-400">
                  Updated <time dateTime={updatedDay}>{formatPublishDate(post.updated!)}</time>
                </span>
              ) : null}
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
      </BlogShell>
    </>
  )
}
