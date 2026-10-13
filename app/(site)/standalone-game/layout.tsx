import type { Metadata } from 'next'

import { OG_IMAGES, TWITTER_IMAGES } from '@/constants'
import { SITE_STATE, isCountdown } from '@/config'

const TITLE = 'Trials Of The Elements — Pixel Art Puzzle Game | ArkeA'

const DESCRIPTION =
  'Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Guide Pablob through elemental trials, solve ancient puzzles and uncover the secrets of ArkeA.'

// Game-led metadata, distinct from the band-led root page, but canonicalised
// to / so only one of the two is indexed.
export const metadata: Metadata = {
  // Omitted during the countdown, same as the root page. The proxy already
  // redirects this route away in that state, but the manifest is what makes a
  // page installable so it should never render there.
  ...(isCountdown ? {} : { manifest: '/game-content/index.manifest.json' }),
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
    // In game state / renders the same game, so canonicalising to / keeps one
    // page indexed. In home state / is the band's landing page and this is the
    // only game URL, so it has to stand on its own to be indexed at all.
    canonical: SITE_STATE === 'home' ? '/standalone-game' : '/',
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
