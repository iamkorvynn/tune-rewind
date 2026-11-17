import { describe, it, expect } from 'vitest'
import { samplePlays } from '../sampleData'
import { validateHistory } from '../../lib/validate'
import { computeYearStats } from '../../lib/stats'
import raw from '../sample-history.json'

describe('bundled sample data', () => {
  it('loads and validates', () => {
    const r = validateHistory(raw as unknown)
    expect(r.ok).toBe(true)
    expect(r.plays.length).toBeGreaterThan(3000)
  })
  it('covers ~40 artists, ~120 tracks, 12 genres over a year', () => {
    const stats = computeYearStats(samplePlays)
    expect(stats.uniqueArtists).toBeGreaterThanOrEqual(35)
    expect(stats.uniqueTracks).toBeGreaterThanOrEqual(100)
    expect(stats.uniqueGenres).toBeGreaterThanOrEqual(10)
    expect(stats.totalMinutes).toBeGreaterThan(5000)
    expect(stats.playsByMonth.length).toBeGreaterThanOrEqual(12)
  })
  it('has a peak hour in the evening', () => {
    const stats = computeYearStats(samplePlays)
    const peak = stats.playsByHour.indexOf(Math.max(...stats.playsByHour))
    expect(peak).toBeGreaterThanOrEqual(18)
  })
  it('top artist has a clear lead', () => {
    const stats = computeYearStats(samplePlays)
    expect(stats.topArtists[0].minutes).toBeGreaterThan(stats.topArtists[1].minutes)
  })
})
