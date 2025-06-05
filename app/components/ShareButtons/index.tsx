import { useState } from 'react'
import { CopyIcon } from './icons/CopyIcon'
import { TwitterIcon } from './icons/TwitterIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { BlueskyIcon } from './icons/BlueskyIcon'
import { RedditIcon } from './icons/RedditIcon'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: 'twitter' | 'linkedin' | 'bluesky' | 'reddit') => {
    let shareUrl = ''
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'bluesky':
        shareUrl = `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`
        break
      case 'reddit':
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
        break
    }

    window.open(shareUrl, '_blank', 'width=600,height=400,toolbar=0,menubar=0')
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleShare('reddit')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on Reddit"
      >
        <RedditIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Reddit</span>
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="w-5 h-5" />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      <button
        onClick={() => handleShare('bluesky')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on Bluesky"
      >
        <BlueskyIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Bluesky</span>
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Copy link to clipboard"
      >
        <CopyIcon className="w-5 h-5" />
        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
    </div>
  )
}
