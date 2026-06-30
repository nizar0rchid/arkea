'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/lib/motion'

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
      <motion.div
        initial="hidden"
        animate="visible"
        className="z-20 w-full px-4 sm:px-6 md:px-10"
      >
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="relative h-[260px] w-full overflow-hidden sm:h-[340px] md:h-[420px]"
        >
          {/* Background pan image */}
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
          </motion.div>

          {/* Overlay content */}
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
            />
            <Image
              src="/home/hero/herotitle.png"
              alt="Title"
              width={589}
              height={80}
              className="h-auto max-w-[260px] object-contain sm:max-w-[420px] md:max-w-[589px]"
            />
            <p className="mt-4 max-w-[280px] text-xs leading-relaxed text-white sm:max-w-sm sm:text-sm md:max-w-md md:text-base">
              Every Element hides a Trial. Every Trial reveals a Secret. Explore
              ArkeA, guide Pablob through elemental trials, solve ancient
              puzzles, and uncover it&#39;s secrets!
            </p>
          </motion.div>

          {/* Corner borders: top-left */}
          <div className="border-border pointer-events-none absolute top-0 left-0 z-20 h-8 w-8 border-t-2 border-l-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:border-t-3 md:border-l-3" />

          {/* Corner borders: bottom-right */}
          <div className="border-border pointer-events-none absolute right-0 bottom-0 z-20 h-8 w-8 border-r-2 border-b-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:border-r-3 md:border-b-3" />
        </motion.div>
        {/* Overlapping image at the bottom of the hero */}
        <motion.div
          variants={slideInFromRight(0.5)}
          className="pointer-events-none absolute -bottom-22 left-1/2 z-30 -translate-x-1/2 sm:-bottom-28 md:-bottom-52"
        >
          <Image
            src="/home/hero/pablob.png"
            alt="Floating character"
            width={700}
            height={666}
            draggable={false}
            className="h-auto max-w-[50vw] object-contain md:max-w-none"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
