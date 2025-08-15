import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GitHubIcon } from '../GitHubIcon'

describe('GitHubIcon', () => {
  it('renders with default size', () => {
    const { container } = render(<GitHubIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '34')
    expect(svg).toHaveAttribute('height', '34')
    expect(svg).toHaveAttribute('viewBox', '0 0 1024 1024')
  })

  it('renders with custom size', () => {
    const { container } = render(<GitHubIcon size={48} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('uses currentColor for fill', () => {
    render(<GitHubIcon />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', 'currentColor')
  })

  it('renders the correct SVG path', () => {
    render(<GitHubIcon />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M8 0C3.58 0 0 3.58 0 8')
    expect(path).toHaveAttribute('fill-rule', 'evenodd')
    expect(path).toHaveAttribute('clip-rule', 'evenodd')
    expect(path).toHaveAttribute('transform', 'scale(64)')
  })

  it('has no fill on svg element', () => {
    const { container } = render(<GitHubIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'none')
  })

  describe('Edge cases', () => {
    it('handles zero size', () => {
      const { container } = render(<GitHubIcon size={0} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles negative size', () => {
      const { container } = render(<GitHubIcon size={-10} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '-10')
      expect(svg).toHaveAttribute('height', '-10')
    })

    it('handles very large size', () => {
      const { container } = render(<GitHubIcon size={9999} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '9999')
      expect(svg).toHaveAttribute('height', '9999')
    })

    it('handles decimal size', () => {
      const { container } = render(<GitHubIcon size={34.5} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '34.5')
      expect(svg).toHaveAttribute('height', '34.5')
    })
  })
})
