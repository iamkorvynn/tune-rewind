import { describe, it, expect } from 'vitest'
import { topAlbums } from '../topAlbums'
import type { Play } from '../types'

const p = (album: string, artist: string, ms: number): Play => ({
  trackId: 't1', artist, track: 'S', album, genre: 'Rock', playedAt: '2026-01-01T10:00:00', msPlayed: ms,
})

describe('topAlbums', () => {
  it('ranks albums by minutes', () => {
    const top = topAlbums([p('Big', 'A', 600000), p('Small', 'B', 60000), p('Big', 'A', 60000)], 2)
    expect(top[0].name).toContain('Big')
    expect(top[0].minutes).toBe(11)
  })
  it('respects the limit and handles empty', () => {
    expect(topAlbums([], 5)).toEqual([])
    expect(topAlbums([p('A', 'X', 60000)], 1)).toHaveLength(1)
  })
})
