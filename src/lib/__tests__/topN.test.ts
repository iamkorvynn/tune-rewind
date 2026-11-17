import { describe, it, expect } from 'vitest'
import { topArtists, topTracks, topN, minutesOf } from '../topN'
import type { Play } from '../types'

const p = (artist: string, track: string, ms: number, genre = 'Rock'): Play => ({
  trackId: track, artist, track, album: 'A', genre, playedAt: '2026-06-01T10:00:00', msPlayed: ms,
})

describe('minutesOf', () => {
  it('converts ms to minutes', () => { expect(minutesOf(60000)).toBe(1); expect(minutesOf(90000)).toBe(1.5) })
})

describe('topArtists', () => {
  it('ranks by minutes, not play count', () => {
    const plays = [p('A', 'a1', 60000), p('A', 'a1', 60000), p('B', 'b1', 600000)]
    const top = topArtists(plays, 2)
    expect(top[0].name).toBe('B')
    expect(top[0].minutes).toBe(10)
    expect(top[1].name).toBe('A')
  })
  it('respects the limit', () => {
    const plays = [p('A', 'a', 60000), p('B', 'b', 60000), p('C', 'c', 60000)]
    expect(topArtists(plays, 2)).toHaveLength(2)
  })
  it('returns empty for no plays', () => { expect(topArtists([], 5)).toEqual([]) })
})

describe('topTracks', () => {
  it('groups by track + artist and sums minutes', () => {
    const plays = [p('A', 'Song', 120000), p('A', 'Song', 120000), p('A', 'Other', 60000)]
    const top = topTracks(plays, 2)
    expect(top[0].name).toContain('Song')
    expect(top[0].minutes).toBe(4)
    expect(top[0].plays).toBe(2)
  })
})

describe('topN', () => {
  it('takes the top n by key', () => {
    expect(topN([1, 5, 3], 2, (x) => x)).toEqual([5, 3])
  })
})
