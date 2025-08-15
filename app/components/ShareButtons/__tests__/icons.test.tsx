import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueskyIcon } from '~/components/ShareButtons/icons/BlueskyIcon'
import { CopyIcon } from '~/components/ShareButtons/icons/CopyIcon'
import { LinkedInIcon } from '~/components/ShareButtons/icons/LinkedInIcon'
import { RedditIcon } from '~/components/ShareButtons/icons/RedditIcon'
import { TwitterIcon } from '~/components/ShareButtons/icons/TwitterIcon'

describe('ShareButton Icons', () => {
  describe('Icon rendering', () => {
    it('renders all icons without errors', () => {
      expect(() => render(<TwitterIcon />)).not.toThrow()
      expect(() => render(<LinkedInIcon />)).not.toThrow()
      expect(() => render(<BlueskyIcon />)).not.toThrow()
      expect(() => render(<CopyIcon />)).not.toThrow()
      expect(() => render(<RedditIcon />)).not.toThrow()
    })

    it('accepts custom CSS classes', () => {
      const { container: twitterContainer } = render(<TwitterIcon className="custom-class" />)
      const { container: linkedinContainer } = render(<LinkedInIcon className="another-class" />)

      const twitterIcon = twitterContainer.querySelector('svg')
      const linkedinIcon = linkedinContainer.querySelector('svg')

      expect(twitterIcon).toHaveClass('custom-class')
      expect(linkedinIcon).toHaveClass('another-class')
    })

    it('supports custom sizing properties', () => {
      const { container } = render(<TwitterIcon width="32" height="32" />)
      const svg = container.querySelector('svg')

      expect(svg).toHaveAttribute('width', '32')
      expect(svg).toHaveAttribute('height', '32')
    })

    describe('Edge cases', () => {
      it('handles custom styles properly', () => {
        const { container } = render(<BlueskyIcon style={{ color: 'blue' }} />)
        const svg = container.querySelector('svg')

        expect(svg).toHaveStyle({ color: 'rgb(0, 0, 255)' })
      })

      it('renders with default dimensions when no size specified', () => {
        const { container } = render(<CopyIcon />)
        const svg = container.querySelector('svg')

        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width')
        expect(svg).toHaveAttribute('height')
      })
    })
  })
})
