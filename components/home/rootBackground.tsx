'use client'

import { useState, useEffect, useRef } from 'react'
import { Background } from '@/components/home/background'

const SVGS = ['/SVG/1.svg', '/SVG/2.svg', '/SVG/3.svg', '/SVG/4.svg']
const THEMES = ['theme-sand', 'theme-ocean', 'theme-fire', 'theme-forest']

export const RootBackground = () => {
  const [bg, setBg] = useState<string | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const stored = sessionStorage.getItem('uc-bg')
    const current = stored === null ? null : Number(stored)

    // A new tab starts on a random theme, then advances through the set on each
    // reload. Wrapping only after all four have shown means a theme cannot
    // repeat before the sequence completes.
    const next =
      current !== null && current >= 0 && current < SVGS.length
        ? (current + 1) % SVGS.length
        : Math.floor(Math.random() * SVGS.length)

    sessionStorage.setItem('uc-bg', String(next))

    document.documentElement.classList.remove(...THEMES)
    document.documentElement.classList.add(THEMES[next])

    setBg(SVGS[next])
  }, [])

  if (bg === null) return <Background bg={null} />

  return <Background bg={bg} />
}
