import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'
type Theme = 'dark' | 'light'

function getSavedTheme(): Theme | null {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY)
    return theme === 'dark' || theme === 'light' ? theme : null
  } catch {
    return null
  }
}

function getPreferredTheme(): Theme {
  const savedTheme = getSavedTheme()
  if (savedTheme) return savedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return getPreferredTheme() === 'dark'
  })

  useEffect(() => {
    const theme = getPreferredTheme()
    applyTheme(theme)
    setIsDarkMode(theme === 'dark')

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getSavedTheme()) return

      const systemTheme = event.matches ? 'dark' : 'light'
      applyTheme(systemTheme)
      setIsDarkMode(event.matches)
    }

    colorScheme.addEventListener('change', handleSystemThemeChange)
    return () => colorScheme.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    const theme = newMode ? 'dark' : 'light'

    applyTheme(theme)
    setIsDarkMode(newMode)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  return { isDarkMode, toggleDarkMode }
}
