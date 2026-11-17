import { profiles, type ListenerProfile } from '../data/profiles'

export function ProfilePicker({ selectedId, onSelect }: {
  selectedId: string | null
  onSelect: (profile: ListenerProfile | null) => void
}) {
  return (
    <section className="panel profile-picker">
      <h2>Try another listener</h2>
      <p className="panel-sub">The default year is one fictional listener. Switch profiles to see how a different taste shapes the stats and the skyline.</p>
      <div className="share-grid">
        <button className={selectedId === null ? 'active' : ''} onClick={() => onSelect(null)}>Default year</button>
        {profiles.map((p) => (
          <button key={p.id} className={selectedId === p.id ? 'active' : ''} onClick={() => onSelect(p)} title={p.blurb}>
            {p.name}
          </button>
        ))}
      </div>
    </section>
  )
}
