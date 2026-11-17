import { describe, it, expect } from 'vitest'
import { buildSoundCity, genreColor, skylineSummary, tallestBuilding } from '../soundCity'
import type { GenreShare } from '../types'

const genres: GenreShare[] = [
  { genre: 'Rock', minutes: 1000, plays: 300, share: 0.5 },
  { genre: 'Jazz', minutes: 500, plays: 150, share: 0.25 },
  { genre: 'Folk', minutes: 250, plays: 80, share: 0.125 },
]

describe('buildSoundCity', () => {
  it('normalises tallest building to 100', () => {
    const city = buildSoundCity(genres, { name: 'Top', plays: 10, minutes: 1000 })
    expect(city[0].height).toBe(100)
    expect(city[1].height).toBe(50)
    expect(city[0].isTower).toBe(true)
    expect(city[0].label).toContain('Top')
    expect(city[1].isTower).toBe(false)
  })
  it('caps at 10 buildings', () => {
    const many = Array.from({ length: 15 }, (_, i) => ({ genre: `G${i}`, minutes: 100 - i, plays: 10, share: 0.05 }))
    expect(buildSoundCity(many, null)).toHaveLength(10)
  })
  it('returns empty for no genres', () => { expect(buildSoundCity([], null)).toEqual([]) })
})

describe('genreColor', () => {
  it('returns a colour for known and unknown genres', () => {
    expect(genreColor('Rock')).toMatch(/^#/)
    expect(genreColor('Made Up Genre')).toMatch(/^#/)
  })
})

describe('skylineSummary', () => {
  it('mentions the tallest building', () => {
    const city = buildSoundCity(genres, null)
    expect(skylineSummary(city)).toContain('Rock')
  })
  it('handles an empty skyline', () => {
    expect(skylineSummary([])).toContain('No skyline')
  })
})

describe('tallestBuilding', () => {
  it('returns the tallest building', () => {
    const city = buildSoundCity(genres, null)
    expect(tallestBuilding(city)?.genre).toBe('Rock')
    expect(tallestBuilding([])).toBeNull()
  })
})