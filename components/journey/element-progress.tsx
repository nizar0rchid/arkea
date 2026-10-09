'use client'

import { useEffect, useRef, useState } from 'react'

const STAGES = [
  { label: 'Earth', section: 'about' },
  { label: 'Water', section: 'music' },
  { label: 'Fire', section: 'merch' },
  { label: 'Air', section: 'contact' },
] as const

const ACTIVE_GLYPH = '◉'
const INACTIVE_GLYPH = '○'

export const ElementProgress = () => {
  const [active, setActive] = useState(-1)
  const [progress, setProgress] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const sections = STAGES.map(({ section }) =>
        document.getElementById(section),
      )

      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)

      let current = -1
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          current = i
          break
        }
      }
      setActive(current)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Desktop rail — left edge */}
      <div
        ref={railRef}
        aria-hidden
        className="fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative flex flex-col items-center gap-3">
          <div className="relative h-28 w-px">
            <div className="bg-border absolute inset-0" />
            <div
              className="absolute inset-x-0 top-0 bg-[var(--color-primary)]"
              style={{
                height: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
                transition: 'height 0.15s linear',
              }}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {STAGES.map((stage, i) => {
              const isActive = active === i
              return (
                <span
                  key={stage.section}
                  className="flex items-center gap-2"
                  title={stage.label}
                >
                  <span
                    className={`text-[10px] transition-colors duration-300 ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-dim'
                    }`}
                  >
                    {isActive ? ACTIVE_GLYPH : INACTIVE_GLYPH}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile dot rail — right edge */}
      <div
        aria-hidden
        className="fixed top-1/2 right-3 z-40 flex -translate-y-1/2 flex-col gap-3 lg:hidden"
      >
        {STAGES.map((stage, i) => {
          const isActive = active === i
          return (
            <span
              key={stage.section}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'scale-125 bg-[var(--color-primary)]'
                  : 'bg-[var(--color-dim)] opacity-50'
              }`}
            />
          )
        })}
      </div>
    </>
  )
}
