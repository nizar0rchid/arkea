import { Hero } from '@/components/main/hero'
import { InfoSection } from '@/components/main/info-section'
import { AboutContent } from '@/components/main/about-content'
import { MusicContent } from '@/components/main/music-content'
import { GameSection } from '@/components/main/game-section'
import { MerchContent } from '@/components/main/merch-content'
import { Newsletter } from '@/components/main/newsletter'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-[65px]">
      <Hero />

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

      <Newsletter />
    </main>
  )
}
