'use client'

import Link from 'next/link'
import Image from 'next/image'

import { SOCIALS } from '@/constants'

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-background w-full px-6 py-12 text-gray-200 sm:px-8 md:px-12"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
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
                <Icon className="hover:text-primary h-6 w-6 text-gray-400 transition" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:justify-between md:gap-16 lg:max-w-3xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
              Explore
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="#music"
                className="hover:text-primary text-sm text-gray-300 transition"
              >
                Music
              </Link>
              <Link
                href="/game"
                className="hover:text-primary text-sm text-gray-300 transition"
              >
                Game
              </Link>
              <Link
                href="#merch"
                className="hover:text-primary text-sm text-gray-300 transition"
              >
                Merch
              </Link>
              <Link
                href="#contact"
                className="hover:text-primary text-sm text-gray-300 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
              Booking
            </h3>
            <Link
              href="mailto:booking@arkeaband.com"
              className="hover:text-primary text-sm text-gray-300 transition"
            >
              booking@arkeaband.com
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
              Get In Touch
            </h3>
            <Link
              href="mailto:contact@arkeaband.com"
              className="hover:text-primary text-sm text-gray-300 transition"
            >
              contact@arkeaband.com
            </Link>
          </div>
        </div>
      </div>

      <div className="border-border/30 mx-auto mt-12 max-w-7xl border-t pt-8">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ArkeA. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
