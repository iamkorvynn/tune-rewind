import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { StreakPanel } from '../StreakPanel'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('StreakPanel', () => {
  it('renders the longest streak in days', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<StreakPanel streak={stats.streak} />)
    expect(html).toContain('Longest streak')
    expect(html).toContain('days in a row')
  })
  it('handles no streak', () => {
    expect(renderToString(<StreakPanel streak={null} />)).toContain('No listening days yet')
  })
})
