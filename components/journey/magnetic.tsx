'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const Magnetic = ({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode
  strength?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reduceMotion = useReducedMotion()

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    })
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}
