export function BarChart({ values, labels, title }: { values: number[]; labels: string[]; title?: string }) {
  const max = Math.max(...values, 1)
  return (
    <div className="barchart" role="img" aria-label={title ?? 'Bar chart'}>
      {values.map((v, i) => (
        <div className="bar-col" key={labels[i] ?? i} title={`${labels[i]}: ${v}`}>
          <div className="bar-fill" style={{ height: `${(v / max) * 100}%` }} />
          <div className="bar-label">{labels[i]}</div>
        </div>
      ))}
    </div>
  )
}
