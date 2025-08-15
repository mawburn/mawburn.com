import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ShareButtons } from '~/components/ShareButtons'

describe('ShareButtons', () => {
  const mockUrl = 'https://example.com/blog/test-post'
  const mockTitle = 'Test Blog Post'

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all share buttons and handles clipboard functionality', async () => {
    render(<ShareButtons url={mockUrl} title={mockTitle} />)

    // All buttons present
    expect(screen.getByLabelText('Copy link to clipboard')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Bluesky')).toBeInTheDocument()
    expect(screen.getByLabelText('Share on Reddit')).toBeInTheDocument()

    // Copy functionality
    const copyButton = screen.getByLabelText('Copy link to clipboard')
    fireEvent.click(copyButton)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockUrl)

    // Wait for the feedback text to appear
    await waitFor(
      () => {
        expect(screen.queryByText('URL Copied!')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })

  it('handles clipboard copy failure gracefully', async () => {
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('Copy failed'))

    render(<ShareButtons url={mockUrl} title={mockTitle} />)

    const copyButton = screen.getByLabelText('Copy link to clipboard')
    fireEvent.click(copyButton)

    // Should not show success message when copy fails
    await waitFor(() => {
      expect(screen.queryByText('URL Copied!')).not.toBeInTheDocument()
    })
  })

  it('opens share windows for all platforms', () => {
    const mockOpen = vi.fn()
    vi.stubGlobal('open', mockOpen)

    render(<ShareButtons url={mockUrl} title={mockTitle} />)

    // Twitter
    const twitterButton = screen.getByLabelText('Share on Twitter')
    fireEvent.click(twitterButton)
    expect(mockOpen).toHaveBeenCalledWith(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(mockTitle)}&url=${encodeURIComponent(mockUrl)}`,
      '_blank',
      'width=600,height=400,toolbar=0,menubar=0'
    )

    // LinkedIn
    const linkedinButton = screen.getByLabelText('Share on LinkedIn')
    fireEvent.click(linkedinButton)
    expect(mockOpen).toHaveBeenCalledWith(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mockUrl)}`,
      '_blank',
      'width=600,height=400,toolbar=0,menubar=0'
    )

    // Bluesky
    const blueskyButton = screen.getByLabelText('Share on Bluesky')
    fireEvent.click(blueskyButton)
    expect(mockOpen).toHaveBeenCalledWith(
      `https://bsky.app/intent/compose?text=${encodeURIComponent(mockTitle)}%20${encodeURIComponent(mockUrl)}`,
      '_blank',
      'width=600,height=400,toolbar=0,menubar=0'
    )

    // Reddit
    const redditButton = screen.getByLabelText('Share on Reddit')
    fireEvent.click(redditButton)
    expect(mockOpen).toHaveBeenCalledWith(
      `https://www.reddit.com/submit?url=${encodeURIComponent(mockUrl)}&title=${encodeURIComponent(mockTitle)}`,
      '_blank',
      'width=600,height=400,toolbar=0,menubar=0'
    )

    vi.unstubAllGlobals()
  })
})
