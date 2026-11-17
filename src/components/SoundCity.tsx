import { buildSoundCity, skylineSummary } from '../lib/soundCity'
import { formatMinutes, pct } from '../lib/format'
import type { GenreShare, RankedItem } from '../lib/types'

export function SoundCity({ genres, topArtist }: { genres: GenreShare[]; topArtist: RankedItem | null }) {
  const buildings = buildSoundCity(genres, topArtist)
  const groundY = 300
  return (
    <section className="panel sound-city">
      <h2>Sound City — the twist</h2>
      <p className="panel-sub">
        Every top genre is a building. Its height is minutes listened, and your #1 artist is the tallest tower.
        {topArtist ? ` ${topArtist.name} Tower rises above them all.` : ''}
      </p>
      <svg viewBox="0 0 640 340" className="skyline" role="img" aria-label={skylineSummary(buildings)}>
        <rect x="0" y="0" width="640" height="340" fill="#0b0b14" rx="12" />
        {buildings.map((b, i) => {
          const x = 20 + i * 62
          const h = (b.height / 100) * 240
          const y = groundY - h
          return (
            <g key={b.genre}>
              <rect x={x} y={y} width="50" height={h} fill={b.color} opacity={b.isTower ? 1 : 0.85} rx="3" />
              {b.isTower && <polygon points={`${x + 25},${y - 18} ${x + 8},${y} ${x + 42},${y}`} fill={b.color} />}
              <text x={x + 25} y={groundY + 18} textAnchor="middle" fontSize="10" fill="#c9c9d6">{b.genre}</text>
              <text x={x + 25} y={y - 6} textAnchor="middle" fontSize="10" fill="#ffffff">{pct(b.share)}</text>
            </g>
          )
        })}
        <rect x="0" y={groundY} width="640" height="4" fill="#2a2a3d" />
      </svg>
      <ul className="city-legend">
        {buildings.map((b) => (
          <li key={b.genre}><span className="swatch" style={{ background: b.color }} />{b.label} — {formatMinutes(b.minutes)}</li>
        ))}
      </ul>
      <p className="panel-sub">{skylineSummary(buildings)}</p>
    </section>
  )
}
