import type { Metadata } from 'next'

const TITLE = 'Trial Of The Elements — The ArkeA Game'

const DESCRIPTION =
  'Guide Pablob through elemental trials, solve ancient puzzles and uncover the secrets of ArkeA. The original video game releasing with the debut EP from Tunisian metalcore band ArkeA.'

// Game-led metadata, distinct from the band-led root page, but canonicalised
// to / so only one of the two is indexed.
export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ArkeA game',
    'Trial Of The Elements',
    'metalcore video game',
    'elemental puzzle game',
    'browser game',
    'ArkeA debut EP',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function StandaloneGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
