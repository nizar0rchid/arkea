// ARCHIVED 2026-10-09 — original home page, verbatim copy.
// Restore with: git checkout backup/pre-strip-home -- "app/(site)/page.tsx"
// or copy this file back to app/(site)/page.tsx.
import { Hero } from '@/components/main/hero'
import { InfoSection } from '@/components/main/info-section'
import { AboutContent } from '@/components/main/about-content'
import { MusicContent } from '@/components/main/music-content'
import { GameSection } from '@/components/main/game-section'
import { MerchContent } from '@/components/main/merch-content'
import { Newsletter } from '@/components/main/newsletter'
import { Marquee } from '@/components/journey/marquee'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-[65px] ">
      <Hero />
      <Marquee />
      <div className="px-4 sm:px-6 md:px-10">
          <GameSection />

          <InfoSection id="about" index="01" title="The Awakening of ArkeA">
              <AboutContent />
          </InfoSection>

          <InfoSection id="music" index="02" title="Latest Release">
              <MusicContent />
          </InfoSection>

          <InfoSection id="merch" index="03" title="Wear The Trials">
              <MerchContent />
          </InfoSection>
      </div>

      <Marquee />

      <Newsletter />
    </main>
  )
}