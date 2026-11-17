import type { Play, HistoryFile } from './types'

export function isValidPlay(p: unknown): p is Play {
  if (!p || typeof p !== 'object') return false
  const o = p as Record<string, unknown>
  return (
    typeof o.trackId === 'string' && o.trackId.length > 0 &&
    typeof o.artist === 'string' && o.artist.length > 0 &&
    typeof o.track === 'string' && o.track.length > 0 &&
    typeof o.genre === 'string' && o.genre.length > 0 &&
    typeof o.playedAt === 'string' && !Number.isNaN(Date.parse(o.playedAt)) &&
    typeof o.msPlayed === 'number' && o.msPlayed > 0 && o.msPlayed <= 24 * 3600 * 1000
  )
}

export function validateHistory(data: unknown): { ok: boolean; plays: Play[]; errors: string[] } {
  const errors: string[] = []
  if (!data || typeof data !== 'object' || !Array.isArray((data as HistoryFile).plays)) {
    return { ok: false, plays: [], errors: ['history file must be an object with a plays array'] }
  }
  const plays: Play[] = []
  ;(data as HistoryFile).plays.forEach((p, i) => {
    if (isValidPlay(p)) plays.push(p)
    else errors.push(`play #${i} is invalid`)
  })
  return { ok: errors.length === 0, plays, errors }
}
