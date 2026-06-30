'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { slideInFromTop } from '@/lib/motion'

export const Encryption = () => {
  return (
    <div className="relative -z-20 flex h-full min-h-screen w-full flex-row items-center justify-center">
      <div className="absolute top-0 z-5 h-auto w-auto">
        <motion.div
          variants={slideInFromTop}
          className="text-center text-[40px] font-medium text-gray-200"
        >
          Performance{' '}
          <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            &
          </span>{' '}
          security.
        </motion.div>
      </div>

      <div className="absolute z-20 flex h-auto w-auto translate-y-[-50px] flex-col items-center justify-center">
        <div className="group flex h-auto w-auto cursor-pointer flex-col items-center">
          <Image
            src="/lock-top.png"
            alt="Lock top"
            width={50}
            height={50}
            className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/lock-main.png"
            alt="Lock main"
            width={70}
            height={70}
            className="z-10"
          />
        </div>

        <div className="Welcome-box z-20 my-[20px] border border-[#7042F88B] px-[15px] py-[4px] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
        </div>
      </div>

      <div className="absolute bottom-[10px] z-20 px-[5px]">
        <div className="cursive text-center text-[20px] font-medium text-gray-300">
          Secure your data with end-to-end encryption.
        </div>
      </div>

      <div className="absolute flex w-full items-start justify-center">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="h-auto w-full"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>
  )
}
