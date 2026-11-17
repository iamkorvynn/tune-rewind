import { describe, it, expect } from 'vitest'
import { monthlyGrowth, biggestJump, quietestMonth, averageMonthlyMinutes } from '../growth'
import type { MonthBucket } from '../types'

const months: MonthBucket[] = [
  { month: '2026-01', label: 'Jan 26', plays: 100, minutes: 100 },
  { month: '2026-02', label: 'Feb 26', plays: 150, minutes: 150 },
  { month: '2026-03', label: 'Mar 26', plays: 90, minutes: 90 },
]

describe('monthlyGrowth', () => {
  it('computes change vs previous month', () => {
    const g = monthlyGrowth(months)
    expect(g[0].changePct).toBeNull()
    expect(g[1].changePct).toBeCloseTo(0.5)
    expect(g[2].changePct).toBeCloseTo(-0.4)
  })
})
describe('biggestJump', () => {
  it('finds the largest increase', () => {
    expect(biggestJump(months)?.month).toBe('2026-02')
  })
  it('returns null for a single month', () => {
    expect(biggestJump([months[0]])).toBeNull()
  })
})
describe('quietestMonth', () => {
  it('finds the lowest month', () => {
    expect(quietestMonth(months)?.month).toBe('2026-03')
    expect(quietestMonth([])).toBeNull()
  })
})

describe('averageMonthlyMinutes', () => {
  it('averages minutes across months', () => {
    expect(averageMonthlyMinutes(months)).toBeCloseTo((100 + 150 + 90) / 3)
    expect(averageMonthlyMinutes([])).toBe(0)
  })
})