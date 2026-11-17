import { describe, it, expect } from 'vitest'
import { profileMetas, loadProfile } from '../profiles'
import { validateHistory } from '../../lib/validate'
import { computeYearStats } from '../../lib/stats'

describe('listener profiles', () => {
  it('lists three profile metas', () => {
    expect(profileMetas).toHaveLength(3)
    expect(profileMetas.map((p) => p.id)).toEqual(['night-owl', 'jazz-devotee', 'genre-explorer'])
  })
  it('loads three valid profiles', async () => {
    for (const meta of profileMetas) {
      const p = await loadProfile(meta)
      expect(validateHistory({ plays: p.plays }).ok).toBe(true)
      expect(p.plays.length).toBeGreaterThan(2000)
    }
  })
  it('night owl peaks late, jazz devotee is jazz-led', async () => {
    const owl = computeYearStats((await loadProfile(profileMetas[0])).plays)
    const jazz = computeYearStats((await loadProfile(profileMetas[1])).plays)
    const owlPeak = owl.playsByHour.indexOf(Math.max(...owl.playsByHour))
    expect(owlPeak).toBeGreaterThanOrEqual(21)
    expect(jazz.topGenres[0].genre).toBe('Jazz')
  })
  it('genre explorer has no dominant genre', async () => {
    const ex = computeYearStats((await loadProfile(profileMetas[2])).plays)
    expect(ex.topGenres[0].share).toBeLessThan(0.25)
  })
})
