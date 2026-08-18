'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

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
    <motion.div
      variants={fadeInUp(0.4)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-primary/20 bg-card hover:border-primary/50 mx-auto mt-10 w-full rounded-xl border px-6 py-8 transition-all duration-500 sm:px-10"
    >
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="w-full text-left">
          <h4 className="text-lg font-bold text-white sm:text-xl">
            Join The Trials
          </h4>
          <p className="mt-2 text-sm text-gray-400">
            First access to new music, merch drops &amp; game updates. No spam.
          </p>

          {status === 'success' ? (
            <p className="text-primary mt-5 text-sm font-semibold">
              You&apos;re in — welcome to the ArkeA universe.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-primary/30 focus:border-primary h-11 w-full rounded-lg border bg-black/30 px-4 text-sm text-white transition-colors outline-none placeholder:text-gray-500 sm:max-w-xs"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="button-primary h-11 cursor-pointer rounded-lg px-6 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-xs text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        <div className="border-primary/30 hidden shrink-0 rounded-full border-2 p-2 md:block">
          <Image
            src="/SVG/pad-emblem.svg"
            alt="ArkeA"
            width={150}
            height={150}
            className="h-40 w-40 object-contain"
          />
        </div>
      </div>
    </motion.div>
  )
}
