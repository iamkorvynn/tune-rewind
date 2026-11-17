import type { Play, RankedItem } from './types'

export function minutesOf(ms: number): number {
  return ms / 60000
}

function rank(map: Map<string, { plays: number; minutes: number; extra?: string }>): RankedItem[] {
  return [...map.entries()]
    .map(([name, v]) => ({ name, plays: v.plays, minutes: v.minutes, extra: v.extra }))
    .sort((a, b) => b.minutes - a.minutes || b.plays - a.plays || a.name.localeCompare(b.name))
}

export function topArtists(plays: Play[], n = 5): RankedItem[] {
  const map = new Map<string, { plays: number; minutes: number; extra?: string }>()
  for (const p of plays) {
    const cur = map.get(p.artist) ?? { plays: 0, minutes: 0, extra: p.genre }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(p.artist, cur)
  }
  return rank(map).slice(0, n)
}

export function topTracks(plays: Play[], n = 5): RankedItem[] {
  const map = new Map<string, { plays: number; minutes: number; extra?: string }>()
  for (const p of plays) {
    const key = `${p.track} — ${p.artist}`
    const cur = map.get(key) ?? { plays: 0, minutes: 0, extra: p.genre }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(key, cur)
  }
  return rank(map).slice(0, n)
}

export function rankByPlays(items: RankedItem[]): RankedItem[] {
  return [...items].sort((a, b) => b.plays - a.plays)
}

export function topN<T>(items: T[], n: number, key: (x: T) => number): T[] {
  return [...items].sort((a, b) => key(b) - key(a)).slice(0, n)
}
