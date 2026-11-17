import { describe, it, expect } from 'vitest'
import { summaryShareText } from '../shareText'
import { computeYearStats } from '../stats'
import { samplePlays } from '../../data/sampleData'

describe('summaryShareText', () => {
  it('builds a paste-ready summary', () => {
    const text = summaryShareText(computeYearStats(samplePlays))
    expect(text).toContain('TuneRewind')
    expect(text).toContain('Top artist:')
    expect(text).toContain('Top genre:')
    expect(text).toContain('Top track:')
  })
})
