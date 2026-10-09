import type { Metadata } from 'next'

import { Standalone } from '@/components/main/standalone'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'

// Only the manifest is set here on purpose. Title, description, openGraph and
// twitter stay inherited from app/layout.tsx so the OG image keeps resolving.
export const metadata: Metadata = {
  manifest: '/game-content/index.manifest.json',
}

export default function Home() {
  return (
    <main className="h-full w-full">
      <PwaManifestLink />
      <Standalone />
    </main>
  )
}
