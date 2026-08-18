'use client'

import { motion } from 'framer-motion'

import { slideInFromLeft, fadeInUp, staggerContainer } from '@/lib/motion'

interface InfoSectionProps {
  heading: string
  title: string
  description: string
  id?: string
  children?: React.ReactNode
  align?: 'left' | 'center'
  variant?: 'slideLeft' | 'fadeUp'
}

export const InfoSection = ({
  heading,
  title,
  description,
  id,
  children,
  align = 'center',
  variant = 'slideLeft',
}: InfoSectionProps) => {
  const sectionVariant =
    variant === 'slideLeft' ? slideInFromLeft(0.5) : fadeInUp(0.3)

  return (
    <div
      id={id}
      className={`relative w-full rounded-lg bg-black/20 backdrop-blur-[2px]`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute inset-0`} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionVariant}
        className={`relative z-20 mx-auto flex w-full flex-col px-4 py-20 sm:px-6 md:px-8 ${
          align === 'center' ? 'items-center' : 'items-start'
        }`}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`w-full ${align === 'center' ? 'flex flex-col items-center text-center' : ''}`}
        >
          <motion.div
            variants={fadeInUp(0.1)}
            className={`mb-6 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}
          >
            <div className="to-primary h-1 w-12 bg-gradient-to-r from-transparent sm:w-16 md:w-20" />
            <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
              {heading}
            </h2>
            <div className="to-primary h-1 w-12 bg-gradient-to-l from-transparent sm:w-16 md:w-20" />
          </motion.div>

          <motion.h3
            variants={fadeInUp(0.2)}
            className={`mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl ${
              align === 'center' ? 'text-center' : ''
            }`}
          >
            {title}
          </motion.h3>

          <motion.p
            variants={fadeInUp(0.3)}
            className={`mb-8 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg ${
              align === 'center' ? 'text-center' : ''
            }`}
          >
            {description}
          </motion.p>

          {children && (
            <motion.div variants={fadeInUp(0.4)} className="w-full">
              {children}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
