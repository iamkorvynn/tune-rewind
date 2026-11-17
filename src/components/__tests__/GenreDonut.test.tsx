import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { GenreDonut } from '../GenreDonut'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('GenreDonut', () => {
  it('renders the genre mix donut', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<GenreDonut genres={stats.topGenres} />)
    expect(html).toContain('Genre mix')
    expect(html).toContain(stats.topGenres[0].genre)
    expect(html).toContain('<svg')
  })
})
