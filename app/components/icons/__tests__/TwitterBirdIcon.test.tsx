import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TwitterBirdIcon } from '../TwitterBirdIcon'

describe('TwitterBirdIcon', () => {
  it('renders with default size', () => {
    const { container } = render(<TwitterBirdIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '34')
    expect(svg).toHaveAttribute('height', '34')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('renders with custom size', () => {
    const { container } = render(<TwitterBirdIcon size={48} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('uses white color for fill', () => {
    render(<TwitterBirdIcon />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', '#ffffff')
  })

  it('renders the correct SVG path', () => {
    render(<TwitterBirdIcon />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M23.953 4.57a10 10 0 01-2.825.775')
  })

  describe('Edge cases', () => {
    it('handles zero size', () => {
      const { container } = render(<TwitterBirdIcon size={0} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles negative size', () => {
      const { container } = render(<TwitterBirdIcon size={-10} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '-10')
      expect(svg).toHaveAttribute('height', '-10')
    })

    it('handles very large size', () => {
      const { container } = render(<TwitterBirdIcon size={9999} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '9999')
      expect(svg).toHaveAttribute('height', '9999')
    })

    it('handles decimal size', () => {
      const { container } = render(<TwitterBirdIcon size={34.5} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '34.5')
      expect(svg).toHaveAttribute('height', '34.5')
    })
  })
})
