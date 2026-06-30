import type { Metadata } from 'next'

export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: 'ArkeA - Trial Of The Elements',
  description: 'ArkeA - Trial Of The Elements',
}

export default function StandaloneGameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
