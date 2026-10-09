import { Navbar } from '@/components/main/navbar'
import { Footer } from '@/components/main/footer'
import { RootBackground } from '@/components/home/rootBackground'
import { ElementProgress } from '@/components/journey/element-progress'

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RootBackground />
      <div className="grain-overlay" />
      <Navbar />
      <ElementProgress />
      <main className="">{children}</main>
      <Footer />
    </>
  )
}
