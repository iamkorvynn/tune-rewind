import type { YearStats } from './types'

export function statsToJson(stats: YearStats): string {
  return JSON.stringify(
    {
      generatedBy: 'TuneRewind',
      totalMinutes: Math.round(stats.totalMinutes),
      totalPlays: stats.totalPlays,
      uniqueArtists: stats.uniqueArtists,
      uniqueTracks: stats.uniqueTracks,
      uniqueGenres: stats.uniqueGenres,
      topArtists: stats.topArtists,
      topTracks: stats.topTracks,
      topGenres: stats.topGenres,
      playsByHour: stats.playsByHour,
      playsByMonth: stats.playsByMonth,
    },
    null,
    2,
  )
}

export function topArtistsToCsv(stats: YearStats): string {
  const rows = ['rank,artist,genre,plays,minutes', ...stats.topArtists.map((a, i) =>
    `${i + 1},"${a.name}","${a.extra ?? ''}",${a.plays},${Math.round(a.minutes)}`)]
  return rows.join('\n')
}

export function downloadText(filename: string, text: string, mime = 'application/json'): void {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
