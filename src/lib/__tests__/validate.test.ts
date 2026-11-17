import { describe, it, expect } from 'vitest'
import { isValidPlay, validateHistory } from '../validate'

const good = { trackId: 't1', artist: 'A', track: 'Song', album: 'A', genre: 'Rock', playedAt: '2026-01-01T10:00:00', msPlayed: 60000 }

describe('isValidPlay', () => {
  it('accepts a well-formed play', () => { expect(isValidPlay(good)).toBe(true) })
  it('rejects bad dates, zero ms, missing artist', () => {
    expect(isValidPlay({ ...good, playedAt: 'not-a-date' })).toBe(false)
    expect(isValidPlay({ ...good, msPlayed: 0 })).toBe(false)
    expect(isValidPlay({ ...good, artist: '' })).toBe(false)
    expect(isValidPlay(null)).toBe(false)
  })
})

describe('validateHistory', () => {
  it('keeps good plays and reports bad ones', () => {
    const r = validateHistory({ plays: [good, { ...good, msPlayed: -1 }] })
    expect(r.plays).toHaveLength(1)
    expect(r.errors).toHaveLength(1)
    expect(r.ok).toBe(false)
  })
  it('rejects non-objects', () => {
    expect(validateHistory(null).ok).toBe(false)
    expect(validateHistory({ plays: 'nope' }).ok).toBe(false)
  })
})
