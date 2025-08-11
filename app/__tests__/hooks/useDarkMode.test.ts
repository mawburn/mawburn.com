import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDarkMode } from '~/hooks/useDarkMode'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
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

  it('provides dark mode state and toggle functionality', () => {
    // Initial state without saved theme
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useDarkMode())

    expect(typeof result.current.isDarkMode).toBe('boolean')
    expect(typeof result.current.toggleDarkMode).toBe('function')

    // Toggle dark mode
    act(() => {
      result.current.toggleDarkMode()
    })
    expect(result.current.isDarkMode).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('reads saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    document.documentElement.classList.add('dark')

    const { result } = renderHook(() => useDarkMode())

    expect(result.current.isDarkMode).toBe(true)
  })
})
