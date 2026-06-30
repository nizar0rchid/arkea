'use client'

import { SparklesIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/lib/motion'

export const SkillText = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box opacity-[0.9]] border border-[#7042f88b] px-[7px] py-[8px]"
      >
        <SparklesIcon className="mr-[10px] h-5 w-5 text-[#b49bff]" />
        <h1 className="Welcome-text text-[13px]">
          Think better with Next.js 14
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="mt-[10px] mb-[15px] text-center text-[30px] font-medium text-white"
      >
        Making apps with modern technologies.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive mt-[10px] mb-10 text-center text-[20px] text-gray-200"
      >
        Never miss a task, deadline or idea.
      </motion.div>
    </div>
  )
}
