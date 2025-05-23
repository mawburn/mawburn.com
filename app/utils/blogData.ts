const modules = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function getSlugFromPath(path: string): string {
  const filename = path.split('/').pop() || ''
  return filename.replace('.md', '')
}

// Convert the modules to the expected format
export const blogPostsData: Record<string, string> = {}

for (const [path, content] of Object.entries(modules)) {
  const slug = getSlugFromPath(path)
  blogPostsData[slug] = content
}
