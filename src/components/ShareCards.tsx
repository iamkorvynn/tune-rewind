import type { YearStats } from '../lib/types'
import { shareCardTitle, type ShareCardKind } from '../lib/shareCard'

const KINDS: { kind: ShareCardKind; blurb: string }[] = [
  { kind: 'summary', blurb: 'The whole year on one card.' },
  { kind: 'top-artist', blurb: 'Your #1 artist, front and centre.' },
  { kind: 'top-genre', blurb: 'The genre that owned your year.' },
  { kind: 'sound-city', blurb: 'Your skyline, shareable.' },
]

export function ShareCards({ stats, onDownload, busy, error }: {
  stats: YearStats
  onDownload: (kind: ShareCardKind) => void
  busy: ShareCardKind | null
  error: string | null
}) {
  return (
    <section className="panel">
      <h2>Share cards</h2>
      <p className="panel-sub">Canvas-generated PNGs, ready to post. Each card is 1080×1080. Downloads as a file — nothing is uploaded anywhere.</p>
      {error ? <p className="error">{error}</p> : null}
      <div className="share-grid">
        {KINDS.map(({ kind, blurb }) => (
          <div className="share-card" key={kind}>
            <div className="share-title">{shareCardTitle(kind, stats)}</div>
            <p>{blurb}</p>
            <button onClick={() => onDownload(kind)} disabled={busy !== null}>
              {busy === kind ? 'Rendering…' : 'Download PNG'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
