import { afterEach, describe, expect, it } from 'vitest'

import { reloadOnce } from '../reload-once'

describe('reloadOnce', () => {
  afterEach(() => {
    window.sessionStorage.clear()
  })

  it('allows the first reload for a URL', () => {
    expect(reloadOnce('/blog', 1_000)).toBe(true)
  })

  it('refuses a second reload within 10 seconds', () => {
    reloadOnce('/blog', 1_000)
    expect(reloadOnce('/blog', 5_000)).toBe(false)
  })

  it('allows another reload after 10 seconds', () => {
    reloadOnce('/blog', 1_000)
    expect(reloadOnce('/blog', 11_000)).toBe(true)
  })

  it('tracks URLs separately', () => {
    reloadOnce('/blog', 1_000)
    expect(reloadOnce('/blog?category=all', 2_000)).toBe(true)
  })

  it('never reloads when storage is unavailable', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'sessionStorage')!
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      get() {
        throw new Error('blocked')
      },
    })
    try {
      expect(reloadOnce('/blog', 1_000)).toBe(false)
    } finally {
      Object.defineProperty(window, 'sessionStorage', original)
    }
  })
})
