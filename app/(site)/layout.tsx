import { Navbar } from '@/components/main/navbar'
import { Footer } from '@/components/main/footer'
import { RootBackground } from '@/components/home/rootBackground'

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RootBackground />
      <div className="grain-overlay" />
      <Navbar />
      <main className="px-4 sm:px-6 md:px-10">{children}</main>
      <Footer />
    </>
  )
}
