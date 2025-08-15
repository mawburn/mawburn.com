import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { XIcon } from '../XIcon'

describe('XIcon', () => {
  it('renders with default size', () => {
    const { container } = render(<XIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '34')
    expect(svg).toHaveAttribute('height', '34')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('renders with custom size', () => {
    const { container } = render(<XIcon size={48} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('uses currentColor for fill', () => {
    render(<XIcon />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', 'currentColor')
  })

  it('renders the correct SVG path', () => {
    render(<XIcon />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M18.244 2.25h3.308l-7.227')
  })

  it('has no fill on svg element', () => {
    const { container } = render(<XIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'none')
  })

  describe('Edge cases', () => {
    it('handles zero size', () => {
      const { container } = render(<XIcon size={0} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles negative size', () => {
      const { container } = render(<XIcon size={-10} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '-10')
      expect(svg).toHaveAttribute('height', '-10')
    })

    it('handles very large size', () => {
      const { container } = render(<XIcon size={9999} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '9999')
      expect(svg).toHaveAttribute('height', '9999')
    })

    it('handles decimal size', () => {
      const { container } = render(<XIcon size={34.5} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '34.5')
      expect(svg).toHaveAttribute('height', '34.5')
    })
  })
})
