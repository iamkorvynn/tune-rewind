import { describe, it, expect } from 'vitest'
import { profiles } from '../profiles'
import { validateHistory } from '../../lib/validate'
import { computeYearStats } from '../../lib/stats'

describe('listener profiles', () => {
  it('loads three valid profiles', () => {
    expect(profiles).toHaveLength(3)
    for (const p of profiles) {
      expect(validateHistory({ plays: p.plays }).ok).toBe(true)
      expect(p.plays.length).toBeGreaterThan(2000)
    }
  })
  it('night owl peaks late, jazz devotee is jazz-led', () => {
    const owl = computeYearStats(profiles.find((p) => p.id === 'night-owl')!.plays)
    const jazz = computeYearStats(profiles.find((p) => p.id === 'jazz-devotee')!.plays)
    const owlPeak = owl.playsByHour.indexOf(Math.max(...owl.playsByHour))
    expect(owlPeak).toBeGreaterThanOrEqual(21)
    expect(jazz.topGenres[0].genre).toBe('Jazz')
  })
  it('genre explorer has no dominant genre', () => {
    const ex = computeYearStats(profiles.find((p) => p.id === 'genre-explorer')!.plays)
    expect(ex.topGenres[0].share).toBeLessThan(0.25)
  })
})
