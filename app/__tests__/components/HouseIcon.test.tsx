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

  it('should have empty className when none provided', () => {
    render(<HouseIcon />)

    const svg = document.querySelector('svg')
    expect(svg?.getAttribute('class')).toBe('')
  })

  it('should have correct SVG attributes', () => {
    render(<HouseIcon />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 336.6 272.9')
    expect(svg).toHaveAttribute('width', '336.6')
    expect(svg).toHaveAttribute('height', '272.9')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('should contain path elements for the house shape', () => {
    render(<HouseIcon />)

    const svg = document.querySelector('svg')
    const paths = svg?.querySelectorAll('path')
    expect(paths).toHaveLength(3)

    paths?.forEach(path => {
      expect(path).toHaveAttribute('fill', 'currentColor')
    })
  })

  it('should use currentColor fill for theming', () => {
    render(<HouseIcon className="text-red-500" />)

    const svg = document.querySelector('svg')
    const paths = svg?.querySelectorAll('path')

    paths?.forEach(path => {
      expect(path).toHaveAttribute('fill', 'currentColor')
    })
  })
})
