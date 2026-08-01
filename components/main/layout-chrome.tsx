'use client'

import { usePathname } from 'next/navigation'

import { Navbar } from '@/components/main/navbar'
import { Footer } from '@/components/main/footer'

const BARE_ROUTES = ['/reward-video']

export const LayoutChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isBare = BARE_ROUTES.includes(pathname)

  return (
    <>
      {!isBare && <Navbar />}
      <main className={isBare ? 'h-screen w-full' : 'px-4 sm:px-6 md:px-10'}>
        {children}
      </main>
      {!isBare && <Footer />}
    </>
  )
}
