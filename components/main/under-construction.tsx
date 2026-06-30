'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UnderConstructionBg } from '@/components/main/under-construction-bg'
import { UnderConstructionContent } from '@/components/main/under-construction-content'

const SVGS = ['/SVG/1.svg', '/SVG/2.svg', '/SVG/3.svg', '/SVG/4.svg']

function getNextBg() {
  if (globalThis.window === undefined) return null // SSR guard

  const current = Number(sessionStorage.getItem('uc-bg') ?? -1)
  const next = current + 1 >= SVGS.length ? 0 : current + 1
  sessionStorage.setItem('uc-bg', String(next))
  return SVGS[next]
}

export const UnderConstruction = () => {
  const [bg] = useState(getNextBg)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden select-none">
      <UnderConstructionBg bg={bg} />
      <div className="absolute top-0 left-0 z-20 w-full py-4">
        <Image
          src="/SVG/border.svg"
          alt=""
          width={1440}
          height={37}
          unoptimized
          className="h-auto w-full"
          draggable={false}
        />
      </div>
      <UnderConstructionContent bg={bg} />
      <div className="absolute bottom-0 left-0 z-20 w-full rotate-180 py-4">
        <Image
          src="/SVG/border.svg"
          alt=""
          width={1440}
          height={37}
          unoptimized
          className="h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  )
}
