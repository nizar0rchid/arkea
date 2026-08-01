import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

import './globals.css'
import { LayoutChrome } from '@/components/main/layout-chrome'
import { RootBackground } from '@/components/home/rootBackground'

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${unbounded.className} bg-background min-h-screen`}>
        <RootBackground />
        <div className="grain-overlay" />
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  )
}
