#!/usr/bin/env node
/**
 * Scaffold a new blog post.
 *   pnpm new-post "My post title" [--category <id>] [--tags "react,typescript"]
 * Creates content/blog/YYYY-MM-DD-slug.md with valid frontmatter and generates OG images.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { CATEGORY_IDS, POSTS_DIR, ROOT, slugify } from './lib/posts.mjs'

const args = process.argv.slice(2)
const tagsIndex = args.indexOf('--tags')
const tags =
  tagsIndex >= 0
    ? (args[tagsIndex + 1] ?? '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
    : []
const categoryIndex = args.indexOf('--category')
const category = categoryIndex >= 0 ? (args[categoryIndex + 1] ?? '') : CATEGORY_IDS[0]
const flagValueIndexes = [tagsIndex, categoryIndex].filter(i => i >= 0).map(i => i + 1)
const title = args
  .filter((arg, i) => !arg.startsWith('--') && !flagValueIndexes.includes(i))
  .join(' ')
  .trim()

if (!title) {
  console.error('Usage: pnpm new-post "Post title" [--category <id>] [--tags "one,two"]')
  process.exit(1)
}

if (!CATEGORY_IDS.includes(category)) {
  console.error(`Unknown category "${category}". Use one of: ${CATEGORY_IDS.join(', ')}`)
  process.exit(1)
}

const now = new Date()
const pad = n => String(n).padStart(2, '0')
const day = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
const slug = `${day}-${slugify(title)}`
const file = path.join(POSTS_DIR, `${slug}.md`)

if (existsSync(file)) {
  console.error(`Already exists: content/blog/${slug}.md`)
  process.exit(1)
}

// Quote strings by hand: YAML would emit an unquoted date, which parses as a timestamp.
const q = value => `'${value.replaceAll("'", "''")}'`
const frontmatter = [
  `title: ${q(title)}`,
  `date: ${q(`${day} ${pad(now.getHours())}:${pad(now.getMinutes())}`)}`,
  `image: ${q(`${slug}.webp`)}`,
  `category: ${q(category)}`,
  `excerpt: ${q('TODO: one or two sentences (50–160 characters) that work as the search result description.')}`,
  `tags: [${(tags.length ? tags : ['TODO']).map(q).join(', ')}]`,
  '',
].join('\n')

await writeFile(file, `---\n${frontmatter}---\n\nWrite your post here.\n`)
console.log(`Created content/blog/${slug}.md`)

const og = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'og-image.mjs'), slug], {
  stdio: 'inherit',
})
if (og.status !== 0) console.warn('Could not generate OG images; run `pnpm og-image` later.')

console.log(`
Next:
  1. Write the post and replace the TODO excerpt/tags in the frontmatter
  2. pnpm dev        -> preview at /blog/${slug}
  3. pnpm validate-posts
  4. git add -A && git commit && git push   (CI validates, tests, and deploys)
`)
