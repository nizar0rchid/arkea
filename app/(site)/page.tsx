import { Hero } from '@/components/main/hero'
import { InfoSection } from '@/components/main/info-section'
import { SectionDivider } from '@/components/main/section-divider'
import { AboutContent } from '@/components/main/about-content'
import { MusicContent } from '@/components/main/music-content'
import { MerchContent } from '@/components/main/merch-content'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-[75px]">
      <Hero />

      <SectionDivider />

      <InfoSection
        id="about"
        heading="About"
        title="The Awakening of ArkeA"
        description="Forged in the underground, ArkeA blends crushing riffs with atmospheric storytelling. Each song is a gateway to a universe where myth and metal collide."
        variant="fadeUp"
      >
        <AboutContent />
      </InfoSection>

      <SectionDivider />

      <InfoSection
        id="music"
        heading="Music"
        title="Latest Release"
        description="Our debut EP — a sonic journey through the four elemental trials. Coming soon."
        variant="slideLeft"
      >
        <MusicContent />
      </InfoSection>

      <SectionDivider />

      <InfoSection
        id="merch"
        heading="Merch"
        title="Wear The Trials"
        description="Limited drops, made for the road."
        variant="fadeUp"
      >
        <MerchContent />
      </InfoSection>
    </main>
  )
}
