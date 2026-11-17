import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Timeline } from '../Timeline'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('Timeline', () => {
  it('renders every month', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<Timeline months={stats.playsByMonth} />)
    expect(html).toContain('Month by month')
    expect(html).toContain('Jun')
  })
})
