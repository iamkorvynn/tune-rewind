export function Header({ sourceLabel }: { sourceLabel: string }) {
  return (
    <header className="site-header">
      <div className="logo">♪ TuneRewind</div>
      <nav className="header-nav" aria-label="Sections"><a href="#top">Top</a> · <a href="#sound-city">Sound City</a></nav>
      <div className="header-note" title={sourceLabel}>{sourceLabel}</div>
    </header>
  )
}
