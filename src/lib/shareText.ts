import type { YearStats } from './types'
import { formatMinutes, formatNumber } from './format'

export function summaryShareText(stats: YearStats): string {
  const artist = stats.topArtists[0]
  const genre = stats.topGenres[0]
  const track = stats.topTracks[0]
  return [
    'My year in music — TuneRewind',
    `${formatMinutes(stats.totalMinutes)} listened · ${formatNumber(stats.totalPlays)} plays`,
    artist ? `Top artist: ${artist.name} (${formatMinutes(artist.minutes)})` : '',
    genre ? `Top genre: ${genre.genre}` : '',
    track ? `Top track: ${track.name}` : '',
  ].filter(Boolean).join('\n')
}
