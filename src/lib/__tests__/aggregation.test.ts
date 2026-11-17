import { describe, it, expect } from 'vitest'
import { totalMinutes, genreShare, playsByHour, playsByMonth, topListeningDay, minutesPerArtist } from '../aggregation'
import type { Play } from '../types'

const p = (genre: string, at: string, ms = 60000): Play => ({
  trackId: 't1', artist: 'A', track: 'Song', album: 'A', genre, playedAt: at, msPlayed: ms,
})

describe('totalMinutes', () => {
  it('sums msPlayed', () => { expect(totalMinutes([p('Rock', '2026-01-01T10:00:00'), p('Rock', '2026-01-01T11:00:00', 120000)])).toBe(3) })
  it('is 0 for empty', () => { expect(totalMinutes([])).toBe(0) })
})

describe('genreShare', () => {
  it('shares sum to 1 and sort by minutes desc', () => {
    const plays = [p('Rock', '2026-01-01T10:00:00', 120000), p('Jazz', '2026-01-01T10:00:00', 60000)]
    const s = genreShare(plays)
    expect(s[0].genre).toBe('Rock')
    expect(s.reduce((a, g) => a + g.share, 0)).toBeCloseTo(1)
    expect(s[0].share).toBeCloseTo(2 / 3)
  })
  it('is empty for no plays', () => { expect(genreShare([])).toEqual([]) })
})

describe('playsByHour', () => {
  it('buckets 24 hours', () => {
    const h = playsByHour([p('Rock', '2026-01-01T08:15:00'), p('Rock', '2026-01-01T08:45:00'), p('Rock', '2026-01-01T22:00:00')])
    expect(h).toHaveLength(24)
    expect(h[8]).toBe(2)
    expect(h[22]).toBe(1)
    expect(h[0]).toBe(0)
  })
})

describe('playsByMonth', () => {
  it('groups and sorts chronologically', () => {
    const m = playsByMonth([p('Rock', '2026-03-01T10:00:00'), p('Rock', '2026-01-01T10:00:00'), p('Rock', '2026-01-02T10:00:00')])
    expect(m.map((x) => x.month)).toEqual(['2026-01', '2026-03'])
    expect(m[0].plays).toBe(2)
  })
})

describe('topListeningDay', () => {
  it('finds the day with most minutes', () => {
    const d = topListeningDay([p('Rock', '2026-01-01T10:00:00', 60000), p('Rock', '2026-01-02T10:00:00', 600000)])
    expect(d?.date).toBe('2026-01-02')
    expect(d?.minutes).toBe(10)
  })
  it('is null for empty', () => { expect(topListeningDay([])).toBeNull() })
})

describe('minutesPerArtist', () => {
  it('aggregates minutes per artist, desc', () => {
    const plays = [p('Rock', '2026-01-01T10:00:00', 60000)]
    plays[0] = { ...plays[0], artist: 'Zed' }
    const plays2 = [...plays, { ...p('Rock', '2026-01-01T11:00:00', 300000), artist: 'Amy' }]
    const m = minutesPerArtist(plays2)
    expect(m[0].name).toBe('Amy')
  })
})

describe('playsByWeekday', () => {
  it('buckets by day of week, Sunday first', () => {
    const w = playsByWeekday([
      { trackId: 't1', artist: 'A', track: 'S', album: 'A', genre: 'Rock', playedAt: '2026-06-07T10:00:00', msPlayed: 60000 },
      { trackId: 't1', artist: 'A', track: 'S', album: 'A', genre: 'Rock', playedAt: '2026-06-08T10:00:00', msPlayed: 60000 },
    ])
    expect(w).toHaveLength(7)
    expect(w[0]).toBe(1) // 2026-06-07 is a Sunday
    expect(w[1]).toBe(1) // 2026-06-08 is a Monday
    expect(w[2]).toBe(0)
  })
})