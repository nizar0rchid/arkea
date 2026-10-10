import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa'
import { RxInstagramLogo } from 'react-icons/rx'
import { FaXTwitter } from 'react-icons/fa6'

// Next.js replaces (not deep-merges) openGraph/twitter when a page defines
// them, so any route with its own metadata must repeat the image or it
// silently loses the card preview. Single source so they cannot drift.
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'ArkeA - Trials Of The Elements',
} as const

export const OG_IMAGES = [OG_IMAGE]

export const TWITTER_IMAGES = ['/og-image.png']

export const SOCIALS = [
  {
    name: 'Instagram',
    icon: RxInstagramLogo,
    link: 'https://instagram.com/arkeaband',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    link: 'https://facebook.com/arkeaband',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    link: 'https://x.com/arkeaband',
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    link: 'https://www.tiktok.com/@arkeaband',
  },
  {
    name: 'Youtube',
    icon: FaYoutube,
    link: 'https://www.youtube.com/@arkeaband',
  },
] as const

export const NAV_LINKS = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Music',
    link: '#music',
  },
  {
    title: 'Game',
    link: '/standalone-game',
  },
  {
    title: 'Merch',
    link: '#merch',
  },
  {
    title: 'Contact',
    link: '#contact',
  },
] as const
