export function Insights({ insights }: { insights: string[] }) {
  return (
    <section className="panel">
      <h2>What your year says</h2>
      <ul className="insights-list">
        {insights.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </section>
  )
}
