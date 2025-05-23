import type { Route } from './+types/blog'
import { getAllPostsMetadata } from '~/utils/blog'
import type { BlogPostMetadata } from '~/utils/blogTypes'
import { createCachedResponse, cacheConfigs } from '~/utils/cache'
import { Link } from 'react-router'

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Blog | Matt Burnett' },
    {
      name: 'description',
      content: 'Thoughts and insights on software engineering, web development, and modern tech.',
    },
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
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
        <div className="text-gray-700 dark:text-gray-300">
          <p className="text-lg mb-4">
            <strong>Tech stack by day, game stack by night.</strong> Deep dives into software
            engineering, web development frameworks, and tabletop.
          </p>
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
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
    </div>
  )
}
