import type { MonthBucket } from '../lib/types'
import { formatMinutes } from '../lib/format'
import { biggestJump, quietestMonth } from '../lib/growth'
import { LineChart } from './charts/LineChart'

export function MonthlyTrend({ months }: { months: MonthBucket[] }) {
  const jump = biggestJump(months)
  const quiet = quietestMonth(months)
  return (
    <section className="panel">
      <h2>Monthly trend</h2>
      <p className="panel-sub">
        {jump ? `Biggest jump: ${jump.label} (${Math.round((jump.changePct ?? 0) * 100)}% vs the month before). ` : ''}
        {quiet ? `Quietest month: ${quiet.label}.` : ''}
      </p>
      <LineChart months={months} />
    </section>
  )
}
