#!/usr/bin/env node
/**
 * Fetch real top artists/tracks from Spotify and save them locally.
 * Usage:
 *   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... npm run fetch-spotify
 *   # or with a user token:
 *   SPOTIFY_ACCESS_TOKEN=... npm run fetch-spotify
 * Writes src/data/spotify-live.json (gitignored — never committed).
 * Without credentials it exits with instructions and leaves sample data in place.
 */
import { writeFileSync } from 'node:fs'

if (process.argv.includes('--help')) {
  console.log('Usage: SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/fetch-spotify.mjs')
  console.log('   or: SPOTIFY_ACCESS_TOKEN=... node scripts/fetch-spotify.mjs')
  process.exit(0)
}

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
let token = process.env.SPOTIFY_ACCESS_TOKEN

if (!token) {
  if (!clientId || !clientSecret) {
    console.error('No Spotify credentials. Set SPOTIFY_ACCESS_TOKEN, or SPOTIFY_CLIENT_ID + SPOTIFY_CLIENT_SECRET.')
    console.error('See README.md ("Plug in real Spotify data") and .env.example. Sample data remains in use.')
    process.exit(2)
  }
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) { console.error(`Token exchange failed: ${res.status}`); process.exit(1) }
  token = (await res.json()).access_token
}

async function get(path) {
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Spotify ${res.status} on ${path}`)
  return res.json()
}

const [artists, tracks] = await Promise.all([
  get('/me/top/artists?time_range=long_term&limit=10'),
  get('/me/top/tracks?time_range=long_term&limit=10'),
])
const out = {
  fetchedAt: new Date().toISOString(),
  source: 'spotify',
  artists: artists.items.map((a) => ({ name: a.name, genres: a.genres, imageUrl: a.images?.[0]?.url })),
  tracks: tracks.items.map((t) => ({ name: t.name, artist: t.artists.map((a) => a.name).join(', '), durationMs: t.duration_ms })),
}
writeFileSync(new URL('../src/data/spotify-live.json', import.meta.url), JSON.stringify(out, null, 2))
console.log(`Saved ${out.artists.length} artists, ${out.tracks.length} tracks to src/data/spotify-live.json`)
