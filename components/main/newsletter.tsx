'use client'

import { useState } from 'react'
import Image from 'next/image'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    // TODO: wire to real newsletter backend (e.g. Supabase newsletter table)
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    }, 800)
  }

  return (
    <section className="bg-card border-border flex w-full flex-col items-center border-y py-14 sm:py-16">
      <div className="flex w-full flex-col items-start gap-8 px-12 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-md">
          <h4 className="font-unbounded text-foreground text-xl font-bold sm:text-2xl">
            Join The Trials
          </h4>
          <p className="text-muted-foreground mt-2 text-sm">
            First access to new music, merch drops &amp; game updates. No spam.
          </p>
        </div>

        <div className="relative w-full max-w-md">
          {status === 'success' && (
            <div className="animate-stamp animate-stamp-glow border-primary bg-card pointer-events-none absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 border px-5 py-3">
              <Image
                src="/SVG/pad-emblem.svg"
                alt=""
                width={40}
                height={40}
                draggable={false}
                className="h-8 w-8 object-contain"
              />
              <p className="text-primary font-mono text-xs tracking-[0.2em] whitespace-nowrap uppercase">
                You&apos;re in
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-3 transition-opacity duration-300 sm:flex-row sm:items-center ${
              status === 'success' ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border-border text-foreground focus:border-primary placeholder:text-dim bg-card h-11 w-full flex-1 rounded-sm border px-4 text-sm transition-colors outline-none"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary h-11 cursor-pointer rounded-sm px-6 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {status === 'error' && (
            <p className="mt-3 text-xs text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
