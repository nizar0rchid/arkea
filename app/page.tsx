import { Hero } from '@/components/main/hero'
import { InfoSection } from '@/components/main/info-section'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-[75px]">
      <Hero />
      <InfoSection
        id="about"
        heading="About"
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
      />
      <InfoSection
        id="music"
        heading="Music"
        title="Latest Release"
        description="Lorem ipsum dolor sit amet."
      />
      <InfoSection
        id="merch"
        heading="Merch"
        title="Wear The Trials - Coming Soon"
        description="Limited drops, made for the road."
      />
    </main>
  )
}
