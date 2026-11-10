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

const blogWrapper = () => document.querySelector<HTMLElement>('[data-blog-theme]')!

describe('useDarkMode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = '<div data-blog-theme class="dark"></div>'
  })

  describe('Dark mode state management', () => {
    it('provides dark mode state and toggle function', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const { result } = renderHook(() => useDarkMode())

      expect(typeof result.current.isDarkMode).toBe('boolean')
      expect(typeof result.current.toggleDarkMode).toBe('function')
    })

    it('defaults to dark and toggles to light when requested', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const { result } = renderHook(() => useDarkMode())
      expect(result.current.isDarkMode).toBe(true)

      act(() => {
        result.current.toggleDarkMode()
      })

      expect(result.current.isDarkMode).toBe(false)
      expect(blogWrapper()).not.toHaveClass('dark')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
    })

    it('never touches the <html> element (theme is blog-scoped)', () => {
      localStorageMock.getItem.mockReturnValue('light')
      renderHook(() => useDarkMode())

      expect(document.documentElement).not.toHaveClass('dark')
      expect(blogWrapper()).not.toHaveClass('dark')
    })

    it('restores a saved dark theme even when the DOM class is missing', () => {
      localStorageMock.getItem.mockReturnValue('dark')

      const { result } = renderHook(() => useDarkMode())

      expect(result.current.isDarkMode).toBe(true)
      expect(blogWrapper()).toHaveClass('dark')
      expect(blogWrapper().style.colorScheme).toBe('dark')
    })

    describe('Edge cases', () => {
      it('handles multiple toggle operations correctly', () => {
        localStorageMock.getItem.mockReturnValue(null)
        const { result } = renderHook(() => useDarkMode())

        act(() => {
          result.current.toggleDarkMode()
        })
        expect(result.current.isDarkMode).toBe(false)
        expect(blogWrapper()).not.toHaveClass('dark')

        act(() => {
          result.current.toggleDarkMode()
        })
        expect(result.current.isDarkMode).toBe(true)
        expect(blogWrapper()).toHaveClass('dark')
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
