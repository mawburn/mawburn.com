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

export const markdownToHtml = (markdown: string): string => {
  return md.render(markdown)
}
