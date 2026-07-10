'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/motion'

export const SectionDivider = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative z-20 mx-auto flex w-full max-w-3xl items-center justify-center px-4 py-0 sm:py-10"
    ></motion.div>
  )
}
