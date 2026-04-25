import { describe, expect, it } from 'vitest'

import { formatBuildTimestampMesz, getBuildInfo } from './buildInfo'

describe('formatBuildTimestampMesz', () => {
  it('formats a UTC timestamp into Europe/Berlin time with MESZ suffix', () => {
    expect(formatBuildTimestampMesz('2026-04-22T20:42:15Z')).toBe('22.04.2026, 22:42:15 MESZ')
  })

  it('returns null for invalid timestamps', () => {
    expect(formatBuildTimestampMesz('not-a-date')).toBeNull()
  })
})

describe('getBuildInfo', () => {
  it('returns normalized build metadata when provided', () => {
    expect(
      getBuildInfo({
        version: '0.1.0',
        sha: 'e3944c6e837692fc2a531b721a88aa4870d6d500',
        builtAtUtc: '2026-04-22T20:42:15Z',
      })
    ).toEqual({
      version: '0.1.0',
      shaShort: 'e3944c6',
      builtAtMesz: '22.04.2026, 22:42:15 MESZ',
    })
  })
})
