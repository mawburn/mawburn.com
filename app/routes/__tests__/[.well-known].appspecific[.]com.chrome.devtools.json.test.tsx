import { describe, expect, it } from 'vitest'

import { loader } from '../[.well-known].appspecific[.]com.chrome.devtools.json'

describe('[.well-known].appspecific[.]com.chrome.devtools.json', () => {
  it('returns 404 response', () => {
    const response = loader()

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(404)
  })

  it('returns null body', async () => {
    const response = loader()

    const body = await response.text()
    expect(body).toBe('')
  })

  it('has correct response properties', () => {
    const response = loader()

    expect(response.ok).toBe(false)
    expect(response.statusText).toBe('')
    expect(response.headers).toBeDefined()
  })

  describe('Edge cases', () => {
    it('always returns the same 404 response', () => {
      const response1 = loader()
      const response2 = loader()

      expect(response1.status).toBe(404)
      expect(response2.status).toBe(404)
      expect(response1.status).toBe(response2.status)
    })

    it('response has no content-type header', () => {
      const response = loader()

      expect(response.headers.get('content-type')).toBeNull()
    })

    it('response has no content-length header', () => {
      const response = loader()

      expect(response.headers.get('content-length')).toBeNull()
    })
  })
})
