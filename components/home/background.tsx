'use client'

import { useSyncExternalStore } from 'react'

const keyframes = `@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.15); }
}`

const POSITIONS = ['top', 'center', 'bottom'] as const
type BgPosition = (typeof POSITIONS)[number]

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

  return (
    <>
      <style>{keyframes}</style>
      <div
        className="fixed inset-0 -z-50 opacity-20 blur-[2px] brightness-110"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: position,
          animation: 'slow-zoom 12s linear infinite alternate',
        }}
      />
    </>
  )
}
