import { existsSync } from 'node:fs'
import path from 'node:path'

import { CATEGORY_IDS, IMAGES_DIR } from './posts.mjs'

const FILE_RE = /^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?$/

const isValidDate = value =>
  typeof value === 'string' &&
  DATE_RE.test(value) &&
  !Number.isNaN(Date.parse(value.replace(' ', 'T')))

/**
 * Validate parsed posts ({ file, slug, data, body }). Errors fail the build/CI; warnings only print.
 * @returns {Array<{ file: string, errors: string[], warnings: string[] }>}
 */
export function validatePosts(posts) {
  return posts.map(({ file, slug, data, body }) => {
    const errors = []
    const warnings = []

    const fileMatch = file.match(FILE_RE)
    if (!fileMatch) errors.push('filename must be YYYY-MM-DD-lowercase-slug.md')

    if (!data) {
      errors.push('missing YAML frontmatter')
      return { file, errors, warnings }
    }

    if (typeof data.title !== 'string' || !data.title.trim()) errors.push('title is required')
    else if (data.title.length > 100)
      warnings.push('title is over 100 characters; it may truncate in search results')

    if (!isValidDate(data.date)) errors.push("date must look like 'YYYY-MM-DD HH:mm'")
    else if (fileMatch && !data.date.startsWith(fileMatch[1]))
      errors.push('date does not match the date in the filename')

    if (typeof data.excerpt !== 'string' || data.excerpt.trim().length < 50) {
      errors.push(
        'excerpt is required and should be at least 50 characters (it becomes the meta description)'
      )
    } else if (data.excerpt.length > 320) {
      warnings.push(`excerpt is ${data.excerpt.length} characters; search engines show ~160`)
    }

    if (typeof data.excerpt === 'string' && /^TODO\b/.test(data.excerpt))
      errors.push('replace the TODO excerpt')
    if (Array.isArray(data.tags) && data.tags.includes('TODO')) errors.push('replace the TODO tags')

    if (
      !Array.isArray(data.tags) ||
      data.tags.length === 0 ||
      data.tags.some(tag => typeof tag !== 'string' || !tag.trim())
    ) {
      errors.push('tags must be a non-empty list of strings')
    }

    if (!CATEGORY_IDS.includes(data.category)) {
      errors.push(`category must be exactly one of: ${CATEGORY_IDS.join(', ')}`)
    }

    if (data.image !== undefined) {
      if (typeof data.image !== 'string' || !existsSync(path.join(IMAGES_DIR, data.image))) {
        errors.push(`image "${data.image}" not found in public/images (run: pnpm og-image ${slug})`)
      }
    } else {
      warnings.push(`no image set; add one or run: pnpm og-image ${slug}`)
    }

    if (data.updated !== undefined) {
      if (!isValidDate(String(data.updated))) errors.push('updated must be a valid date')
      else if (
        isValidDate(data.date) &&
        Date.parse(String(data.updated)) < Date.parse(data.date.slice(0, 10))
      ) {
        errors.push('updated is earlier than date')
      }
    }

    if (body.trim().length < 100) errors.push('post body is empty or too short')
    if (/\bTODO\b|\bDRAFT\b/.test(body)) warnings.push('body contains TODO/DRAFT')

    return { file, errors, warnings }
  })
}
