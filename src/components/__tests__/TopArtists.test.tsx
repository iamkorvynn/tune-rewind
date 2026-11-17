import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopArtists } from '../TopArtists'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('TopArtists', () => {
  it('renders the top artist name and minutes', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<TopArtists artists={stats.topArtists} />)
    expect(html).toContain(stats.topArtists[0].name)
    expect(html).toContain('Top artists')
  })
})
