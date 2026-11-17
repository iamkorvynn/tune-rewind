import type { Play, YearStats } from './types'
import { topArtists, topTracks } from './topN'
import { totalMinutes, genreShare, playsByHour, playsByMonth, topListeningDay, minutesPerArtist } from './aggregation'

export function computeYearStats(plays: Play[]): YearStats {
  const total = totalMinutes(plays)
  const days = new Set(plays.map((p) => p.playedAt.slice(0, 10)))
  const spanDays = plays.length === 0 ? 0 : (() => {
    const ts = plays.map((p) => new Date(p.playedAt).getTime())
    return Math.max(1, Math.round((Math.max(...ts) - Math.min(...ts)) / 86400000) + 1)
  })()
  return {
    totalPlays: plays.length,
    totalMinutes: total,
    totalHours: total / 60,
    uniqueArtists: new Set(plays.map((p) => p.artist)).size,
    uniqueTracks: new Set(plays.map((p) => p.trackId)).size,
    uniqueGenres: new Set(plays.map((p) => p.genre)).size,
    avgMinutesPerDay: spanDays > 0 ? total / spanDays : 0,
    topDay: topListeningDay(plays),
    topArtists: topArtists(plays, 5),
    topTracks: topTracks(plays, 5),
    topGenres: genreShare(plays),
    playsByHour: playsByHour(plays),
    playsByMonth: playsByMonth(plays),
    minutesPerArtist: minutesPerArtist(plays).slice(0, 10),
    daysActive: days.size,
  }
}

export function peakHour(playsByHourArr: number[]): { hour: number; plays: number } {
  let hour = 0
  for (let h = 1; h < 24; h++) if (playsByHourArr[h] > playsByHourArr[hour]) hour = h
  return { hour, plays: playsByHourArr[hour] }
}

export function listeningPersona(stats: YearStats): string {
  const top = stats.topGenres[0]
  if (!top) return 'Silent Listener'
  if (stats.totalMinutes > 10000 && top.share > 0.3) return `${top.genre} Devotee`
  if (stats.uniqueGenres >= 10) return 'Genre Explorer'
  if (stats.avgMinutesPerDay > 40) return 'All-Day Listener'
  return 'Curious Wanderer'
}
