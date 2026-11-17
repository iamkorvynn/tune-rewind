import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopAlbums } from '../TopAlbums'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('TopAlbums', () => {
  it('renders the top album', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<TopAlbums albums={stats.topAlbums} />)
    expect(html).toContain('Top albums')
    expect(html).toContain(stats.topAlbums[0].name.split(' — ')[0])
  })
})
