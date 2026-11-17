import { formatMinutes, formatNumber } from '../lib/format'
import type { RankedItem } from '../lib/types'

export function TopAlbums({ albums }: { albums: RankedItem[] }) {
  return (
    <section className="panel">
      <h2>Top albums</h2>
      <ol className="ranked-list">
        {albums.map((a, i) => (
          <li key={a.name}>
            <span className="rank">{i + 1}</span>
            <span className="rank-name">{a.name}</span>
            <span className="rank-genre">{a.extra ?? ''}</span>
            <span className="rank-min">{formatMinutes(a.minutes)} · {formatNumber(a.plays)} plays</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
