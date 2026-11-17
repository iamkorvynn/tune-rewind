import { formatMinutes, formatNumber } from '../lib/format'
import type { RankedItem } from '../lib/types'

export function TopArtists({ artists }: { artists: RankedItem[] }) {
  const max = artists[0]?.minutes ?? 1
  return (
    <section className="panel">
      <h2>Top artists</h2>
      <ol className="ranked-list">
        {artists.map((a, i) => (
          <li key={a.name} title={`${a.name} — ${a.extra ?? ''}`}>
            <span className="rank">{i + 1}</span>
            <span className="rank-name">{a.name}</span>
            <span className="rank-genre">{a.extra ?? ''}</span>
            <span className="bar"><span style={{ width: `${(a.minutes / max) * 100}%` }} /></span>
            <span className="rank-min">{formatMinutes(a.minutes)} · {formatNumber(a.plays)} plays</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
