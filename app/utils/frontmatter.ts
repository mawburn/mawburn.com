interface FrontmatterData {
  title: string
  date: string // Can be "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" or "YYYY-MM-DDTHH:mm:ssZ"
  excerpt: string
  tags: string[]
}

interface ParsedFrontmatter {
  data: FrontmatterData
  content: string
}

export const parseFrontmatter = (content: string): ParsedFrontmatter => {
  const lines = content.split('\n')
  if (lines[0] !== '---') {
    return {
      data: { title: '', date: '', excerpt: '', tags: [] },
      content,
    }
  }

  let endIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) {
    return {
      data: { title: '', date: '', excerpt: '', tags: [] },
      content,
    }
  }

  const frontmatterLines = lines.slice(1, endIndex)
  const contentLines = lines.slice(endIndex + 1)

  let title = ''
  let date = ''
  let excerpt = ''
  let tags: string[] = []

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1)
        const parsedArray = arrayContent
          .split(',')
          .map(item => item.trim().replace(/['"]/g, ''))
          .filter(item => item.length > 0)

        if (key === 'tags') {
          tags = parsedArray
        }
      } else {
        switch (key) {
          case 'title':
            title = value
            break
          case 'date':
            date = value
            break
          case 'excerpt':
            excerpt = value
            break
        }
      }
    }
  }

  return {
    data: {
      title,
      date,
      excerpt,
      tags,
    },
    content: contentLines.join('\n'),
  }
}
