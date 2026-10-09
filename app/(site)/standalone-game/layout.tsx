import type { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  alternates: {
    // The game renders identically at / and /standalone-game. Pointing the
    // canonical at / keeps one page in the index instead of two.
    canonical: '/',
  },
}

export default function StandaloneGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
