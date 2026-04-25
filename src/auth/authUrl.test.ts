import { describe, expect, it } from 'vitest'

import {
  buildAuthApiBase,
  buildMagicLinkLoginUrl,
  readMagicLinkParams,
} from './authUrl'

describe('buildAuthApiBase', () => {
  it('prefers an explicit public API url when provided', () => {
    expect(
      buildAuthApiBase({
        explicitApiUrl: 'https://h-town.duckdns.org/combat/api/',
        explicitBasePath: '/combat',
      })
    ).toBe('https://h-town.duckdns.org/combat/api')
  })

  it('uses the configured base path for browser-safe relative API calls', () => {
    expect(
      buildAuthApiBase({
        explicitApiUrl: '',
        explicitBasePath: '/combat',
      })
    ).toBe('/combat/api')
  })

  it('ignores a localhost API override when a production base path is configured', () => {
    expect(
      buildAuthApiBase({
        explicitApiUrl: 'http://localhost:3000',
        explicitBasePath: '/combat',
      })
    ).toBe('/combat/api')
  })

  it('falls back to a relative local API path when no base path is configured', () => {
    expect(
      buildAuthApiBase({
        explicitApiUrl: '',
        explicitBasePath: '',
      })
    ).toBe('/api')
  })
})

describe('buildMagicLinkLoginUrl', () => {
  it('targets the actual app entry point instead of a missing /auth route', () => {
    expect(
      buildMagicLinkLoginUrl('https://h-town.duckdns.org/combat/', 'pilot@example.com', 'ABC123')
    ).toBe('https://h-town.duckdns.org/combat?email=pilot%40example.com&code=ABC123')
  })
})

describe('readMagicLinkParams', () => {
  it('extracts email and code from the current query string', () => {
    expect(readMagicLinkParams('?email=pilot%40example.com&code=ABC123')).toEqual({
      email: 'pilot@example.com',
      code: 'ABC123',
    })
  })

  it('returns null when the query does not contain a complete magic link', () => {
    expect(readMagicLinkParams('?email=pilot%40example.com')).toBeNull()
  })
})
