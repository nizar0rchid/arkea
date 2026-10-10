import { Hero } from '@/components/main/hero'
import { InfoSection } from '@/components/main/info-section'
import { AboutContent } from '@/components/main/about-content'
import { MusicContent } from '@/components/main/music-content'
import { GameSection } from '@/components/main/game-section'
import { MerchContent } from '@/components/main/merch-content'
import { Newsletter } from '@/components/main/newsletter'
import { Marquee } from '@/components/journey/marquee'
import { ElementProgress } from '@/components/journey/element-progress'

/**
 * The full landing page, restored from _archived/home-page.tsx and reachable
 * by setting NEXT_PUBLIC_SITE_STATE=home. The original copy stays archived as
 * the reference for what this should look like.
 *
 * pt-[65px] clears the fixed navbar, which the countdown and game pages do not
 * need because they handle their own top spacing.
 */
export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center pt-[65px]">
      <ElementProgress />
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
