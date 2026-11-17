import type { MonthBucket } from './types'

export interface MonthGrowth {
  month: string
  label: string
  changePct: number | null // vs previous month, null for first month
}

export function monthlyGrowth(months: MonthBucket[]): MonthGrowth[] {
  return months.map((m, i) => ({
    month: m.month,
    label: m.label,
    changePct: i === 0 || months[i - 1].minutes === 0 ? null : (m.minutes - months[i - 1].minutes) / months[i - 1].minutes,
  }))
}

export function biggestJump(months: MonthBucket[]): MonthGrowth | null {
  const g = monthlyGrowth(months).filter((x) => x.changePct !== null)
  if (g.length === 0) return null
  return g.reduce((a, b) => (b.changePct! > a.changePct! ? b : a))
}

export function quietestMonth(months: MonthBucket[]): MonthBucket | null {
  if (months.length === 0) return null
  return [...months].sort((a, b) => a.minutes - b.minutes)[0]
}
