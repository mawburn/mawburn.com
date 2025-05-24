import type { Route } from './+types/blog'
import { getAllPostsMetadata } from '~/utils/blog'
import type { BlogPostMetadata } from '~/utils/blogTypes'
import { createCachedResponse, cacheConfigs } from '~/utils/cache'
import { Link } from 'react-router'
import { BlogFooter } from '~/components/BlogFooter'

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
    { name: 'author', content: 'Matt Burnett' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Blog | Matt Burnett' },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'Matt Burnett' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Blog | Matt Burnett' },
    { name: 'twitter:description', content: description },
    { name: 'canonical', content: url },
  ]
}

export function loader() {
  const posts = getAllPostsMetadata()

  return createCachedResponse(
    { posts },
    {
      ...cacheConfigs.blogList,
      etag: `"blog-list-${posts.length}"`,
    }
  )
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData as { posts: BlogPostMetadata[] }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors flex flex-col">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          <span className="text-gray-900 dark:text-white">Blog</span>
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-black dark:from-white to-transparent mb-6"></div>
        <div className="text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-12">
            All posts are written by me, though AI helps with proofreading and editing.
          </p>

          <div className="space-y-6">
            {posts.map(post => (
              <article
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-700 pb-6"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 -m-4 transition-colors"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
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
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-slate-300 text-gray-700 dark:text-slate-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  )
}
