import { formatMinutes, formatNumber } from '../lib/format'
import type { YearStats } from '../lib/types'

export function Hero({ stats, persona }: { stats: YearStats; persona: string }) {
  return (
    <section className="hero">
      <p className="eyebrow">Your year in music · Nov 2025 — Nov 2026</p>
      <h1>You listened to<br /><span className="accent">{formatMinutes(stats.totalMinutes)}</span> of music.</h1>
      <p className="hero-sub">
        {formatNumber(stats.totalPlays)} plays · {stats.uniqueArtists} artists · {stats.uniqueTracks} tracks · {stats.uniqueGenres} genres.
        Your listening persona: <strong>{persona}</strong>.
      </p>
    </section>
  )
}
