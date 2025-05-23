export const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200 // Average reading speed
  const words = text.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return Math.max(1, readTime) // Minimum 1 minute
}
