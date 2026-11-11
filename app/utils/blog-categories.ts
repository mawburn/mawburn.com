import categories from '../../content/blog/categories.json'

export type BlogCategory = { id: string; label: string }

/** Ordered as in content/blog/categories.json; the first entry is the default view. */
export const BLOG_CATEGORIES: readonly BlogCategory[] = categories

export const DEFAULT_CATEGORY = BLOG_CATEGORIES[0].id

/** Query-param value that shows posts from every category. */
export const ALL_CATEGORIES = 'all'

const byId = new Map(BLOG_CATEGORIES.map(category => [category.id, category]))

export function isBlogCategory(value: unknown): value is string {
  return typeof value === 'string' && byId.has(value)
}

/** Display label for a category id or ALL_CATEGORIES. */
export function categoryLabel(id: string) {
  if (id === ALL_CATEGORIES) return 'All'
  const category = byId.get(id)
  if (!category) throw new Error(`Unknown blog category "${id}"`)
  return category.label
}

/** Blog list URL for a category id or ALL_CATEGORIES; the default lives at bare /blog. */
export function categoryPath(id: string) {
  return id === DEFAULT_CATEGORY ? '/blog' : `/blog?category=${id}`
}

/**
 * The view a `?category=` value selects, or null when the URL should redirect to /blog
 * (an unknown value, or the default category spelled out).
 */
export function parseCategoryParam(param: string | null) {
  if (param === null) return DEFAULT_CATEGORY
  if (param === ALL_CATEGORIES || (param !== DEFAULT_CATEGORY && isBlogCategory(param)))
    return param
  return null
}
