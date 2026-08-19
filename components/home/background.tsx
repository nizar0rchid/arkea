'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const keyframes = `@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}`

const POSITIONS = ['top', 'center', 'bottom'] as const
type BgPosition = (typeof POSITIONS)[number]

const MIN_OPACITY = 0.06
const MAX_OPACITY = 0.2
const FADE_START = 0.7 // scroll distance (in viewport heights) before the bg starts fading in
const FADE_RANGE = 1.4 // additional scroll distance (in viewport heights) over which it reaches max

const serverPosition: BgPosition = 'top'
const clientPosition: BgPosition =
  POSITIONS[Math.floor(Math.random() * POSITIONS.length)]

const subscribe = () => () => {}

export const Background = ({ bg }: { bg: string | null }) => {
  const position = useSyncExternalStore(
    subscribe,
    () => clientPosition,
    () => serverPosition,
  )

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolledHeights = window.scrollY / window.innerHeight
      const progress = Math.min(
        Math.max((scrolledHeights - FADE_START) / FADE_RANGE, 0),
        1,
      )
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{keyframes}</style>
      <div
        className="fixed inset-0 -z-50 blur-[2px] brightness-110"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: position,
          animation: 'slow-zoom 12s linear infinite alternate',
          opacity: MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * scrollProgress,
          transition: 'opacity 0.2s linear',
        }}
      />
    </>
  )
}
