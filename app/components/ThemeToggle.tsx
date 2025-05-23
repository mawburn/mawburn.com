import { Sun, Moon } from 'lucide-react'
import { Toggle } from '~/components/ui/Toggle'
import { useDarkMode } from '~/hooks/useDarkMode'

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Toggle
      pressed={isDarkMode}
      onPressedChange={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      className="text-white hover:text-cyan-300 transition-colors bg-white/20 hover:bg-white/30 backdrop-blur-sm data-[state=on]:bg-white/30 data-[state=on]:text-cyan-300 border border-white/20"
      size="sm"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Toggle>
  )
}
