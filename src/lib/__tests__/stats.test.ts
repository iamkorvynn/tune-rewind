import { describe, it, expect } from 'vitest'
import { computeYearStats, peakHour, listeningPersona } from '../stats'
import type { Play } from '../types'

const mk = (n: number): Play[] => Array.from({ length: n }, (_, i) => ({
  trackId: `t${i % 3}`, artist: `Artist ${i % 3}`, track: `Track ${i % 3}`,
  album: 'A', genre: i % 2 ? 'Rock' : 'Jazz',
  playedAt: `2026-0${(i % 9) + 1}-15T21:00:00`, msPlayed: 180000,
}))

describe('computeYearStats', () => {
  it('computes totals and uniques', () => {
    const s = computeYearStats(mk(30))
    expect(s.totalPlays).toBe(30)
    expect(s.totalMinutes).toBe(90)
    expect(s.uniqueArtists).toBe(3)
    expect(s.uniqueTracks).toBe(3)
    expect(s.uniqueGenres).toBe(2)
    expect(s.topArtists).toHaveLength(5 - 2) // only 3 artists exist
    expect(s.playsByHour).toHaveLength(24)
    expect(s.playsByMonth.length).toBeGreaterThan(0)
    expect(s.topDay).not.toBeNull()
  })
  it('handles empty history', () => {
    const s = computeYearStats([])
    expect(s.totalMinutes).toBe(0)
    expect(s.topDay).toBeNull()
    expect(s.topArtists).toEqual([])
  })
})

describe('peakHour', () => {
  it('finds the busiest hour', () => {
    const h = new Array<number>(24).fill(0); h[21] = 9; h[8] = 4
    expect(peakHour(h)).toEqual({ hour: 21, plays: 9 })
  })
})

describe('listeningPersona', () => {
  it('returns a non-empty persona for real stats', () => {
    expect(listeningPersona(computeYearStats(mk(30)))).toMatch(/\S/)
  })
  it('returns Silent Listener for empty stats', () => {
    expect(listeningPersona(computeYearStats([]))).toBe('Silent Listener')
  })
})
