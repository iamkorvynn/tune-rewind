import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopGenres } from '../TopGenres'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('TopGenres', () => {
  it('renders genre shares', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<TopGenres genres={stats.topGenres} />)
    expect(html).toContain(stats.topGenres[0].genre)
    expect(html).toContain('%')
  })
})
