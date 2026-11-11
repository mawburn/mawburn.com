import { memo } from 'react'
import { Link, redirect } from 'react-router'

import { BlogShell, BlogToolbar } from '~/components/BlogShell'
import { BranchHeader } from '~/components/BranchHeader'
import {
  ALL_CATEGORIES,
  BLOG_CATEGORIES,
  categoryLabel,
  categoryPath,
  DEFAULT_CATEGORY,
  parseCategoryParam,
} from '~/utils/blog-categories'
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

// Category views are filters of /blog, so they all share its canonical URL and og:url.
export function meta({ data }: Partial<Route.MetaArgs> = {}) {
  const active = data?.active ?? DEFAULT_CATEGORY

  return pageMeta({
    title:
      active === DEFAULT_CATEGORY
        ? 'Blog | Matt Burnett'
        : `${categoryLabel(active)} | Blog | Matt Burnett`,
    description:
      'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.',
    path: '/blog',
    keywords:
      'Software Engineering, Web Development, React, TypeScript, JavaScript, Frontend Development, Full Stack, Tabletop Gaming, Programming Blog, Tech Blog',
  })
}

export async function loader({ request }: Pick<Route.LoaderArgs, 'request'>) {
  const active = parseCategoryParam(new URL(request.url).searchParams.get('category'))
  if (active === null) throw redirect('/blog')

  const allPosts = await getAllPostsMetadataWithUpdated()
  const posts =
    active === ALL_CATEGORIES ? allPosts : allPosts.filter(post => post.category === active)

  // Hide categories with no posts yet, but always offer the default.
  const used = new Set(allPosts.map(post => post.category))
  const categories = BLOG_CATEGORIES.filter(
    category => category.id === DEFAULT_CATEGORY || used.has(category.id)
  ).map(category => category.id)

  return { posts, active, categories }
}

export function headers({ parentHeaders }: Route.HeadersArgs) {
  return routeCacheHeaders(parentHeaders, cachePolicies.blogList)
}

const formatWordCount = (wordCount?: number) =>
  wordCount ? `${wordCount.toLocaleString()} words` : undefined

const BlogPostCard = memo(
  ({ post, showCategory }: { post: BlogPostMetadataWithUpdated; showCategory: boolean }) => (
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
          {showCategory ? (
            <>
              <span aria-hidden="true">•</span>
              <span className="font-medium text-emerald-700 dark:text-moss-bright">
                {categoryLabel(post.category)}
              </span>
            </>
          ) : null}
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
  )
)

BlogPostCard.displayName = 'BlogPostCard'

const pillClass =
  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors border-gray-300 text-gray-700 hover:border-emerald-700 hover:text-emerald-700 dark:border-gray-600 dark:text-gray-200 dark:hover:border-moss-bright dark:hover:text-moss-bright aria-[current=page]:border-emerald-700 aria-[current=page]:bg-emerald-700 aria-[current=page]:text-white dark:aria-[current=page]:border-moss-bright dark:aria-[current=page]:bg-moss-bright dark:aria-[current=page]:text-gray-900'

function CategoryFilter({ categories, active }: { categories: string[]; active: string }) {
  // "All" leads the row, but the default category (bare /blog) stays the default selection.
  const ids = categories.length > 1 ? [ALL_CATEGORIES, ...categories] : categories

  return (
    <nav aria-label="Post categories" className="mb-8">
      <ul className="flex flex-wrap gap-2">
        {ids.map(id => (
          <li key={id}>
            <Link
              to={categoryPath(id)}
              className={pillClass}
              aria-current={id === active ? 'page' : undefined}
              preventScrollReset
            >
              {categoryLabel(id)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, active, categories } = loaderData
  const isAll = active === ALL_CATEGORIES

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
        <CategoryFilter categories={categories} active={active} />
        <h2 className="sr-only">{categoryLabel(active)} posts</h2>
        {posts.length ? (
          <div className="space-y-6">
            {posts.map(post => (
              <BlogPostCard key={post.slug} post={post} showCategory={isAll} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Nothing here yet.</p>
        )}
      </BlogShell>
    </>
  )
}
