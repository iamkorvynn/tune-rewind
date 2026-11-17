import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopDay } from '../TopDay'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('TopDay', () => {
  it('renders the biggest day', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<TopDay stats={stats} />)
    expect(html).toContain('Your biggest day')
    expect(html).toContain('loudest day')
  })
})
