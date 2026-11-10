import { memo } from 'react'
import { Link } from 'react-router'

import { BlogShell, BlogToolbar } from '~/components/BlogShell'
import { BranchHeader } from '~/components/BranchHeader'
import {
  type BlogPostMetadataWithUpdated,
  getAllPostsMetadataWithUpdated,
} from '~/utils/blog-config'
import { cachePolicies, routeCacheHeaders } from '~/utils/cache'
import { datePart, formatPublishDate } from '~/utils/dateUtils'
import { canonicalLink, pageMeta, SITE_URL } from '~/utils/seo'

import type { Route } from './+types/blog'

export const links: Route.LinksFunction = () => [
  canonicalLink('/blog'),
  {
    rel: 'alternate',
    type: 'application/rss+xml',
    title: 'Matt Burnett — Blog',
    href: `${SITE_URL}/rss.xml`,
  },
]

export function meta() {
  return pageMeta({
    title: 'Blog | Matt Burnett',
    description:
      'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
    path: '/blog',
    keywords:
      'Software Engineering, Web Development, React, TypeScript, JavaScript, Frontend Development, Full Stack, Tabletop Gaming, Programming Blog, Tech Blog',
  })
}

export async function loader() {
  const posts = await getAllPostsMetadataWithUpdated()

  return {
    posts,
  }
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.blogList)
}

const formatWordCount = (wordCount?: number) =>
  wordCount ? `${wordCount.toLocaleString()} words` : undefined

const BlogPostCard = memo(({ post }: { post: BlogPostMetadataWithUpdated }) => (
  <article className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8 last:mb-0">
    <Link
      to={`/blog/${post.slug}`}
      className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 -m-4 transition-colors"
      prefetch="intent"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-emerald-700 dark:hover:text-moss-bright transition-colors">
        {post.title}
      </h2>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200 mb-3">
        <time dateTime={datePart(post.date)}>{formatPublishDate(post.date)}</time>
        {post.wordCount ? (
          <>
            <span aria-hidden="true">•</span>
            <span>{formatWordCount(post.wordCount)}</span>
          </>
        ) : null}
        <span aria-hidden="true">•</span>
        <span>{post.readTime} min read</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-3">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        <span className="inline-block font-bold text-gray-700 dark:text-gray-200 text-xs whitespace-nowrap">
          Tags:
        </span>{' '}
        <span className="inline-block text-gray-700 dark:text-gray-400 text-xs whitespace-nowrap">
          {post.tags.join(', ')}
        </span>
      </div>
    </Link>
  </article>
))

BlogPostCard.displayName = 'BlogPostCard'

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData as { posts: BlogPostMetadataWithUpdated[] }

  return (
    <>
      <BranchHeader eyebrow="Writing" title="Engineering Essays & Notes">
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">
          Software engineering, web development, and the occasional tabletop game. All posts are
          written by me, though AI helps with proofreading and editing.
        </p>
      </BranchHeader>
      <BlogShell>
        <BlogToolbar />
        <h2 className="sr-only">All posts</h2>
        <div className="space-y-6">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </BlogShell>
    </>
  )
}
