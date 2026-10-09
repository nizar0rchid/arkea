import type { MetadataRoute } from 'next'

const SITE_URL = 'https://arkeaband.com'

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
