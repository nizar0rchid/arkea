'use client'

import { motion } from 'framer-motion'

import { slideInFromLeft } from '@/lib/motion'

interface InfoSectionProps {
  heading: string
  title: string
  description: string
  id?: string
  children?: React.ReactNode
}

export const InfoSection = ({
  heading,
  title,
  description,
  id,
  children,
}: InfoSectionProps) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={slideInFromLeft(0.5)}
      className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20 sm:px-6 md:px-8"
    >
      {/* Heading with side lines */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-purple-500 sm:w-16 md:w-20" />
        <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
          {heading}
        </h2>
        <div className="h-1 w-12 bg-gradient-to-l from-transparent to-purple-500 sm:w-16 md:w-20" />
      </div>

      {/* Main title */}
      <h3 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-8 max-w-2xl text-center text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
        {description}
      </p>

      {/* Additional content */}
      {children && <div className="w-full">{children}</div>}
    </motion.div>
  )
}
