import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchSpotifyTop, fetchClientCredentialsToken } from '../spotify'

afterEach(() => { vi.unstubAllGlobals() })

describe('fetchSpotifyTop', () => {
  it('maps artists and tracks from the API', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => ({
      ok: true,
      json: async () => url.includes('artists')
        ? { items: [{ name: 'Test Artist', genres: ['Rock'], images: [{ url: 'http://x/y.jpg' }] }] }
        : { items: [{ name: 'Test Track', artists: [{ name: 'Test Artist' }], duration_ms: 180000 }] },
    })))
    const top = await fetchSpotifyTop('tok')
    expect(top.artists[0].name).toBe('Test Artist')
    expect(top.tracks[0].name).toBe('Test Track')
    expect(top.tracks[0].minutes).toBe(3)
  })
  it('throws on API errors', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 401 })))
    await expect(fetchSpotifyTop('bad')).rejects.toThrow('401')
  })
})

describe('fetchClientCredentialsToken', () => {
  it('exchanges credentials for a token', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ access_token: 'abc' }) })))
    vi.stubGlobal('btoa', () => 'aWQ6c2VjcmV0')
    await expect(fetchClientCredentialsToken('id', 'secret')).resolves.toBe('abc')
  })
})
