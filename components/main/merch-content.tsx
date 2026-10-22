'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ITEMS = [
  '/home/merch/logoshirt.webp',
  '/home/merch/elemtalshort.webp',
  '/home/merch/hoodie.webp',
]

export const MerchContent = () => {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8">
      {ITEMS.map((src) => (
        <TiltCard key={src} src={src} />
      ))}
    </div>
  )
}

const TiltCard = ({ src }: { src: string }) => {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="border-border bg-card group hover:border-primary/50 border transition-colors duration-300"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="scale-105 object-cover object-center blur-lg"
          />
        </div>

        <span className="text-primary border-primary/30 bg-background/70 absolute top-3 left-3 border px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase backdrop-blur-sm">
          Soon
        </span>

        <Image
          src="/SVG/pad-emblem.svg"
          alt=""
          width={120}
          height={120}
          draggable={false}
          className="pointer-events-none absolute right-3 bottom-3 h-auto w-12 opacity-25"
        />
      </div>

      <div className="border-border flex items-center justify-center border-t p-4">
        <h4 className="font-unbounded text-foreground text-sm font-bold blur-[4px] select-none">
          Coming Soon
        </h4>
      </div>
    </motion.div>
  )
}
