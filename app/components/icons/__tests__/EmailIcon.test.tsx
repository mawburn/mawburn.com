import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmailIcon } from '../EmailIcon'

describe('EmailIcon', () => {
  it('renders with default size', () => {
    const { container } = render(<EmailIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '34')
    expect(svg).toHaveAttribute('height', '34')
    expect(svg).toHaveAttribute('viewBox', '0 0 388.424 388.424')
  })

  it('renders with custom size', () => {
    const { container } = render(<EmailIcon size={48} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('uses currentColor for fill', () => {
    const { container } = render(<EmailIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('renders the correct SVG path', () => {
    render(<EmailIcon />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M384.202,59.111H4.209')
  })

  describe('Edge cases', () => {
    it('handles zero size', () => {
      const { container } = render(<EmailIcon size={0} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles negative size', () => {
      const { container } = render(<EmailIcon size={-10} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '-10')
      expect(svg).toHaveAttribute('height', '-10')
    })

    it('handles very large size', () => {
      const { container } = render(<EmailIcon size={9999} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '9999')
      expect(svg).toHaveAttribute('height', '9999')
    })

    it('handles decimal size', () => {
      const { container } = render(<EmailIcon size={34.5} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '34.5')
      expect(svg).toHaveAttribute('height', '34.5')
    })
  })
})
