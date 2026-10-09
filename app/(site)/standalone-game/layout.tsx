import type { Metadata } from 'next'

import { OG_IMAGES, TWITTER_IMAGES } from '@/constants'

const TITLE = 'Trials Of The Elements — Pixel Art Puzzle Game | ArkeA'

const DESCRIPTION =
  'Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Guide Pablob through elemental trials, solve ancient puzzles and uncover the secrets of ArkeA.'

// Game-led metadata, distinct from the band-led root page, but canonicalised
// to / so only one of the two is indexed.
export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ArkeA game',
    'Trials Of The Elements',
    'pixel art game',
    'pixel art puzzle game',
    '8-bit game',
    '8bit chiptune music game',
    'chiptune game',
    'retro puzzle game',
    'elemental puzzle game',
    'indie puzzle game',
    'free browser puzzle game',
  ],
  alternates: {
    // The game renders identically at / and /standalone-game. Pointing the
    // canonical at / keeps one page in the index instead of two.
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: TWITTER_IMAGES,
  },
}

export default function StandaloneGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
