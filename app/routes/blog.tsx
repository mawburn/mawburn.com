import type { Route } from './+types/blog'
import { getAllPostsMetadata } from '~/utils/blog'
import type { BlogPostMetadata } from '~/utils/blogTypes'
import { Link } from 'react-router'
import { Footer } from '~/components/Footer'
import { RSSIcon } from '~/components/icons'
import { memo } from 'react'

export function meta(_args: Route.MetaArgs) {
  const url = 'https://mawburn.com/blog'
  const description =
    'Tech stack by day, stacks of games by night. Deep dives into software engineering, web development frameworks, and tabletop gaming.'

  return [
    { title: 'Blog | Matt Burnett' },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content:
        'Software Engineering, Web Development, React, TypeScript, JavaScript, Frontend Development, Full Stack, Tabletop Gaming, Programming Blog, Tech Blog',
    },
    { name: 'author', content: 'mawburn' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Blog | Matt Burnett' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'mawburn.com' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Blog | Matt Burnett' },
    { name: 'twitter:description', content: description },
    { name: 'canonical', content: url },
  ]
}

export function loader() {
  const posts = getAllPostsMetadata()

  return new Response(JSON.stringify({ posts }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=86400',
      'Cloudflare-CDN-Cache-Control': 'max-age=86400',
      ETag: `"blog-list-${posts.length}"`,
      Vary: 'Accept-Encoding',
    },
  })
}

const BlogPostCard = memo(({ post }: { post: BlogPostMetadata }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article
      key={post.slug}
      className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8 last:mb-0"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 -m-4 transition-colors"
        prefetch="intent"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
          {post.title}
        </h2>
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-200 mb-3 space-x-2">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
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
  )
})

BlogPostCard.displayName = 'BlogPostCard'

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData as { posts: BlogPostMetadata[] }

  return (
    <div className="min-h-screen bg-white dark:bg-[oklch(25%_0.015_260)] transition-colors flex flex-col">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              <span className="text-gray-900 dark:text-white">Blog</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-black dark:from-white to-transparent"></div>
          </div>
          <a
            href="/rss.xml"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 transition-colors"
            title="RSS Feed"
          >
            <RSSIcon size={26} />
            <span className="text-sm font-medium">RSS</span>
          </a>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-12">
            All posts are written by me, though AI helps with proofreading and editing.
          </p>

          <div className="space-y-6">
            {posts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
