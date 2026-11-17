export function Insights({ insights }: { insights: string[] }) {
  return (
    <section className="panel">
      <h2>What your year says</h2>
      {insights.length === 0 ? (
        <p className="panel-sub">Listen to something first — insights appear once there is a history to read.</p>
      ) : (
        <ul className="insights-list">
          {insights.map((s) => <li key={s}>{s}</li>)}
        </ul>
      )}
    </section>
  )
}
