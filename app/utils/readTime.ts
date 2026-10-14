const wordsPerMinute = 200

export const calculateReadTimeFromWordCount = (wordCount: number): number =>
  Math.max(1, Math.floor(wordCount / wordsPerMinute))

export const calculateReadTime = (text: string): number => {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  return calculateReadTimeFromWordCount(words)
}
