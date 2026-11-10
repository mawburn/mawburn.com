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

  // The site is dark-first: only go light when the visitor's system explicitly asks for it.
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** The theme is scoped to the blog wrapper (`data-blog-theme`), never <html>. */
function applyTheme(theme: Theme) {
  const target = document.querySelector<HTMLElement>('[data-blog-theme]')
  if (!target) return
  target.classList.toggle('dark', theme === 'dark')
  target.style.colorScheme = theme
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

    const colorScheme = window.matchMedia('(prefers-color-scheme: light)')
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getSavedTheme()) return

      const systemTheme = event.matches ? 'light' : 'dark'
      applyTheme(systemTheme)
      setIsDarkMode(!event.matches)
    }

    colorScheme.addEventListener('change', handleSystemThemeChange)
    return () => colorScheme.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    const theme = newMode ? 'dark' : 'light'

    applyTheme(theme)
    setIsDarkMode(newMode)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // storage unavailable (private mode); the toggle still works for this page view
    }
  }

  return { isDarkMode, toggleDarkMode }
}
