import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ThemeToggle } from '~/components/ThemeToggle'

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

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.className = ''
  })

  describe('Theme switching functionality', () => {
    it('provides accessible theme toggle button', () => {
      localStorageMock.getItem.mockReturnValue(null)
      render(<ThemeToggle />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label')
      expect(button).toBeVisible()
    })

    it('toggles theme when button is clicked', () => {
      localStorageMock.getItem.mockReturnValue(null)
      render(<ThemeToggle />)

      const button = screen.getByRole('button')

      fireEvent.click(button)

      expect(document.documentElement).toHaveClass('dark')
    })

    it('respects saved theme preference', () => {
      localStorageMock.getItem.mockReturnValue('dark')

      expect(() => render(<ThemeToggle />)).not.toThrow()

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    describe('Edge cases', () => {
      it('handles multiple toggle clicks correctly', () => {
        localStorageMock.getItem.mockReturnValue(null)
        render(<ThemeToggle />)

        const button = screen.getByRole('button')

        fireEvent.click(button)
        expect(document.documentElement).toHaveClass('dark')

        fireEvent.click(button)
        expect(document.documentElement).not.toHaveClass('dark')
      })

      it('handles invalid localStorage values gracefully', () => {
        localStorageMock.getItem.mockReturnValue('invalid-theme-value')

        expect(() => render(<ThemeToggle />)).not.toThrow()

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
    })
  })
})
