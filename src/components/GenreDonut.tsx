import type { GenreShare } from '../lib/types'
import { DonutChart } from './charts/DonutChart'

export function GenreDonut({ genres }: { genres: GenreShare[] }) {
  return (
    <section className="panel">
      <h2>Genre mix</h2>
      <p className="panel-sub">Your year, sliced by genre.</p>
      <DonutChart genres={genres} />
    </section>
  )
}
