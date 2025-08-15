import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AnimatedXTwitterIcon } from '../AnimatedXTwitterIcon'

vi.mock('../TwitterBirdIcon', () => ({
  TwitterBirdIcon: ({ size }: { size?: number }) => (
    <div data-testid="twitter-bird-icon" data-size={size}>
      TwitterBird
    </div>
  ),
}))

vi.mock('../XIcon', () => ({
  XIcon: ({ size }: { size?: number }) => (
    <div data-testid="x-icon" data-size={size}>
      X
    </div>
  ),
}))

describe('AnimatedXTwitterIcon', () => {
  let observerCallback: (
    entries: { isIntersecting: boolean; target: HTMLElement }[],
    observer: IntersectionObserver
  ) => void
  let observerDisconnect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    observerDisconnect = vi.fn()
    global.IntersectionObserver = vi.fn(callback => {
      observerCallback = callback
      return {
        observe: vi.fn(),
        disconnect: observerDisconnect,
        unobserve: vi.fn(),
        takeRecords: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as any
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with default size', () => {
    render(<AnimatedXTwitterIcon />)

    const container = screen.getByTestId('x-icon').parentElement?.parentElement?.parentElement
    expect(container).toHaveStyle({ width: '34px', height: '34px' })
    expect(screen.getByTestId('x-icon')).toHaveAttribute('data-size', '34')
  })

  it('renders with custom size', () => {
    render(<AnimatedXTwitterIcon size={48} />)

    const container = screen.getByTestId('x-icon').parentElement?.parentElement?.parentElement
    expect(container).toHaveStyle({ width: '48px', height: '48px' })
    expect(screen.getByTestId('x-icon')).toHaveAttribute('data-size', '48')
  })

  it('starts animation when element becomes visible', () => {
    render(<AnimatedXTwitterIcon />)

    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('twitter-bird-icon')).not.toBeInTheDocument()

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: document.createElement('div'),
          },
        ],
        {} as IntersectionObserver
      )
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    act(() => {
      vi.advanceTimersByTime(125)
    })

    act(() => {
      vi.advanceTimersByTime(125)
    })

    expect(screen.getByTestId('twitter-bird-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument()
  })

  it('stops animation when element becomes invisible', () => {
    render(<AnimatedXTwitterIcon />)

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: document.createElement('div'),
          },
        ],
        {} as IntersectionObserver
      )
    })

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: false,
            target: document.createElement('div'),
          },
        ],
        {} as IntersectionObserver
      )
    })

    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('twitter-bird-icon')).not.toBeInTheDocument()
  })

  it('cleans up observer and timers on unmount', () => {
    const { unmount } = render(<AnimatedXTwitterIcon />)

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: document.createElement('div'),
          },
        ],
        {} as IntersectionObserver
      )
    })

    unmount()

    expect(observerDisconnect).toHaveBeenCalled()
  })

  describe('Edge cases', () => {
    it('handles rapid visibility changes', () => {
      render(<AnimatedXTwitterIcon />)

      act(() => {
        observerCallback(
          [
            {
              isIntersecting: true,
              target: document.createElement('div'),
            },
          ],
          {} as IntersectionObserver
        )
      })

      act(() => {
        observerCallback(
          [
            {
              isIntersecting: false,
              target: document.createElement('div'),
            },
          ],
          {} as IntersectionObserver
        )
      })

      act(() => {
        observerCallback(
          [
            {
              isIntersecting: true,
              target: document.createElement('div'),
            },
          ],
          {} as IntersectionObserver
        )
      })

      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    })

    it('handles component remounting', () => {
      const { rerender } = render(<AnimatedXTwitterIcon size={30} />)

      act(() => {
        observerCallback(
          [
            {
              isIntersecting: true,
              target: document.createElement('div'),
            },
          ],
          {} as IntersectionObserver
        )
      })

      rerender(<AnimatedXTwitterIcon size={40} />)

      const container = screen.getByTestId('x-icon').parentElement?.parentElement?.parentElement
      expect(container).toHaveStyle({ width: '40px', height: '40px' })
    })

    it('handles zero size', () => {
      render(<AnimatedXTwitterIcon size={0} />)

      const container = screen.getByTestId('x-icon').parentElement?.parentElement?.parentElement
      expect(container).toHaveStyle({ width: '0px', height: '0px' })
    })

    it('handles negative size', () => {
      render(<AnimatedXTwitterIcon size={-10} />)

      const container = screen.getByTestId('x-icon').parentElement?.parentElement?.parentElement
      expect(container).toHaveStyle({ width: '-10px', height: '-10px' })
    })
  })
})
