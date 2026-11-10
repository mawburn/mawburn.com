import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { parse } from 'yaml'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const POSTS_DIR = path.join(ROOT, 'content', 'blog')
export const IMAGES_DIR = path.join(ROOT, 'public', 'images')

/** Split a markdown file into parsed YAML frontmatter and body. */
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: null, body: raw }
  return { data: parse(match[1]) ?? {}, body: match[2] }
}

export async function loadPosts() {
  const files = (await readdir(POSTS_DIR)).filter(file => file.endsWith('.md')).sort()
  return Promise.all(
    files.map(async file => {
      const raw = await readFile(path.join(POSTS_DIR, file), 'utf8')
      const { data, body } = parseFrontmatter(raw)
      return { file, slug: file.replace(/\.md$/, ''), data, body }
    })
  )
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '')
}
