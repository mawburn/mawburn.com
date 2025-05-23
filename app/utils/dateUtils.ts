export const isPostPublished = (dateString: string): boolean => {
  // Parse the date string - it can be either:
  // - "YYYY-MM-DD" (date only, defaults to 00:00 UTC)
  // - "YYYY-MM-DDTHH:mm:ssZ" (full datetime in UTC)
  // - "YYYY-MM-DD HH:mm" (date and time, treated as UTC)

  let postDate: Date

  if (dateString.includes('T') || dateString.includes(' ')) {
    // Has time component
    if (dateString.includes(' ') && !dateString.includes('T')) {
      // Convert "YYYY-MM-DD HH:mm" to ISO format for UTC parsing
      postDate = new Date(dateString.replace(' ', 'T') + ':00.000Z')
    } else {
      // Already in ISO format or has T separator
      postDate = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z')
    }
  } else {
    // Date only - treat as midnight UTC
    postDate = new Date(dateString + 'T00:00:00.000Z')
  }

  const now = new Date()

  return postDate <= now
}

export const formatPublishDate = (dateString: string): string => {
  // Always display just the date part, regardless of whether time was specified
  const dateOnly = dateString.split('T')[0].split(' ')[0]
  return new Date(dateOnly + 'T00:00:00.000Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const isInDevelopment = (): boolean => {
  return import.meta.env.DEV
}
