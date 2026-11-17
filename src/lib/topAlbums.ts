import type { Play, RankedItem } from './types'
import { minutesOf } from './topN'

export function topAlbums(plays: Play[], n = 5): RankedItem[] {
  const map = new Map<string, { plays: number; minutes: number; extra?: string }>()
  for (const p of plays) {
    const key = `${p.album} — ${p.artist}`
    const cur = map.get(key) ?? { plays: 0, minutes: 0, extra: p.genre }
    cur.plays += 1
    cur.minutes += minutesOf(p.msPlayed)
    map.set(key, cur)
  }
  return [...map.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.minutes - a.minutes || b.plays - a.plays)
    .slice(0, n)
}
