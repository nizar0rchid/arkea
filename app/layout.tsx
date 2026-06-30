import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/main/navbar'
import { RootBackground } from '@/components/home/rootBackground'
import { Footer } from '@/components/main/footer'

const unbounded = Unbounded({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arkea',
  description: 'Arkea',
  openGraph: {
    title: 'Arkea',
    description: 'Arkea',
    url: 'https://arkeaband.com',
    siteName: 'Arkea',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arkea',
    description: 'Arkea',
    images: ['/og-image.png'],
  },
}

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${unbounded.className} bg-background min-h-screen`}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  )
}
