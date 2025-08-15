import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDarkMode } from '~/hooks/useDarkMode'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('useDarkMode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.className = ''
  })

  describe('Dark mode state management', () => {
    it('provides dark mode state and toggle function', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const { result } = renderHook(() => useDarkMode())

      expect(typeof result.current.isDarkMode).toBe('boolean')
      expect(typeof result.current.toggleDarkMode).toBe('function')
    })

    it('toggles dark mode when requested', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const { result } = renderHook(() => useDarkMode())

      act(() => {
        result.current.toggleDarkMode()
      })

      expect(result.current.isDarkMode).toBe(true)
      expect(document.documentElement).toHaveClass('dark')
    })

    it('applies saved dark theme preference on initialization', () => {
      localStorageMock.getItem.mockReturnValue('dark')
      document.documentElement.classList.add('dark')

      const { result } = renderHook(() => useDarkMode())

      expect(result.current.isDarkMode).toBe(true)
    })

    describe('Edge cases', () => {
      it('handles multiple toggle operations correctly', () => {
        localStorageMock.getItem.mockReturnValue(null)
        const { result } = renderHook(() => useDarkMode())

        act(() => {
          result.current.toggleDarkMode()
        })
        expect(result.current.isDarkMode).toBe(true)
        expect(document.documentElement).toHaveClass('dark')

        act(() => {
          result.current.toggleDarkMode()
        })
        expect(result.current.isDarkMode).toBe(false)
        expect(document.documentElement).not.toHaveClass('dark')
      })

      it('handles corrupted localStorage values gracefully', () => {
        localStorageMock.getItem.mockReturnValue('invalid-theme-data')

        expect(() => renderHook(() => useDarkMode())).not.toThrow()

        const { result } = renderHook(() => useDarkMode())
        expect(typeof result.current.isDarkMode).toBe('boolean')
      })
    })
  })
})
