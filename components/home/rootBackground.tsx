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
    const current = stored ? Number(stored) : -1
    const next = current + 1 >= SVGS.length ? 0 : current + 1
    sessionStorage.setItem('uc-bg', String(next))

    document.documentElement.classList.remove(...THEMES)
    document.documentElement.classList.add(THEMES[next])

    setBg(SVGS[next])
  }, [])

  if (bg === null) return <Background bg={null} />

  return <Background bg={bg} />
}
