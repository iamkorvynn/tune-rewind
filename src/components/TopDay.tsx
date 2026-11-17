import { formatDateShort, formatMinutes, formatNumber } from '../lib/format'
import type { YearStats } from '../lib/types'

export function TopDay({ stats }: { stats: YearStats }) {
  if (!stats.topDay) return null
  return (
    <section className="panel">
      <h2>Your biggest day</h2>
      <p className="big-stat">{formatDateShort(stats.topDay.date)}</p>
      <p className="panel-sub">
        {formatMinutes(stats.topDay.minutes)} across {formatNumber(stats.topDay.plays)} plays — your loudest day of the year.
      </p>
    </section>
  )
}
