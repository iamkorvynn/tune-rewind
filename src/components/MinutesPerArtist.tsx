import { formatMinutes } from '../lib/format'
import type { RankedItem } from '../lib/types'

export function MinutesPerArtist({ artists }: { artists: RankedItem[] }) {
  const max = artists[0]?.minutes ?? 1
  return (
    <section className="panel">
      <h2>Minutes per artist</h2>
      <p className="panel-sub">Who actually owned your year, in minutes.</p>
      <div className="genre-rows">
        {artists.map((a) => (
          <div className="genre-row" key={a.name}>
            <span className="genre-name">{a.name}</span>
            <span className="bar"><span style={{ width: `${(a.minutes / max) * 100}%` }} /></span>
            <span className="genre-share">{formatMinutes(a.minutes)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
