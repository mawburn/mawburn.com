import { describe, expect, it } from 'vitest'

import * as Icons from '../index'

describe('Icons index', () => {
  it('exports all expected icon components', () => {
    expect(Icons.AnimatedXTwitterIcon).toBeDefined()
    expect(Icons.Bluesky).toBeDefined()
    expect(Icons.CopyIcon).toBeDefined()
    expect(Icons.EmailIcon).toBeDefined()
    expect(Icons.GitHubIcon).toBeDefined()
    expect(Icons.InstagramIcon).toBeDefined()
    expect(Icons.LinkedIn).toBeDefined()
    expect(Icons.RSSIcon).toBeDefined()
    expect(Icons.TwitterBirdIcon).toBeDefined()
    expect(Icons.XIcon).toBeDefined()
  })

  it('exports functions, not other types', () => {
    expect(typeof Icons.AnimatedXTwitterIcon).toBe('function')
    expect(typeof Icons.Bluesky).toBe('function')
    expect(typeof Icons.CopyIcon).toBe('function')
    expect(typeof Icons.EmailIcon).toBe('function')
    expect(typeof Icons.GitHubIcon).toBe('function')
    expect(typeof Icons.InstagramIcon).toBe('function')
    expect(typeof Icons.LinkedIn).toBe('function')
    expect(typeof Icons.RSSIcon).toBe('function')
    expect(typeof Icons.TwitterBirdIcon).toBe('function')
    expect(typeof Icons.XIcon).toBe('function')
  })

  it('exports exactly 10 icons', () => {
    const exportedItems = Object.keys(Icons)
    expect(exportedItems).toHaveLength(10)
  })

  describe('Edge cases', () => {
    it('does not export default', () => {
      expect((Icons as any).default).toBeUndefined()
    })

    it('all exports have unique names', () => {
      const exportNames = Object.keys(Icons)
      const uniqueNames = new Set(exportNames)
      expect(uniqueNames.size).toBe(exportNames.length)
    })

    it('no exports are null or undefined', () => {
      Object.values(Icons).forEach(icon => {
        expect(icon).not.toBeNull()
        expect(icon).not.toBeUndefined()
      })
    })
  })
})
