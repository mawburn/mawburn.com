import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InstagramIcon } from '../InstagramIcon'

describe('InstagramIcon', () => {
  it('renders with default size', () => {
    const { container } = render(<InstagramIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '34')
    expect(svg).toHaveAttribute('height', '34')
    expect(svg).toHaveAttribute('viewBox', '0 0 1000 1000')
  })

  it('renders with custom size', () => {
    const { container } = render(<InstagramIcon size={48} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('uses currentColor for fill', () => {
    render(<InstagramIcon />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', 'currentColor')
  })

  it('renders the correct SVG path', () => {
    render(<InstagramIcon />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M295.42,6c-53.2,2.51-89.53')
    expect(path).toHaveAttribute('transform', 'translate(-2.5 -2.5)')
  })

  describe('Edge cases', () => {
    it('handles zero size', () => {
      const { container } = render(<InstagramIcon size={0} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '0')
      expect(svg).toHaveAttribute('height', '0')
    })

    it('handles negative size', () => {
      const { container } = render(<InstagramIcon size={-10} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '-10')
      expect(svg).toHaveAttribute('height', '-10')
    })

    it('handles very large size', () => {
      const { container } = render(<InstagramIcon size={9999} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '9999')
      expect(svg).toHaveAttribute('height', '9999')
    })

    it('handles decimal size', () => {
      const { container } = render(<InstagramIcon size={34.5} />)

      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '34.5')
      expect(svg).toHaveAttribute('height', '34.5')
    })
  })
})
