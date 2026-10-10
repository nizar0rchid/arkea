'use client'

import { useEffect, useState } from 'react'

// 13 October 2026, 19:00 in Tunisia. Tunisia is UTC+1 all year (no DST), so
// the offset is fixed and the target is unambiguous for every visitor.
export const RELEASE_DATE = new Date('2026-10-13T19:00:00+01:00')

type Remaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const split = (ms: number): Remaining => {
  const total = Math.max(0, Math.floor(ms / 1000))

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
] as const

// null until the first tick runs on the client. The server renders this same
// null, so hydration matches and there is no mismatch warning.
export const Countdown = () => {
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  useEffect(() => {
    const tick = () => {
      setRemaining(split(RELEASE_DATE.getTime() - Date.now()))
    }

    tick()
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="flex w-full items-start justify-center gap-3 sm:gap-5"
      role="timer"
      aria-live="off"
      aria-label={
        remaining === null
          ? 'Counting down to 13 October 2026, 19:00 UTC+1'
          : `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until 13 October 2026, 19:00 UTC+1`
      }
    >
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="border-primary/25 bg-card/60 flex min-w-[4.5rem] flex-col items-center gap-2 border px-3 py-4 backdrop-blur-xs sm:min-w-[6rem] sm:px-5"
        >
          <span className="text-primary font-mono text-3xl leading-none font-bold tabular-nums sm:text-5xl">
            {remaining === null
              ? '--'
              : String(remaining[key]).padStart(2, '0')}
          </span>
          <span className="text-dim font-mono text-[10px] tracking-[0.25em] uppercase sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
