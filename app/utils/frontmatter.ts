interface FrontmatterData {
  title: string
  date: string // Can be "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" or "YYYY-MM-DDTHH:mm:ssZ"
  excerpt: string
  tags: string[]
  image?: string
}

interface ParsedFrontmatter {
  data: FrontmatterData
  content: string
}

export const parseFrontmatter = (content: string): ParsedFrontmatter => {
  const lines = content.split('\n')
  if (lines[0] !== '---') {
    return {
      data: { title: '', date: '', excerpt: '', tags: [], image: undefined },
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
  let image: string | undefined

  let i = 0
  while (i < frontmatterLines.length) {
    const line = frontmatterLines[i]
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

      // Handle multi-line arrays (YAML style)
      if (key === 'tags') {
        if (value.startsWith('[')) {
          let arrayContent = value
          i++
          while (i < frontmatterLines.length && !arrayContent.includes(']')) {
            arrayContent += frontmatterLines[i]
            i++
          }

          if (arrayContent.startsWith('[') && arrayContent.includes(']')) {
            const content = arrayContent.slice(
              arrayContent.indexOf('[') + 1,
              arrayContent.lastIndexOf(']')
            )
            tags = content
              .split(',')
              .map(item => item.trim().replace(/['"]/g, ''))
              .filter(item => item.length > 0)
          }
          continue
        } else if (value === '' || value === '[]') {
          i++
          while (i < frontmatterLines.length) {
            const nextLine = frontmatterLines[i].trim()
            if (nextLine.startsWith('[')) {
              let arrayContent = nextLine
              i++
              while (i < frontmatterLines.length && !arrayContent.includes(']')) {
                arrayContent += frontmatterLines[i]
                i++
              }

              if (arrayContent.startsWith('[') && arrayContent.includes(']')) {
                const content = arrayContent.slice(
                  arrayContent.indexOf('[') + 1,
                  arrayContent.lastIndexOf(']')
                )
                tags = content
                  .split(',')
                  .map(item => item.trim().replace(/['"]/g, ''))
                  .filter(item => item.length > 0)
              }
              break
            }
            i++
          }
          continue
        }
      }

      // Parse single-line arrays
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
          case 'image':
            image = value
            break
        }
      }
    }
    i++
  }

  return {
    data: {
      title,
      date,
      excerpt,
      tags,
      image,
    },
    content: contentLines.join('\n'),
  }
}
