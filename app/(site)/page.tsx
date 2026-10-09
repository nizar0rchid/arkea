import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'
import { OG_IMAGES, TWITTER_IMAGES } from '@/constants'

const TITLE =
  'ArkeA — Trials Of The Elements, Pixel Art Puzzle Game | Modern Metal Band From Tunisia'

const DESCRIPTION =
  'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.'

// Band-led copy for the root page. The EP name is deliberately absent, the
// release is unrevealed. Game name is "Trials Of The Elements" (plural).
export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ArkeA',
    'modern metal band Tunisia',
    'metal band Tunisia',
    'Tunisia metal band',
    'Tunisian metal scene',
    'Trials Of The Elements',
    'ArkeA game',
    'pixel art puzzle game',
    'pixel art game',
    '8-bit game',
    '8bit chiptune music game',
    'chiptune game',
    'indie metal band',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: TWITTER_IMAGES,
  },
}

export default function Home() {
  return (
    <main className="h-full w-full">
      <PwaManifestLink />
      <Standalone />
    </main>
  )
}
