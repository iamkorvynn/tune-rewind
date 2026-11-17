import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MonthlyTrend } from '../MonthlyTrend'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('MonthlyTrend', () => {
  it('renders the trend line and biggest jump', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<MonthlyTrend months={stats.playsByMonth} />)
    expect(html).toContain('Monthly trend')
    expect(html).toContain('Biggest jump')
    expect(html).toContain('<svg')
  })
})
