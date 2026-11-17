import { describe, it, expect } from 'vitest'
import { buildInsights } from '../insights'
import { computeYearStats } from '../stats'
import type { Play } from '../types'

const plays: Play[] = Array.from({ length: 20 }, (_, i) => ({
  trackId: 't1', artist: 'A', track: 'Song', album: 'A', genre: 'Rock',
  playedAt: `2026-06-${String((i % 28) + 1).padStart(2, '0')}T21:00:00`, msPlayed: 180000,
}))

describe('buildInsights', () => {
  it('returns several human-readable insights', () => {
    const insights = buildInsights(computeYearStats(plays))
    expect(insights.length).toBeGreaterThanOrEqual(3)
    expect(insights.join(' ')).toContain('Rock')
  })
  it('handles empty stats', () => {
    expect(buildInsights(computeYearStats([]))).toHaveLength(0)
  })
})
