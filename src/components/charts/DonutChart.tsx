import type { GenreShare } from '../../lib/types'
import { genreColor } from '../../lib/soundCity'
import { pct } from '../../lib/format'

/** Simple SVG donut of genre share. */
export function DonutChart({ genres }: { genres: GenreShare[] }) {
  const top = genres.slice(0, 6)
  const total = top.reduce((s, g) => s + g.share, 0) || 1
  const R = 80
  const C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 200 200" className="donut" role="img" aria-label="Genre share donut chart">
        <title>Genre share donut chart</title>
        <circle cx="100" cy="100" r={R} fill="none" stroke="#26263a" strokeWidth="28" />
        {top.map((g) => {
          const frac = g.share / total
          const el = (
            <circle key={g.genre} cx="100" cy="100" r={R} fill="none" stroke={genreColor(g.genre)}
              strokeWidth="28" strokeDasharray={`${frac * C} ${C}`} strokeDashoffset={-offset * C}
              transform="rotate(-90 100 100)" />
          )
          offset += frac
          return el
        })}
        <text x="100" y="96" textAnchor="middle" fontSize="15" fill="#f2f2f7" fontWeight="700">{top[0]?.genre ?? '—'}</text>
        <text x="100" y="116" textAnchor="middle" fontSize="13" fill="#9a9ab0">{pct(top[0]?.share ?? 0)}</text>
      </svg>
      <ul className="donut-legend">
        {top.map((g) => (
          <li key={g.genre}><span className="swatch" style={{ background: genreColor(g.genre) }} />{g.genre} — {pct(g.share)}</li>
        ))}
      </ul>
    </div>
  )
}
