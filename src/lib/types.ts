export interface Play {
  trackId: string
  artist: string
  track: string
  album: string
  genre: string
  playedAt: string // ISO 8601
  msPlayed: number
}

export interface HistoryFile {
  generatedAt?: string
  year?: string
  source?: string
  month?: string
  plays: Play[]
}

export interface RankedItem {
  name: string
  plays: number
  minutes: number
  extra?: string
}

export interface GenreShare {
  genre: string
  minutes: number
  plays: number
  share: number // 0..1
}

export interface MonthBucket {
  month: string // YYYY-MM
  label: string
  plays: number
  minutes: number
}

export interface YearStats {
  totalPlays: number
  totalMinutes: number
  totalHours: number
  uniqueArtists: number
  uniqueTracks: number
  uniqueGenres: number
  avgMinutesPerDay: number
  topDay: { date: string; plays: number; minutes: number } | null
  topArtists: RankedItem[]
  topTracks: RankedItem[]
  topGenres: GenreShare[]
  playsByHour: number[]
  playsByMonth: MonthBucket[]
  minutesPerArtist: RankedItem[]
  daysActive: number
  topAlbums: RankedItem[]
  streak: import('./streak').Streak | null
}

export interface DataSource {
  kind: 'sample' | 'spotify'
  label: string
  plays: Play[]
}
