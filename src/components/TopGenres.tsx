import { pct, formatMinutes } from '../lib/format'
import type { GenreShare } from '../lib/types'

export function TopGenres({ genres }: { genres: GenreShare[] }) {
  return (
    <section className="panel">
      <h2>Top genres</h2>
      <div className="genre-rows">
        {genres.slice(0, 8).map((g) => (
          <div className="genre-row" key={g.genre}>
            <span className="genre-name">{g.genre}</span>
            <span className="bar"><span style={{ width: `${g.share * 100}%` }} /></span>
            <span className="genre-share">{pct(g.share)} · {formatMinutes(g.minutes)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
