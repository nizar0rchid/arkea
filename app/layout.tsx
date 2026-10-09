import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

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
    'Modern metal from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
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
      'Modern metal from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
    url: 'https://arkeaband.com',
    siteName: 'ArkeA',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArkeA',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArkeA — Modern Metal Band From Tunisia',
    description:
      'Modern metal from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
    images: ['/og-image.png'],
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
