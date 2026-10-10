import type { MetadataRoute } from 'next'

// Matches the host that serves content. The apex 308s to www, and a robots.txt
// pointing crawlers at a redirecting host sends them somewhere else.
const SITE_URL = 'https://www.arkeaband.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The reward iframe is an in-game easter egg, not a landing page
        disallow: ['/reward-video'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
