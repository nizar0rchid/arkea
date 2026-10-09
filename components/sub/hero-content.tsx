'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { fadeInUp, staggerContainer } from '@/lib/motion'
import { Magnetic } from '@/components/journey/magnetic'
import { Embers } from '@/components/journey/embers'

export const HeroContent = () => {
  const { scrollY } = useScroll()

  const sigilY = useTransform(scrollY, [0, 400], [0, 120])
  const gridY = useTransform(scrollY, [0, 400], [0, -60])
  const cueOpacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <section className="relative flex min-h-[calc(100svh-65px)] w-full items-center justify-center overflow-hidden px-4">
      {/* Grid-line texture, masked to a radial fade */}
      <motion.div style={{ y: gridY }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,237,230,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,230,0.10) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 90% 75% at 50% 50%, black 40%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 75% at 50% 50%, black 40%, transparent 90%)',
          }}
        />
      </motion.div>

      {/* Subtle accent glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'color-mix(in srgb, var(--color-primary) 5%, transparent)',
        }}
      />

      {/* Sigil watermark */}
      <motion.div
        style={{ y: sigilY }}
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src="/SVG/pad-emblem.svg"
          alt=""
          width={680}
          height={680}
          draggable={false}
          className="animate-sigil-breathe h-auto w-[95vw] max-w-[680px] sm:w-[560px] md:w-[680px]"
        />
      </motion.div>

      {/* Radial scrim to keep text readable over the parallax background */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(11,10,12,0.78) 0%, rgba(11,10,12,0.45) 55%, transparent 100%)',
        }}
      />

      {/* Ambient embers */}
      <Embers className="z-[1]" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4 text-center sm:gap-5"
      >
        <motion.p
          variants={fadeInUp(0)}
          className="eyebrow font-display text-primary text-xs sm:text-sm"
        >
          Debut EP — Trial Of The Elements
        </motion.p>

        <motion.div variants={fadeInUp(0.1)} className="relative w-full">
          <Image
            src="/logo.png"
            alt="ArkeA"
            width={658}
            height={231}
            draggable={false}
            className="mx-auto h-auto w-[70vw] max-w-[360px] object-contain opacity-80 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:max-w-[520px]"
          />
        </motion.div>

        <motion.p
          variants={fadeInUp(0.2)}
          className="font-display text-foreground/90 max-w-2xl text-base leading-snug sm:text-lg md:text-xl"
        >
          Every Element hides a Trial. Every Trial reveals a Secret. Explore
          ArkeA, guide Pablob through elemental trials, solve ancient puzzles,
          and uncover its secrets!
        </motion.p>

        <motion.div
          variants={fadeInUp(0.3)}
          className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Magnetic>
            <Link
              href="#music"
              className="btn-primary font-display w-full max-w-[300px] cursor-pointer rounded-sm px-8 py-3 text-base tracking-wide sm:w-auto sm:px-8 sm:py-3 sm:text-lg"
            >
              Listen Now
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/game"
              className="btn-ghost font-display w-full max-w-[300px] cursor-pointer rounded-sm px-8 py-3 text-base tracking-wide sm:w-auto sm:px-8 sm:py-3 sm:text-lg"
            >
              Play The Game
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p
          variants={fadeInUp(0.4)}
          className="mt-1 flex items-center gap-2"
        >
          <span className="bg-primary h-2 w-2 rounded-full" />
          <span className="font-display text-foreground/80 text-xs tracking-[0.2em] uppercase sm:text-sm">
            Also out now — The Companion Game
          </span>
        </motion.p>
      </motion.div>

      {/* Scroll cue — invites the user to begin the trial */}
      <motion.a
        href="#about"
        style={{ opacity: cueOpacity }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
        aria-label="Scroll to explore"
      >
        <span className="eyebrow text-dim text-[10px]">Enter ArkeA</span>
        <svg
          className="animate-cue text-foreground/70 h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  )
}
