import { describe, it, expect } from 'vitest'
import { statsToJson, topArtistsToCsv } from '../export'
import { computeYearStats } from '../stats'
import { samplePlays } from '../../data/sampleData'

describe('statsToJson', () => {
  it('serialises the key stats', () => {
    const json = statsToJson(computeYearStats(samplePlays))
    const obj = JSON.parse(json)
    expect(obj.generatedBy).toBe('TuneRewind')
    expect(obj.totalPlays).toBe(samplePlays.length)
    expect(obj.topArtists).toHaveLength(5)
  })
})

describe('topArtistsToCsv', () => {
  it('produces a header plus one row per artist', () => {
    const csv = topArtistsToCsv(computeYearStats(samplePlays))
    const lines = csv.split('\n')
    expect(lines[0]).toBe('rank,artist,genre,plays,minutes')
    expect(lines.length).toBe(6)
    expect(lines[1]).toContain('Neon Coastline')
  })
})
