import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'

export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
  title: 'ArkeA - Trial Of The Elements',
  description: 'ArkeA - Trial Of The Elements',
}

export default function Home() {
  return (
    <main className="h-full w-full">
      <PwaManifestLink />
      <Standalone />
    </main>
  )
}
