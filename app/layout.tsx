import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

import { OG_IMAGES, TWITTER_IMAGES } from '@/constants'

import './globals.css'

const unbounded = Unbounded({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Without this every relative URL in metadata below resolves against the
  // request host, so social crawlers get a broken OG image URL.
  metadataBase: new URL('https://arkeaband.com'),
  title: {
    default: 'ArkeA — Modern Metal Band From Tunisia',
    // Lets each route set a bare title without repeating the brand suffix
    template: '%s | ArkeA',
  },
  description:
    'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
  applicationName: 'ArkeA',
  authors: [{ name: 'ArkeA' }],
  creator: 'ArkeA',
  publisher: 'ArkeA',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ArkeA — Modern Metal Band From Tunisia',
    description:
      'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
    url: 'https://arkeaband.com',
    siteName: 'ArkeA',
    locale: 'en_US',
    images: OG_IMAGES,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArkeA — Modern Metal Band From Tunisia',
    description:
      'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
    images: TWITTER_IMAGES,
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
