import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

import {
  OG_IMAGES,
  OG_IMAGES_COUNTDOWN,
  TWITTER_IMAGES,
  TWITTER_IMAGES_COUNTDOWN,
} from '@/constants'
import { SITE_STATE } from '@/config'

import './globals.css'

const unbounded = Unbounded({ subsets: ['latin'] })

// Layout level metadata is the fallback for routes that do not set their own,
// so it has to respect the same per-state disclosure as the root page.
const isTeaser = SITE_STATE === 'countdown'

const SITE_DESCRIPTION = isTeaser
  ? 'ArkeA is a modern metal band from Tunisia. New music and something new to play, 13 October 2026.'
  : 'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.'

export const metadata: Metadata = {
  // Without this every relative URL in metadata below resolves against the
  // request host, so social crawlers get a broken OG image URL.
  metadataBase: new URL('https://arkeaband.com'),
  title: {
    default: 'ArkeA Band',
    // Lets each route set a bare title without repeating the brand suffix
    template: '%s | ArkeA',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'ArkeA',
  authors: [{ name: 'ArkeA' }],
  creator: 'ArkeA',
  publisher: 'ArkeA',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ArkeA Band',
    description: SITE_DESCRIPTION,
    url: 'https://arkeaband.com',
    siteName: 'ArkeA',
    locale: 'en_US',
    images: isTeaser ? OG_IMAGES_COUNTDOWN : OG_IMAGES,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArkeA Band',
    description: SITE_DESCRIPTION,
    images: isTeaser ? TWITTER_IMAGES_COUNTDOWN : TWITTER_IMAGES,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${unbounded.className} bg-background min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
