'use client'

import Link from 'next/link'
import Image from 'next/image'

import { SOCIALS } from '@/constants'

export const Footer = () => {
  return (
    <footer className="bg-background w-full px-6 py-12 text-gray-200 sm:px-8 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Left side: Logo + Social Icons */}
        <div className="flex flex-col gap-6">
          <Image
            src="/logo.png"
            alt="ArkeA"
            width={200}
            height={70}
            className="h-auto w-[150px] sm:w-[180px]"
          />
          <div className="flex flex-row gap-4">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon className="h-6 w-6 text-gray-400 transition hover:text-white" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right side: Columns */}
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-16">
          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
              Explore
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="#music"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Music
              </Link>
              <Link
                href="/game"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Game
              </Link>
              <Link
                href="#merch"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Merch
              </Link>
              <Link
                href="#contact"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Booking & Get In Touch stacked */}
          <div className="flex flex-col gap-6">
            {/* Booking */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                Booking
              </h3>
              <Link
                href="mailto:booking@arkeaband.com"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                booking@arkeaband.com
              </Link>
            </div>

            {/* Get In Touch */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                Get In Touch
              </h3>
              <Link
                href="mailto:contact@arkeaband.com"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                contact@arkeaband.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-gray-800 pt-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ArkeA. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
