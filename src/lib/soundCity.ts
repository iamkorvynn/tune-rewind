import type { GenreShare, RankedItem } from './types'

export interface CityBuilding {
  genre: string
  minutes: number
  share: number
  height: number // 0..100, normalised to tallest genre
  width: number
  color: string
  isTower: boolean
  label: string
}

export const GENRE_COLORS: Record<string, string> = {
  'Indie Pop': '#ff5c8a', Electronic: '#7c5cff', Jazz: '#f5a623', 'Latin Pop': '#ff7a3d',
  Bollywood: '#e5484d', 'J-Pop': '#ff8fd1', Classical: '#8ecae6', 'Hip-Hop': '#ffd166',
  Folk: '#90be6d', Rock: '#ef476f', 'R&B': '#b388ff', 'Lo-Fi': '#6ec6a5', Ambient: '#a3b18a',
}

export function genreColor(genre: string): string {
  return GENRE_COLORS[genre] ?? '#7c5cff'
}

export function buildSoundCity(genres: GenreShare[], topArtist: RankedItem | null): CityBuilding[] {
  if (genres.length === 0) return []
  const max = Math.max(...genres.map((g) => g.minutes))
  return genres.slice(0, 10).map((g, i) => ({
    genre: g.genre,
    minutes: g.minutes,
    share: g.share,
    height: max > 0 ? Math.max(12, Math.round((g.minutes / max) * 100)) : 12,
    width: 52,
    color: genreColor(g.genre),
    isTower: i === 0 && topArtist !== null,
    label: i === 0 && topArtist ? `${topArtist.name} Tower` : g.genre,
  }))
}

export function tallestBuilding(buildings: CityBuilding[]): CityBuilding | null {
  if (buildings.length === 0) return null
  return buildings.reduce((a, b) => (b.height > a.height ? b : a))
}

export function skylineSummary(buildings: CityBuilding[]): string {
  if (buildings.length === 0) return 'No skyline yet — listen to something first.'
  const tallest = buildings.reduce((a, b) => (b.height > a.height ? b : a))
  return `${buildings.length} genre buildings. Tallest: ${tallest.label} at ${Math.round(tallest.minutes)} minutes.`
}
