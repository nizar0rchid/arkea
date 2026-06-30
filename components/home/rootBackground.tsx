'use client'

import { useEffect, useState } from 'react'
import { UnderConstructionBg } from '@/components/main/under-construction-bg'

const SVGS = ['/SVG/1.svg', '/SVG/2.svg', '/SVG/3.svg', '/SVG/4.svg']

export const RootBackground = () => {
  const [bg, setBg] = useState<string | null>(null)

  useEffect(() => {
    const current = Number(sessionStorage.getItem('uc-bg')) ?? -1
    const next = current + 1 >= SVGS.length ? 0 : current + 1
    sessionStorage.setItem('uc-bg', String(next))
    setBg(SVGS[next])
  }, [])

  return (
    <main>
      <UnderConstructionBg bg={bg} />
    </main>
  )
}
