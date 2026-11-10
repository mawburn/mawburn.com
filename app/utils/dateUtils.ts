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

/** The calendar-date part of "YYYY-MM-DD", "YYYY-MM-DD HH:mm" or ISO strings. */
export const datePart = (dateString: string): string =>
  String(dateString).split('T')[0].split(' ')[0]

/**
 * Format a post date as a calendar date. Dates are authored as plain calendar days, so format
 * in UTC: using the viewer's timezone would show the previous day to anyone west of UTC and make
 * the server-rendered (UTC) and hydrated (local) output disagree.
 */
export const formatPublishDate = (dateString: string, style: 'long' | 'short' = 'long'): string =>
  new Date(datePart(dateString) + 'T00:00:00.000Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

export const isInDevelopment = (): boolean => {
  return import.meta.env.DEV
}
