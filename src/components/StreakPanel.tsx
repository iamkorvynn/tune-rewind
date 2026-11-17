import { formatDateShort } from '../lib/format'
import type { Streak } from '../lib/streak'

export function StreakPanel({ streak }: { streak: Streak | null }) {
  return (
    <section className="panel">
      <h2>Longest streak</h2>
      {streak ? (
        <p className="big-stat" title={`Streak from ${streak.start} to ${streak.end}`}>{streak.lengthDays} days in a row</p>
      ) : (
        <p className="panel-sub">No listening days yet.</p>
      )}
      {streak ? (
        <p className="panel-sub">
          {formatDateShort(streak.start)} → {formatDateShort(streak.end)}. Music every single day — no skips.
        </p>
      ) : null}
    </section>
  )
}
