import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, renderer) {
    return renderer.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const hrefIndex = token.attrIndex('href')

  if (hrefIndex >= 0) {
    const href = token.attrs![hrefIndex][1]

    // Check if it's an external link (starts with http/https and not our domain)
    if (href.startsWith('http') && !href.includes('mawburn.com')) {
      // Add target="_blank"
      token.attrSet('target', '_blank')
      // Add rel="noopener noreferrer" for security and SEO
      token.attrSet('rel', 'noopener noreferrer')
    }
  }

  return defaultRender(tokens, idx, options, env, renderer)
}

const defaultImageRender =
  md.renderer.rules.image ||
  function (tokens, idx, options, _env, renderer) {
    return renderer.renderToken(tokens, idx, options)
  }

md.renderer.rules.image = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const altIndex = token.attrIndex('alt')
  const srcIndex = token.attrIndex('src')

  if (srcIndex >= 0) {
    const src = token.attrs![srcIndex][1]

    // Add loading="lazy" for better performance
    token.attrSet('loading', 'lazy')

    // Ensure alt text is present for accessibility and SEO
    if (altIndex < 0 || !token.attrs![altIndex][1]) {
      // Extract filename without extension as fallback alt text
      const filename = src.split('/').pop()?.split('.')[0] || 'Image'
      const altText = filename.replace(/[-_]/g, ' ')
      token.attrSet('alt', altText)
    }
  }

  return defaultImageRender(tokens, idx, options, env, renderer)
}

export const markdownToHtml = (markdown: string): string => {
  return md.render(markdown)
}
