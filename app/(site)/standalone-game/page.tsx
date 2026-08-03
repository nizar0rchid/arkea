import { Standalone } from '@/components/main/standalone'
import { PwaManifestLink } from '@/components/main/pwa-manifest-link'

export default function StandaloneGame() {
  return (
    <main className="h-full w-full">
      <PwaManifestLink />
      <Standalone />
    </main>
  )
}
