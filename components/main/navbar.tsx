'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {  NAV_LINKS, SOCIALS } from '@/constants'

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="bg-background fixed top-0 z-50 h-[65px] w-full px-10">
      {/* Navbar Container */}
      <div className="grid h-full w-full grid-cols-3 items-center">
        {/* Logo + Name (left) */}
        <Link href="/" className="flex items-center justify-self-start">
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

        {/* Web Navbar (center) */}
        <div className="hidden justify-self-center md:flex">
          <div className="flex items-center justify-center gap-6 rounded-full border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-6 py-[10px] whitespace-nowrap text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer font-bold transition hover:text-[rgb(112,66,248)]"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Icons (Web, right) */}
        <div className="hidden flex-row gap-5 justify-self-end md:flex">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-9 w-9 rounded-full border border-white p-2 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu (mobile only) */}
        <button
          className="col-start-3 justify-self-end text-4xl text-white focus:outline-none md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background -300 absolute top-[65px] left-0 flex w-full flex-col items-center p-5 md:hidden">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer text-center font-bold transition hover:text-[rgb(112,66,248)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center gap-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-9 w-9 rounded-full border border-white p-2 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
