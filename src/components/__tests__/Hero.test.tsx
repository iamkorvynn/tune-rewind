import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Hero } from '../Hero'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('Hero', () => {
  it('renders total minutes and persona', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<Hero stats={stats} persona="Genre Explorer" />)
    expect(html).toContain('You listened to')
    expect(html).toContain('Genre Explorer')
  })
})
