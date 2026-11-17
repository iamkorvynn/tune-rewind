import type { YearStats } from '../lib/types'
import { statsToJson, topArtistsToCsv, downloadText } from '../lib/export'
import { summaryShareText } from '../lib/shareText'
import { useState } from 'react'

export function ExportPanel({ stats }: { stats: YearStats }) {
  const [copied, setCopied] = useState(false)
  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryShareText(stats))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <section className="panel">
      <h2>Take your year with you</h2>
      <p className="panel-sub">Export your stats as JSON or CSV, or copy a paste-ready summary for a post.</p>
      <div className="share-grid">
        <button aria-label="Download your stats as JSON" onClick={() => downloadText('tunerewind-stats.json', statsToJson(stats))}>Download stats JSON</button>
        <button onClick={() => downloadText('tunerewind-top-artists.csv', topArtistsToCsv(stats), 'text/csv')}>Download top artists CSV</button>
        <button onClick={copySummary}>{copied ? 'Copied!' : 'Copy summary text'}</button>
      </div>
    </section>
  )
}
