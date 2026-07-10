import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa'
import { RxInstagramLogo } from 'react-icons/rx'
import { FaXTwitter } from 'react-icons/fa6'

export const SOCIALS = [
  {
    name: 'Instagram',
    icon: RxInstagramLogo,
    link: 'https://instagram.com/arkeaband',
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    link: 'https://facebook.com/profile.php?id=61573737171853',
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
    link: '/game',
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
