import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { ReleaseCountdown } from '@/components/main/release-countdown'
import { HomePage } from '@/components/main/home-page'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'
import {
  OG_IMAGES,
  OG_IMAGES_COUNTDOWN,
  TWITTER_IMAGES,
  TWITTER_IMAGES_COUNTDOWN,
} from '@/constants'
import { SITE_STATE } from '@/config'

/**
 * Copy is per-state on purpose:
 *
 * - countdown is a teaser, so it names neither the game nor the record
 * - game leads with the game and stays silent on the record
 * - home is the full landing page, so it can say everything
 *
 * Kept as separate blocks rather than one with inline conditionals so it is
 * obvious at a glance what each state is allowed to reveal.
 */
const COPY = {
  countdown: {
    title: 'ArkeA — Something Is Coming',
    description:
      'ArkeA is a modern metal band from Tunisia. New music and something new to play, 13 October 2026.',
    keywords: [
      'ArkeA',
      'modern metal band Tunisia',
      'metal band Tunisia',
      'Tunisia metal band',
      'Tunisian metal scene',
      'indie metal band',
    ],
    images: OG_IMAGES_COUNTDOWN,
    twitterImages: TWITTER_IMAGES_COUNTDOWN,
  },
  game: {
    title: 'ArkeA — Trials Of The Elements, Pixel Art Puzzle Game',
    description:
      'ArkeA is a modern metal band from Tunisia. Trials Of The Elements is a pixel art puzzle game with 8-bit chiptune music. Solve ancient elemental puzzles and uncover the secrets of ArkeA.',
    keywords: [
      'ArkeA',
      'Trials Of The Elements',
      'ArkeA game',
      'pixel art puzzle game',
      'pixel art game',
      '8-bit game',
      '8bit chiptune music game',
      'chiptune game',
      'elemental puzzle game',
    ],
    images: OG_IMAGES,
    twitterImages: TWITTER_IMAGES,
  },
  home: {
    title: 'ArkeA Band',
    description:
      'ArkeA is a modern metal band from Tunisia, forging heavy riffs and mythology-driven lyrics. Listen to the music, meet the band, and play Trials Of The Elements, the pixel art puzzle game releasing alongside it.',
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
    images: OG_IMAGES,
    twitterImages: TWITTER_IMAGES,
  },
} as const

const copy = COPY[SITE_STATE]

export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: copy.title,
  description: copy.description,
  keywords: [...copy.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: copy.title,
    description: copy.description,
    url: '/',
    images: copy.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.title,
    description: copy.description,
    images: copy.twitterImages,
  },
}

export default function Home() {
  return (
    <main className="h-full w-full">
      {SITE_STATE === 'home' ? (
        <HomePage />
      ) : (
        <>
          <PwaManifestLink />
          {SITE_STATE === 'countdown' ? <ReleaseCountdown /> : <Standalone />}
        </>
      )}
    </main>
  )
}
