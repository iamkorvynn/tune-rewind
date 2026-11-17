import { formatNumber } from '../lib/format'
import type { RankedItem } from '../lib/types'

export function TopTracks({ tracks }: { tracks: RankedItem[] }) {
  return (
    <section className="panel">
      <h2>Top tracks</h2>
      <ol className="ranked-list">
        {tracks.map((t, i) => (
          <li key={t.name}>
            <span className="rank">{i + 1}</span>
            <span className="rank-name">{t.name}</span>
            <span className="rank-genre">{t.extra ?? ''}</span>
            <span className="rank-min">{formatNumber(t.plays)} plays</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
