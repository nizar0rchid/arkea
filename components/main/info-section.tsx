'use client'

import { motion } from 'framer-motion'

import { fadeInUp, staggerContainer } from '@/lib/motion'

interface InfoSectionProps {
  index: string
  title: string
  id?: string
  children?: React.ReactNode
}

export const InfoSection = ({
  index,
  title,
  id,
  children,
}: InfoSectionProps) => {
  return (
    <div id={id} className="relative w-full">
      <div className="relative z-20 flex w-full flex-col  py-[60px] md:px-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 flex items-center gap-5"
        >
          <motion.span
            variants={fadeInUp(0)}
            className="eyebrow text-primary shrink-0"
          >
            {index}
          </motion.span>
          <motion.h2
            variants={fadeInUp(0.05)}
            className="font-display text-foreground shrink-0 text-4xl tracking-[0.02em] uppercase sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={fadeInUp(0.1)}
            className="bg-border h-px min-w-8 flex-1"
          />
        </motion.div>

        {children}
      </div>
    </div>
  )
}
