# TuneRewind — Your Year in Music

A clean-room "your year in music" web app: listening stats, visuals, share cards,
and **Sound City** — a skyline where each top genre is a building whose height is
minutes listened, with your #1 artist as the tallest tower. Not affiliated with
Spotify; no Spotify branding, assets, or code are used.

## What it does

- **Top artists / tracks / genres** — ranked by minutes listened, not just plays
- **Totals** — total minutes, total plays, days active, average per day, top day
- **Listening clock** — plays by hour of day (peak hour called out)
- **Month-by-month timeline** — minutes and plays per month across the year
- **Top genre share** — each genre's share of the year
- **Minutes per artist** — horizontal chart of who owned the year
- **Sound City (the twist)** — SVG skyline: genre buildings sized by minutes,
  tallest tower named after your #1 artist
- **Share cards** — 1080×1080 PNGs generated on a canvas in the browser
  (summary, top artist, top genre, Sound City), downloaded locally — nothing uploaded
- **Insights** — plain-language takeaways (peak hour, biggest month, genre home base)
- **Top albums, longest streak, biggest day** — the album chart, your longest daily run and loudest day
- **Monthly trend + genre donut** — line chart of the year and a donut of the genre mix
- **Export** — stats as JSON, top artists as CSV, or a copy-ready summary
- **Listener profiles** — switch between the default year and three alternate fictional listeners (Night Owl, Jazz Devotee, Genre Explorer)

## Data

There is **no Spotify API key** bundled with this repo, so the app runs fully on a
**bundled sample dataset**: 3,895 plays, 41 fictional artists, 123 tracks,
12 genres, Nov 2025 – Nov 2026, generated deterministically by
`tools/generate-sample-data.py` (see `src/data/sample-history.json` and the
per-month files in `src/data/months/`). The UI says so — a banner states it is
running on sample data.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm test         # vitest suite (stats engine, validation, share cards, Sound City, data)
```

## Plug in real Spotify data

Spotify's API does not hand out a full play history — it exposes **top artists
and top tracks** (long term). TuneRewind codes that path and documents it; it
never invents a key.

1. Create an app at https://developer.spotify.com/dashboard and note the
   **Client ID** and **Client Secret**.
2. Copy `.env.example` to `.env` and fill it in (`.env` is gitignored — never
   commit a key):
   - `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — for the Node fetch script
   - `VITE_SPOTIFY_ACCESS_TOKEN` — a user token (Authorization Code flow) for
     in-browser top-artist/track lookup
3. Fetch and save live top items (gitignored output):
   ```bash
   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... npm run fetch-spotify
   # writes src/data/spotify-live.json
   ```
   With a user token set, the app also shows your live #1 artist/track in a
   banner. Full-history stats still use the sample dataset until a history
   export is provided, because Spotify's API cannot return one.

## Stack

Vite + React 18 + TypeScript, zero UI dependencies. Stats engine in
`src/lib/` (`stats.ts`, `topN.ts`, `aggregation.ts`, `format.ts`,
`validate.ts`, `soundCity.ts`, `shareCard.ts`, `spotify.ts`, `insights.ts`).
Tests: Vitest + jsdom, `src/**/__tests__/`.

## Project layout

```
src/
  lib/          stats engine, Spotify client, share-card + Sound City logic
  data/         sample-history.json + per-month files + loader
  components/   Hero, TopArtists, TopTracks, TopGenres, ListeningClock,
                Timeline, MinutesPerArtist, SoundCity, ShareCards, Insights
  hooks/        useStats, useShareCard
scripts/fetch-spotify.mjs   live Spotify fetch (needs credentials)
tools/generate-sample-data.py   regenerates the sample dataset
```
