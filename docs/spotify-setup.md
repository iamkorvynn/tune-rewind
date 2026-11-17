# Plug in real Spotify data

TuneRewind ships with bundled sample data and needs nothing to run. To see
your real year:

1. Create an app at https://developer.spotify.com/dashboard.
2. Note the **Client ID** and **Client Secret**.
3. Copy `.env.example` to `.env` and fill in `SPOTIFY_CLIENT_ID` /
   `SPOTIFY_CLIENT_SECRET` (Node script) and/or `VITE_SPOTIFY_ACCESS_TOKEN`
   (a user token from the Authorization Code flow, for in-browser lookup).
4. Run `npm run fetch-spotify` — writes `src/data/spotify-live.json`
   (gitignored, never committed).

## What Spotify can and cannot give you

- Top artists and top tracks (short / medium / long term)
- No full play history — the API has no endpoint for it. That is why the
  full-history stats (clock, timeline, minutes) still use sample data unless
  you provide your own history export in the `Play` shape (`src/lib/types.ts`).

Never commit a token or secret. If one leaks, revoke it in the Spotify
dashboard immediately.
