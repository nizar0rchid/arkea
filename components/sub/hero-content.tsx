'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { slideInFromLeft, slideInFromTop } from '@/lib/motion'

const MotionImg = motion.img

export const HeroContent = () => {
  const { scrollY } = useScroll()

  const imageY = useTransform(scrollY, [0, 400], [0, 150])
  const objectPositionY = useTransform(scrollY, [0, 170], [25, 100])
  const objectPosition = useTransform(
    objectPositionY,
    (value) => `100% ${value}%`,
  )

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <motion.div initial="hidden" animate="visible" className="z-20 w-full">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="relative h-[260px] w-full overflow-hidden sm:h-[340px] md:h-[420px]"
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 h-[130%] w-full"
          >
            <MotionImg
              src="/home/hero/herobg.png"
              alt="Logo"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition,
              }}
            />
            <div className="pointer-events-none absolute right-0 bottom-10 z-0 h-full w-1/2">
              <div className="relative h-full w-full">
                <Image
                  src="/home/hero/pablob.png"
                  alt="Floating character"
                  fill
                  sizes="50vw"
                  draggable={false}
                  className="animate-float object-contain object-right-bottom opacity-70"
                  style={{
                    transform: 'scale(0.85)',
                    transformOrigin: 'bottom right',
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromTop}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 sm:px-6 md:gap-4"
          >
            <Image
              src="/home/hero/herologo.png"
              alt="Logo"
              width={255}
              height={80}
              className="h-auto max-w-[140px] object-contain sm:max-w-[190px] md:max-w-[255px]"
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/home/hero/herotitle.png"
              alt="Title"
              width={589}
              height={80}
              className="h-auto max-w-[260px] object-contain sm:max-w-[420px] md:max-w-[589px]"
              style={{ width: 'auto', height: 'auto' }}
            />
            <p className="mt-4 max-w-[280px] text-xs leading-relaxed text-white sm:max-w-sm sm:text-sm md:max-w-md md:text-base">
              Every Element hides a Trial. Every Trial reveals a Secret. Explore
              ArkeA, guide Pablob through elemental trials, solve ancient
              puzzles, and uncover it&#39;s secrets!
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/game"
                className="button-primary rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 sm:px-6 sm:text-base"
              >
                Play The Game
              </Link>
              <a
                href="#music"
                className="border-primary text-primary hover:bg-primary/10 rounded-lg border px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 sm:px-6 sm:text-base"
              >
                Listen Now
              </a>
            </div>
          </motion.div>

          <div className="border-border pointer-events-none absolute top-0 left-0 z-20 h-8 w-8 border-t-2 border-l-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:border-t-3 md:border-l-3" />

          <div className="border-border pointer-events-none absolute right-0 bottom-0 z-20 h-8 w-8 border-r-2 border-b-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:border-r-3 md:border-b-3" />

          <div className="from-background/70 pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}
