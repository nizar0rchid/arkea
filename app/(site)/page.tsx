import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'

const TITLE = 'ArkeA — Trial Of The Elements | Metalcore Band From Tunisia'

const DESCRIPTION =
  'ArkeA is a modern metal and metalcore band from Tunisia. Play Trial Of The Elements, the original video game releasing with our debut EP. Every element hides a trial, every trial reveals a secret.'

// Pulled from the archived home page so the band, the EP and the game all read
// as one thing rather than three unrelated keywords.
export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ArkeA',
    'metalcore band Tunisia',
    'modern metal Tunisia',
    'metal band Tunisia',
    'Tunisia metalcore',
    'Trial Of The Elements',
    'ArkeA debut EP',
    'metalcore video game',
    'indie metal band',
    'Tunisian metal scene',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
