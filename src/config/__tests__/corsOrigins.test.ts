import { describe, expect, it } from 'vitest'
import { ALLOWED_CORS_ORIGINS, isOriginAllowed } from '../corsOrigins'

describe('corsOrigins', () => {
  it('allows all configured origins', () => {
    for (const origin of ALLOWED_CORS_ORIGINS) {
      expect(isOriginAllowed(origin)).toBe(true)
    }
  })

  it('rejects null or unknown origins', () => {
    expect(isOriginAllowed(null)).toBe(false)
    expect(isOriginAllowed('https://redline.duckdns.org')).toBe(false)
    expect(isOriginAllowed('https://evil.example.com')).toBe(false)
  })
})
