import { RootBackground } from '@/components/home/rootBackground'
import { Hero } from '@/components/main/hero'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RootBackground />
      <div className="mt-20 flex min-h-screen items-start justify-center">
        <Hero />
      </div>
    </main>
  )
}
