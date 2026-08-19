'use client'

import Link from 'next/link'
import Image from 'next/image'

import { SOCIALS } from '@/constants'

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-background border-border w-full border-t px-6 pt-16 pb-8 text-gray-200 sm:px-8 md:px-12"
    >
      <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
        <div className="flex flex-col gap-5">
          <Image
            src="/logo.png"
            alt="ArkeA"
            width={200}
            height={70}
            className="h-auto w-[150px] sm:w-[170px]"
          />

          <div className="flex flex-row gap-4">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon className="text-muted-foreground hover:text-primary h-5 w-5 transition" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-dim font-display  tracking-[0.25em] uppercase">
            Explore
          </h3>
          <div className="flex flex-col gap-2">
            <Link
              href="#music"
              className="hover:text-primary text-foreground/80 text-sm transition"
            >
              Music
            </Link>
            <Link
              href="/game"
              className="hover:text-primary text-foreground/80 text-sm transition"
            >
              Game
            </Link>
            <Link
              href="#merch"
              className="hover:text-primary text-foreground/80 text-sm transition"
            >
              Merch
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary text-foreground/80 text-sm transition"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-dim font-display  tracking-[0.25em] uppercase">
            Booking
          </h3>
          <Link
            href="mailto:booking@arkeaband.com"
            className="hover:text-primary text-foreground/80 text-sm transition"
          >
            booking@arkeaband.com
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-dim font-display  tracking-[0.25em] uppercase">
            Get In Touch
          </h3>
          <Link
            href="mailto:contact@arkeaband.com"
            className="hover:text-primary text-foreground/80 text-sm transition"
          >
            contact@arkeaband.com
          </Link>
        </div>
      </div>

      <div className="border-border mt-14 flex w-full flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
        <p className="text-dim text-xs">
          &copy; {new Date().getFullYear()} ArkeA. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
