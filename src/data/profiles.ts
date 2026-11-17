import type { Play, DataSource } from '../lib/types'
import { validateHistory } from '../lib/validate'
import nightOwl from './profiles/night-owl.json'
import jazzDevotee from './profiles/jazz-devotee.json'
import genreExplorer from './profiles/genre-explorer.json'

export interface ListenerProfile {
  id: string
  name: string
  blurb: string
  plays: Play[]
}

function load(id: string, name: string, blurb: string, raw: unknown): ListenerProfile {
  const checked = validateHistory(raw as unknown)
  if (!checked.ok) console.warn(`Profile ${id} had invalid rows:`, checked.errors.slice(0, 3))
  return { id, name, blurb, plays: checked.plays }
}

export const profiles: ListenerProfile[] = [
  load('night-owl', 'Night Owl', 'Mostly after dark — Electronic and Lo-Fi past midnight.', nightOwl),
  load('jazz-devotee', 'Jazz Devotee', 'Mornings and evenings, Jazz and Classical, long sessions.', jazzDevotee),
  load('genre-explorer', 'Genre Explorer', 'Flat across all 12 genres — no single home base.', genreExplorer),
]

export function profileSource(profile: ListenerProfile): DataSource {
  return {
    kind: 'sample',
    label: `Sample profile: ${profile.name} — ${profile.blurb}`,
    plays: profile.plays,
  }
}
