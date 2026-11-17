import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { ListeningClock } from '../ListeningClock'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('ListeningClock', () => {
  it('renders the clock and peak hour', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<ListeningClock playsByHour={stats.playsByHour} />)
    expect(html).toContain('Listening clock')
    expect(html).toContain('9pm')
  })
})
