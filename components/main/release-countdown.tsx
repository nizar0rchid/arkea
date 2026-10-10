'use client'

import Image from 'next/image'

import { Countdown } from '@/components/main/countdown'
import { Embers } from '@/components/journey/embers'

export const ReleaseCountdown = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-65px)] w-full items-center justify-center overflow-hidden px-4 py-20">
      {/* Grid-line texture, masked to a radial fade */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(242,237,230,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,230,0.10) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 90% 75% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 75% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* Sigil watermark */}
      <Image
        src="/SVG/pad-emblem.svg"
        alt=""
        width={680}
        height={680}
        draggable={false}
        className="animate-sigil-breathe pointer-events-none absolute top-[54%] left-1/2 -z-0 h-auto w-[90vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 sm:w-[540px] md:w-[620px]"
      />

      {/* Radial scrim to keep text readable over the watermark */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(11,10,12,0.78) 0%, rgba(11,10,12,0.45) 55%, transparent 100%)',
        }}
      />

      <Embers className="z-[1]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center sm:gap-10">
        <p className="text-primary font-display text-xs tracking-[0.3em] uppercase sm:text-sm">
          Something is coming
        </p>

        <div className="relative w-full">
          <Image
            src="/logo.png"
            alt="ArkeA"
            width={658}
            height={231}
            draggable={false}
            className="mx-auto h-auto w-[70vw] max-w-[360px] object-contain opacity-80 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:max-w-[520px]"
          />
        </div>

        <Countdown />

        <p className="max-w-xl text-sm leading-relaxed sm:text-base">
          <time
            dateTime="2026-10-13T19:00:00+01:00"
            className="text-primary font-mono text-base font-bold tracking-[0.2em] uppercase sm:text-lg"
          >
            13 October 2026 — 19:00 UTC+1
          </time>
          <span className="text-primary block">
            Every element hides a trial, every trial reveals a secret.
          </span>
        </p>
      </div>
    </section>
  )
}
