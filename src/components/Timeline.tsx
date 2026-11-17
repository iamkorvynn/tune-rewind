import { formatMinutes, formatNumber } from '../lib/format'
import type { MonthBucket } from '../lib/types'
import { BarChart } from './charts/BarChart'

export function Timeline({ months }: { months: MonthBucket[] }) {
  return (
    <section className="panel">
      <h2>Month by month</h2>
      <p className="panel-sub">Your year, one bar per month.</p>
      <BarChart values={months.map((m) => m.minutes)} labels={months.map((m) => m.label)} title="Minutes listened per month" />
      <ul className="month-list">
        {months.map((m) => (
          <li key={m.month}><strong>{m.label}</strong> — {formatNumber(m.plays)} plays, {formatMinutes(m.minutes)}</li>
        ))}
      </ul>
    </section>
  )
}
