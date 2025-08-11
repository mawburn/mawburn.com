import { render } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

vi.mock('three', () => ({
  WebGLRenderer: vi.fn(() => ({
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    render: vi.fn(),
    domElement: { style: {} },
    dispose: vi.fn(),
  })),
  Scene: vi.fn(() => ({
    add: vi.fn(),
    remove: vi.fn(),
  })),
  PerspectiveCamera: vi.fn(() => ({
    position: { set: vi.fn() },
    lookAt: vi.fn(),
  })),
  Vector3: vi.fn(),
  Color: vi.fn(),
  Group: vi.fn(() => ({
    add: vi.fn(),
    rotation: { x: 0, y: 0, z: 0 },
  })),
  GridHelper: vi.fn(),
  PlaneGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
  Mesh: vi.fn(() => ({
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
  })),
}))

vi.mock('~/components/SynthwaveBackground/utils/useThreeScene', () => ({
  useThreeScene: vi.fn(() => ({
    containerRef: { current: document.createElement('div') },
    scene: {
      add: vi.fn(),
      remove: vi.fn(),
    },
    camera: {
      position: { set: vi.fn() },
      lookAt: vi.fn(),
    },
    renderer: {
      render: vi.fn(),
    },
    animationFrameRef: { current: null },
    prefersReducedMotion: false,
  })),
}))

vi.mock('~/components/SynthwaveBackground/utils/animate', () => ({
  animateScene: vi.fn(),
}))

vi.mock('~/components/SynthwaveBackground/objects/WireframeObjects', () => ({
  createWireframeObjects: vi.fn(() => ({})),
}))

import SynthwaveBackground from '~/components/SynthwaveBackground'

describe('SynthwaveBackground', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders with correct attributes', () => {
    const { container } = render(<SynthwaveBackground />)
    const backgroundDiv = container.firstChild as HTMLElement

    expect(backgroundDiv).toBeDefined()
    expect(backgroundDiv).toHaveAttribute('aria-hidden', 'true')
    expect(backgroundDiv.style.position).toBe('fixed')
    expect(backgroundDiv.style.inset).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<SynthwaveBackground className="custom-class" />)
    const backgroundDiv = container.firstChild as HTMLElement

    expect(backgroundDiv.className).toContain('custom-class')
  })
})
