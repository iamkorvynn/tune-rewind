import { hourLabel } from '../lib/format'
import { BarChart } from './charts/BarChart'

export function ListeningClock({ playsByHour }: { playsByHour: number[] }) {
  const labels = playsByHour.map((_, h) => hourLabel(h))
  const peak = playsByHour.indexOf(Math.max(...playsByHour))
  return (
    <section className="panel">
      <h2>Listening clock</h2>
      <p className="panel-sub">Plays by hour of day. Peak: <strong>{hourLabel(peak)}</strong> — the night-owl slot.</p>
      <BarChart values={playsByHour} labels={labels} title="Plays by hour of day" />
    </section>
  )
}
