'use client'

interface Ember {
  left: string
  top: string
  size: number
  duration: number
  delay: number
  sway: number
  opacity: number
}

const COUNT = 14

// Deterministic PRNG so server + client render identical ember positions
// (avoids React hydration mismatches from Math.random).
const mulberry32 = (seed: number) => {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const createEmbers = (): Ember[] => {
  const rand = mulberry32(1337)
  return Array.from({ length: COUNT }, (_, i) => ({
    left: `${(i / COUNT) * 100 + rand() * 4}%`,
    top: `${20 + rand() * 70}%`,
    size: 2 + rand() * 3,
    duration: 6 + rand() * 6,
    delay: -rand() * 10,
    sway: (rand() - 0.5) * 40,
    opacity: 0.25 + rand() * 0.2,
  }))
}

let embers: Ember[] | null = null
const getEmbers = () => (embers ??= createEmbers())

export const Embers = ({ className = '' }: { className?: string }) => {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {getEmbers().map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left,
            top: e.top,
            width: e.size,
            height: e.size,
            ['--ember-duration' as string]: `${e.duration}s`,
            ['--ember-delay' as string]: `${e.delay}s`,
            ['--ember-sway' as string]: `${e.sway}px`,
            ['--ember-opacity' as string]: e.opacity,
          }}
        />
      ))}
    </div>
  )
}
