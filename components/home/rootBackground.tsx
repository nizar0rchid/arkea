'use client'

import { useState, useEffect, useRef } from 'react'
import { UnderConstructionBg } from '@/components/main/under-construction-bg'

const SVGS = ['/SVG/1.svg', '/SVG/2.svg', '/SVG/3.svg', '/SVG/4.svg']

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

    setBg(SVGS[next])
  }, [])

  if (bg === null) return <UnderConstructionBg bg={null} />

  return <UnderConstructionBg bg={bg} />
}
