import { hourLabel } from '../lib/format'
import { BarChart } from './charts/BarChart'

export function ListeningClock({ playsByHour }: { playsByHour: number[] }) {
  const labels = playsByHour.map((_, h) => hourLabel(h))
  const peak = playsByHour.indexOf(Math.max(...playsByHour))
  const quiet = playsByHour.indexOf(Math.min(...playsByHour))
  return (
    <section className="panel">
      <h2>Listening clock</h2>
      <p className="panel-sub">Plays by hour of day. Peak: <strong>{hourLabel(peak)}</strong>; quietest: {hourLabel(quiet)}.</p>
      <BarChart values={playsByHour} labels={labels} title="Plays by hour of day" />
    </section>
  )
}
