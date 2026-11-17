/**
 * Real Spotify path (optional). TuneRewind runs fully on bundled sample data
 * when no credentials are configured — nothing here is called unless a token
 * or client credentials are present. No keys are ever committed; see .env.example.
 *
 * Two ways in:
 *  1. VITE_SPOTIFY_ACCESS_TOKEN — a user access token (Authorization Code flow).
 *  2. SPOTIFY_CLIENT_ID + SPOTIFY_CLIENT_SECRET — client-credentials flow,
 *     used by scripts/fetch-spotify.mjs (Node) to pull top artists/tracks.
 */
export interface SpotifyTopItem {
  name: string
  artist?: string
  plays?: number
  minutes?: number
  genre?: string
  imageUrl?: string
}

const API = 'https://api.spotify.com/v1'

export function spotifyConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN)
}

async function spotifyGet<T>(token: string, path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Spotify API ${res.status} on ${path}`)
  return res.json() as Promise<T>
}

interface TopArtistsResponse { items: { name: string; genres: string[]; images: { url: string }[] }[] }
interface TopTracksResponse { items: { name: string; artists: { name: string }[]; duration_ms: number }[] }

export async function fetchSpotifyTop(token: string): Promise<{ artists: SpotifyTopItem[]; tracks: SpotifyTopItem[] }> {
  const [artists, tracks] = await Promise.all([
    spotifyGet<TopArtistsResponse>(token, '/me/top/artists?time_range=long_term&limit=10'),
    spotifyGet<TopTracksResponse>(token, '/me/top/tracks?time_range=long_term&limit=10'),
  ])
  return {
    artists: artists.items.map((a) => ({ name: a.name, genre: a.genres[0], imageUrl: a.images[0]?.url })),
    tracks: tracks.items.map((t) => ({
      name: t.name,
      artist: t.artists.map((a) => a.name).join(', '),
      minutes: t.duration_ms / 60000,
    })),
  }
}

export async function fetchClientCredentialsToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error(`Spotify token exchange failed: ${res.status}`)
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}
