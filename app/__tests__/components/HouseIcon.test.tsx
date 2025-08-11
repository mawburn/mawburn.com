import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HouseIcon } from '~/components/HouseIcon'

describe('HouseIcon Component', () => {
  it('should render SVG icon correctly', () => {
    render(<HouseIcon />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.tagName).toBe('svg')
  })

  it('should apply custom className when provided', () => {
    render(<HouseIcon className="w-8 h-8 text-blue-500" />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('w-8', 'h-8', 'text-blue-500')
  })

  it('should have correct SVG attributes and structure', () => {
    render(<HouseIcon />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 16 16')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
    expect(svg?.getAttribute('class')).toBe('')

    const paths = svg?.querySelectorAll('path')
    expect(paths).toHaveLength(1)
    paths?.forEach(path => {
      expect(path).toHaveAttribute('fill', 'currentColor')
    })
  })
})
