import type { Play, GenreShare, MonthBucket } from './types'
import { minutesOf } from './topN'
import { monthLabel } from './format'

export function totalMinutes(plays: Play[]): number {
  return plays.reduce((s, p) => s + minutesOf(p.msPlayed), 0)
}

export function genreShare(plays: Play[]): GenreShare[] {
  const total = totalMinutes(plays)
  const map = new Map<string, { minutes: number; plays: number }>()
  for (const p of plays) {
    const cur = map.get(p.genre) ?? { minutes: 0, plays: 0 }
    cur.minutes += minutesOf(p.msPlayed)
    cur.plays += 1
    map.set(p.genre, cur)
  }
  return [...map.entries()]
    .map(([genre, v]) => ({ genre, minutes: v.minutes, plays: v.plays, share: total > 0 ? v.minutes / total : 0 }))
    .sort((a, b) => b.minutes - a.minutes)
}

export function playsByHour(plays: Play[]): number[] {
  const buckets = new Array<number>(24).fill(0)
  for (const p of plays) buckets[new Date(p.playedAt).getHours()] += 1
  return buckets
}

export function playsByMonth(plays: Play[]): MonthBucket[] {
  const map = new Map<string, { plays: number; minutes: number }>()
  for (const p of plays) {
    const key = p.playedAt.slice(0, 7)
    const cur = map.get(key) ?? { plays: 0, minutes: 0 }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(key, cur)
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({ month, label: monthLabel(month), plays: v.plays, minutes: v.minutes }))
}

export function topListeningDay(plays: Play[]): { date: string; plays: number; minutes: number } | null {
  if (plays.length === 0) return null
  const map = new Map<string, { plays: number; minutes: number }>()
  for (const p of plays) {
    const key = p.playedAt.slice(0, 10)
    const cur = map.get(key) ?? { plays: 0, minutes: 0 }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(key, cur)
  }
  const [date, v] = [...map.entries()].sort((a, b) => b[1].minutes - a[1].minutes)[0]
  return { date, plays: v.plays, minutes: v.minutes }
}

export function minutesPerArtist(plays: Play[]): { name: string; plays: number; minutes: number }[] {
  const map = new Map<string, { plays: number; minutes: number }>()
  for (const p of plays) {
    const cur = map.get(p.artist) ?? { plays: 0, minutes: 0 }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(p.artist, cur)
  }
  return [...map.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.minutes - a.minutes)
}
