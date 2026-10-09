import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'

import './globals.css'

const unbounded = Unbounded({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Without this every relative URL in metadata below resolves against the
  // request host, so social crawlers get a broken OG image URL.
  metadataBase: new URL('https://arkeaband.com'),
  title: 'Arkea',
  description: 'Arkea',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arkea',
    description: 'Arkea',
    url: 'https://arkeaband.com',
    siteName: 'Arkea',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArkeA',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${unbounded.className} bg-background min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
