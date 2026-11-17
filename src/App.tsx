import { useEffect, useState } from 'react'
import { sampleSource } from './data/sampleData'
import { useStats } from './hooks/useStats'
import { useShareCard } from './hooks/useShareCard'
import { fetchSpotifyTop, spotifyConfigured } from './lib/spotify'
import { formatMinutes, formatNumber } from './lib/format'
import type { DataSource } from './lib/types'
import { Header } from './components/Header'
import { DataBanner } from './components/DataBanner'
import { Hero } from './components/Hero'
import { StatCard } from './components/StatCard'
import { TopArtists } from './components/TopArtists'
import { TopTracks } from './components/TopTracks'
import { TopGenres } from './components/TopGenres'
import { ListeningClock } from './components/ListeningClock'
import { Timeline } from './components/Timeline'
import { MinutesPerArtist } from './components/MinutesPerArtist'
import { SoundCity } from './components/SoundCity'
import { ShareCards } from './components/ShareCards'
import { Insights } from './components/Insights'
import { Footer } from './components/Footer'
import { TopAlbums } from './components/TopAlbums'
import { StreakPanel } from './components/StreakPanel'
import { MonthlyTrend } from './components/MonthlyTrend'
import { TopDay } from './components/TopDay'
import { ExportPanel } from './components/ExportPanel'
import { GenreDonut } from './components/GenreDonut'
import { ProfilePicker } from './components/ProfilePicker'
import { profileSource, type ListenerProfile } from './data/profiles'

export default function App() {
  const [source, setSource] = useState<DataSource>(sampleSource)
  const [profileId, setProfileId] = useState<string | null>(null)
  const [spotifyNote, setSpotifyNote] = useState<string | null>(null)
  const { stats, persona, insights } = useStats(source.plays)
  const { download, busy, error } = useShareCard(stats)

  useEffect(() => {
    if (!spotifyConfigured()) return
    const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN as string
    fetchSpotifyTop(token)
      .then((top) => {
        setSpotifyNote(
          `Spotify connected — your #1 artist is ${top.artists[0]?.name ?? 'unknown'} and your #1 track is ${top.tracks[0]?.name ?? 'unknown'}. Full history still uses sample data (Spotify's API only exposes top items, not a full play history).`,
        )
      })
      .catch(() => setSpotifyNote('Spotify token was set but the API call failed — showing sample data.'))
  }, [])

  return (
    <div className="app">
      <Header sourceLabel={source.label} />
      <main>
        <ProfilePicker
          selectedId={profileId}
          onSelect={(p: ListenerProfile | null) => {
            setProfileId(p ? p.id : null)
            setSource(p ? profileSource(p) : sampleSource)
          }}
        />
        <DataBanner kind={source.kind} />
        {spotifyNote ? <div className="banner banner-live">{spotifyNote}</div> : null}
        <Hero stats={stats} persona={persona} />
        <div className="stat-grid">
          <StatCard label="Total minutes" value={formatMinutes(stats.totalMinutes)} sub={`${formatNumber(stats.totalPlays)} plays`} />
          <StatCard label="Top artist" value={stats.topArtists[0]?.name ?? '—'} sub={stats.topArtists[0] ? formatMinutes(stats.topArtists[0].minutes) : undefined} />
          <StatCard label="Top genre" value={stats.topGenres[0]?.genre ?? '—'} sub={stats.topGenres[0] ? `${Math.round(stats.topGenres[0].share * 100)}% of your year` : undefined} />
          <StatCard label="Top day" value={stats.topDay?.date ?? '—'} sub={stats.topDay ? `${formatNumber(stats.topDay.plays)} plays` : undefined} />
          <StatCard label="Days active" value={String(stats.daysActive)} sub={`${formatMinutes(stats.avgMinutesPerDay)} / day avg`} />
          <StatCard label="Genres explored" value={String(stats.uniqueGenres)} sub={`${stats.uniqueArtists} artists`} />
        </div>
        <SoundCity genres={stats.topGenres} topArtist={stats.topArtists[0] ?? null} />
        <div className="two-col">
          <TopArtists artists={stats.topArtists} />
          <TopTracks tracks={stats.topTracks} />
        </div>
        <TopGenres genres={stats.topGenres} />
        <div className="two-col">
          <GenreDonut genres={stats.topGenres} />
          <TopAlbums albums={stats.topAlbums} />
        </div>
        <div className="two-col">
          <TopDay stats={stats} />
          <StreakPanel streak={stats.streak} />
        </div>
        <MonthlyTrend months={stats.playsByMonth} />
        <ListeningClock playsByHour={stats.playsByHour} />
        <Timeline months={stats.playsByMonth} />
        <MinutesPerArtist artists={stats.minutesPerArtist} />
        <Insights insights={insights} />
        <ShareCards stats={stats} onDownload={download} busy={busy} error={error} />
        <ExportPanel stats={stats} />
      </main>
      <Footer />
    </div>
  )
}
