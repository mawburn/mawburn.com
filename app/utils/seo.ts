import { ORIGIN } from './structuredData'

export const SITE_URL = ORIGIN
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.webp`

type PageMetaInput = {
  title: string
  description: string
  /** Path starting with "/" (e.g. "/about"). Used for og:url. */
  path: string
  keywords?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
}

/** Standard title/description/OG/Twitter tags shared by every page route. */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
}: PageMetaInput) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  const alt = imageAlt ?? title

  return [
    { title },
    { name: 'description', content: description },
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'mawburn.com' },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: alt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: alt },
  ]
}

export function canonicalLink(path: string) {
  return { rel: 'canonical', href: `${SITE_URL}${path}` }
}
