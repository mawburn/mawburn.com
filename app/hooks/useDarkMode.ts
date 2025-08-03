import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  useEffect(() => {
    // Sync state with current dark mode on mount
    const currentlyDark = document.documentElement.classList.contains('dark')
    if (currentlyDark !== isDarkMode) {
      setIsDarkMode(currentlyDark)
    }
  }, [isDarkMode])

  return { isDarkMode, toggleDarkMode }
}
