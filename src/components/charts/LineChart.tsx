import type { MonthBucket } from '../../lib/types'

/** Minimal SVG line chart of minutes per month. */
export function LineChart({ months }: { months: MonthBucket[] }) {
  const W = 640, H = 180, PAD = 28
  const max = Math.max(...months.map((m) => m.minutes), 1)
  const pts = months.map((m, i) => {
    const x = PAD + (i / Math.max(months.length - 1, 1)) * (W - PAD * 2)
    const y = H - PAD - (m.minutes / max) * (H - PAD * 2)
    return { x, y, label: m.label, minutes: m.minutes }
  })
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="linechart" role="img" aria-label="Monthly listening trend line chart">
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#2a2a3d" />
      <path d={path} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" />
      {pts.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="4" fill="#ff5c8a" />
          <title>{`${p.label}: ${Math.round(p.minutes)} minutes`}</title>
        </g>
      ))}
      {pts.filter((_, i) => i % 3 === 0).map((p) => (
        <text key={p.label} x={p.x} y={H - 6} textAnchor="middle" fontSize="11" fill="#9a9ab0">{p.label}</text>
      ))}
    </svg>
  )
}
