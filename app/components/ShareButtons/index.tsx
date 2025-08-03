import { useState } from 'react'
import { LinkIcon } from './icons/LinkIcon'
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
    } catch {
      // Silently fail - clipboard access may be restricted
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
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        aria-label="Share on Reddit"
      >
        <RedditIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('bluesky')}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        aria-label="Share on Bluesky"
      >
        <BlueskyIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="w-5 h-5" />
      </button>

      <button
        onClick={handleCopy}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer relative"
        aria-label="Copy link to clipboard"
      >
        <LinkIcon className="w-5 h-5" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded">
            URL Copied!
          </span>
        )}
      </button>
    </div>
  )
}
