import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopTracks } from '../TopTracks'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('TopTracks', () => {
  it('renders the top track', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<TopTracks tracks={stats.topTracks} />)
    expect(html).toContain('Top tracks')
    expect(html).toContain(stats.topTracks[0].name.split(' — ')[0])
  })
})
