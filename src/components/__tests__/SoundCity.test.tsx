import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { SoundCity } from '../SoundCity'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('SoundCity', () => {
  it('renders a skyline with the top genre and artist tower', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<SoundCity genres={stats.topGenres} topArtist={stats.topArtists[0]} />)
    expect(html).toContain('Sound City')
    expect(html).toContain(stats.topGenres[0].genre)
    expect(html).toContain(stats.topArtists[0].name)
    expect(html).toContain('<svg')
  })
})
