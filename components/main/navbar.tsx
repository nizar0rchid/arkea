'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SOCIALS } from '@/constants'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 z-50 h-[65px] w-full px-4 transition-all duration-300 md:px-10 ${
        isScrolled
          ? 'bg-background/50 shadow-lg backdrop-blur-lg'
          : 'bg-background'
      }`}
    >
      <div className="grid h-full w-full grid-cols-2 items-center">
        <Link
          href="/"
          className="flex items-center justify-self-start"
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <div className="cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              loading="eager"
              width={658}
              height={231}
              draggable={false}
              className="relative z-10 h-auto w-[130px]"
            />
          </div>
        </Link>

        <div className="flex flex-row gap-3 justify-self-end sm:gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="hover:border-primary hover:text-primary h-8 w-8 rounded-full border border-white p-2 text-white transition sm:h-9 sm:w-9" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
