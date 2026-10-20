import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { ReleaseCountdown } from '@/components/main/release-countdown'
import { HomePage } from '@/components/main/home-page'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'
import {
  OG_IMAGES,
  OG_IMAGES_COUNTDOWN,
  SOCIALS,
  TWITTER_IMAGES,
  TWITTER_IMAGES_COUNTDOWN,
} from '@/constants'
import { SITE_STATE, isCountdown } from '@/config'

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
      'ArkeA is a modern metal band from Tunisia. Trials Of The Elements drops 13 October 2026.',
    keywords: [
      'ArkeA',
      'modern metal',
      'metalcore',
      'modern metal band Tunisia',
      'metal band Tunisia',
      'Tunisia metal band',
      'Tunisian metal scene',
      'independent metal band',
      'international metal band',
      'indie metal band',
    ],
    images: OG_IMAGES_COUNTDOWN,
    twitterImages: TWITTER_IMAGES_COUNTDOWN,
  },
  game: {
    title: 'ArkeA — Trials Of The Elements, Pixel Art Puzzle Game',
    description:
      'Trials Of The Elements is a pixel art puzzle game by ArkeA, a modern metal and metalcore band from Tunisia. Guide Pablob through elemental trials with an 8-bit chiptune soundtrack.',
    keywords: [
      'ArkeA',
      'ArkeA band',
      'modern metal',
      'metalcore',
      'Tunisian metal band',
      'Tunisian metalcore band',
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
    title: 'ArkeA',
    description:
      'ArkeA is a modern metal and metalcore band formed in 2024 across Tunisia, Germany and Canada. Heavy riffs, electronic textures and melodic choruses.',
    keywords: [
      'ArkeA',
      'ArkeA band',
      'ArkeA music',
      'modern metal',
      'metalcore',
      'modern metal band Tunisia',
      'metalcore band Tunisia',
      'metal band Tunisia',
      'Tunisia metal band',
      'Tunisian metal band',
      'Tunisian metalcore band',
      'Tunisian metal scene',
      'independent metal band',
      'international metal band',
      'indie metal band',
      'cross-border metal band',
      'metal band Germany',
      'metal band Canada',
      'Aziz ArkeA',
      'Youssef ArkeA',
      'Ahmed ArkeA',
      'Nizar ArkeA',
      'Pablo ArkeA',
      'Trials Of The Elements',
      'ArkeA game',
      'pixel art puzzle game',
      'pixel art game',
      '8-bit game',
      '8bit chiptune music game',
      'chiptune game',
    ],
    images: OG_IMAGES,
    twitterImages: TWITTER_IMAGES,
  },
} as const

const copy = COPY[SITE_STATE]

// Structured data gives crawlers the band's line-up, origin and genre directly,
// rather than making them infer it from the about copy. The album is only
// included outside the countdown, where naming the record is allowed.
const BAND_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': 'https://www.arkeaband.com/#band',
  name: 'ArkeA',
  alternateName: 'ArkeA Band',
  url: 'https://www.arkeaband.com',
  logo: 'https://www.arkeaband.com/logo.png',
  image: 'https://www.arkeaband.com/og-image.png',
  description:
    'ArkeA is a modern metal and metalcore band formed in 2024 across Tunisia, Germany and Canada. Heavy riffs, electronic textures and melodic choruses.',
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    name: 'Tunisia',
  },
  genre: ['Modern metal', 'Metalcore'],
  member: [
    { '@type': 'Person', name: 'Aziz', jobTitle: 'Musician' },
    { '@type': 'Person', name: 'Youssef', jobTitle: 'Drummer' },
    { '@type': 'Person', name: 'Ahmed', jobTitle: 'Electronics' },
    { '@type': 'Person', name: 'Nizar', jobTitle: 'Bassist' },
    { '@type': 'Person', name: 'Pablo', jobTitle: 'Vocalist' },
  ],
  ...(isCountdown
    ? {}
    : {
        album: {
          '@type': 'MusicAlbum',
          name: 'Trials Of The Elements',
        },
      }),
  sameAs: SOCIALS.map(({ link }) => link),
} as const

export const metadata: Metadata = {
  // Omitted during the countdown. The manifest is what makes a page
  // installable, so leaving it in place still lets Chrome offer its own
  // install prompt even with our banner commented out.
  ...(isCountdown ? {} : { manifest: '/game-content/index.manifest.json' }),
  title: copy.title,
  description: copy.description,
  keywords: [...copy.keywords],
  category: 'music',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'ArkeA',
    locale: 'en_US',
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
      {!isCountdown && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BAND_STRUCTURED_DATA),
          }}
        />
      )}
      {SITE_STATE === 'home' ? (
        <HomePage />
      ) : (
        <>
          {/* Same reason as the manifest above: nothing install-related during
              the countdown, or the browser will still offer to install. */}
          {!isCountdown && <PwaManifestLink />}
          {SITE_STATE === 'countdown' ? <ReleaseCountdown /> : <Standalone />}
        </>
      )}
    </main>
  )
}
