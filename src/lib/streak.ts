import { minutesOf } from './topN'
import type { Play } from './types'

export interface Streak {
  lengthDays: number
  start: string
  end: string
}

/** Longest run of consecutive days with at least one play. */
export function longestStreak(plays: Play[]): Streak | null {
  const days = [...new Set(plays.map((p) => p.playedAt.slice(0, 10)))].sort()
  if (days.length === 0) return null
  let best: Streak = { lengthDays: 1, start: days[0], end: days[0] }
  let cur: Streak = { lengthDays: 1, start: days[0], end: days[0] }
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]).getTime()
    const now = new Date(days[i]).getTime()
    if (now - prev === 86400000) {
      cur = { lengthDays: cur.lengthDays + 1, start: cur.start, end: days[i] }
    } else {
      cur = { lengthDays: 1, start: days[i], end: days[i] }
    }
    if (cur.lengthDays > best.lengthDays) best = cur
  }
  return best
}

export function quietestDay(plays: Play[]): { date: string; minutes: number } | null {
  if (plays.length === 0) return null
  const map = new Map<string, number>()
  for (const p of plays) map.set(p.playedAt.slice(0, 10), (map.get(p.playedAt.slice(0, 10)) ?? 0) + minutesOf(p.msPlayed))
  const [date, minutes] = [...map.entries()].sort((a, b) => a[1] - b[1])[0]
  return { date, minutes }
}
