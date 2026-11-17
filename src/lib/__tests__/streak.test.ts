import { describe, it, expect } from 'vitest'
import { longestStreak, quietestDay } from '../streak'
import type { Play } from '../types'

const p = (date: string, ms = 60000): Play => ({
  trackId: 't1', artist: 'A', track: 'S', album: 'A', genre: 'Rock', playedAt: `${date}T10:00:00`, msPlayed: ms,
})

describe('longestStreak', () => {
  it('finds a 3-day run', () => {
    const s = longestStreak([p('2026-01-01'), p('2026-01-02'), p('2026-01-03'), p('2026-01-10')])
    expect(s?.lengthDays).toBe(3)
    expect(s?.start).toBe('2026-01-01')
    expect(s?.end).toBe('2026-01-03')
  })
  it('returns null for empty', () => { expect(longestStreak([])).toBeNull() })
  it('handles a single day', () => {
    expect(longestStreak([p('2026-01-05')])?.lengthDays).toBe(1)
  })
})

describe('quietestDay', () => {
  it('finds the lowest-minute day', () => {
    const d = quietestDay([p('2026-01-01', 60000), p('2026-01-02', 600000)])
    expect(d?.date).toBe('2026-01-01')
  })
  it('returns null for empty', () => { expect(quietestDay([])).toBeNull() })
})
