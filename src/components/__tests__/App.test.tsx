import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from '../../App'

describe('App', () => {
  it('renders the year-in-music page from sample data', () => {
    const html = renderToString(<App />)
    expect(html).toContain('TuneRewind')
    expect(html).toContain('Top artists')
    expect(html).toContain('Sound City')
    expect(html).toContain('Share cards')
    expect(html).toContain('Listening clock')
    expect(html).toContain('sample data')
    expect(html).toContain('Try another listener')
  })
})
