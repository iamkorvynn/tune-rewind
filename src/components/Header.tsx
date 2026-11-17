export function Header({ sourceLabel }: { sourceLabel: string }) {
  return (
    <header className="site-header">
      <div className="logo">♪ TuneRewind</div>
      <div className="header-note" title={sourceLabel}>{sourceLabel}</div>
    </header>
  )
}
