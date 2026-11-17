import type { Play, DataSource } from '../lib/types'
import { validateHistory } from '../lib/validate'

export interface ListenerProfile {
  id: string
  name: string
  blurb: string
  plays: Play[]
}

export interface ProfileMeta {
  id: string
  name: string
  blurb: string
  /** Lazy loader — profile histories are separate chunks, not in the main bundle. */
  load: () => Promise<{ default: unknown }>
}

export const profileMetas: ProfileMeta[] = [
  {
    id: 'night-owl', name: 'Night Owl',
    blurb: 'Mostly after dark — Electronic and Lo-Fi past midnight.',
    load: () => import('./profiles/night-owl.json'),
  },
  {
    id: 'jazz-devotee', name: 'Jazz Devotee',
    blurb: 'Mornings and evenings, Jazz and Classical, long sessions.',
    load: () => import('./profiles/jazz-devotee.json'),
  },
  {
    id: 'genre-explorer', name: 'Genre Explorer',
    blurb: 'Flat across all 12 genres — no single home base.',
    load: () => import('./profiles/genre-explorer.json'),
  },
]

export async function loadProfile(meta: ProfileMeta): Promise<ListenerProfile> {
  const raw = await meta.load()
  const checked = validateHistory(raw.default as unknown)
  if (!checked.ok) console.warn(`Profile ${meta.id} had invalid rows:`, checked.errors.slice(0, 3))
  return { id: meta.id, name: meta.name, blurb: meta.blurb, plays: checked.plays }
}

export function profileSource(profile: ListenerProfile): DataSource {
  return {
    kind: 'sample',
    label: `Sample profile: ${profile.name} — ${profile.blurb}`,
    plays: profile.plays,
  }
}
