export function DataBanner({ kind }: { kind: 'sample' | 'spotify' }) {
  if (kind === 'spotify') {
    return <div className="banner banner-live">Live data — connected to Spotify.</div>
  }
  return (
    <div className="banner banner-sample">
      Running on bundled sample data. Add a Spotify token (see README and docs/spotify-setup.md) to see your real year in music.
    </div>
  )
}
