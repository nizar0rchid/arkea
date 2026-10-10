import type { MetadataRoute } from 'next'

import { SITE_STATE } from '@/config'

// Must match the host that actually serves content. Vercel 308s the apex to
// www, so pointing canonical URLs at arkeaband.com makes every entry in the
// sitemap a redirect, which is what made Search Console report a fetch
// failure.
const SITE_URL = 'https://www.arkeaband.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  // Only in home state. There / is the band's landing page and the game lives
  // at /standalone-game, which is then a distinct page with its own canonical.
  // In game state the game is served from / too, so listing both would be
  // asking Google to index two URLs that canonicalise to the same thing.
  if (SITE_STATE === 'home') {
    entries.push({
      url: `${SITE_URL}/standalone-game`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return entries
}
