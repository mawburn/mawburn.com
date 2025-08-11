import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueskyIcon } from '~/components/ShareButtons/icons/BlueskyIcon'
import { CopyIcon } from '~/components/ShareButtons/icons/CopyIcon'
import { LinkedInIcon } from '~/components/ShareButtons/icons/LinkedInIcon'
import { RedditIcon } from '~/components/ShareButtons/icons/RedditIcon'
import { TwitterIcon } from '~/components/ShareButtons/icons/TwitterIcon'

describe('ShareButton Icons', () => {
  it('renders TwitterIcon correctly', () => {
    const { container } = render(<TwitterIcon className="custom-class" width="32" height="32" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg).toHaveClass('custom-class')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('renders LinkedInIcon with default size', () => {
    const { container } = render(<LinkedInIcon className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveClass('custom-class')
  })

  it('renders BlueskyIcon with custom style', () => {
    const { container } = render(<BlueskyIcon style={{ color: 'blue' }} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveStyle({ color: 'rgb(0, 0, 255)' })
  })

  it('renders CopyIcon with stroke properties', () => {
    const { container } = render(<CopyIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('stroke', 'currentColor')
    expect(svg).toHaveAttribute('stroke-width', '2')
  })

  it('renders RedditIcon correctly', () => {
    const { container } = render(<RedditIcon className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg).toHaveClass('custom-class')
  })
})
