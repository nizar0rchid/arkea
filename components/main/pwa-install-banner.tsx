'use client'

import { useState } from 'react'
import Link from 'next/link'

export const PWAInstallBanner = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-purple-500/30 bg-linear-to-t from-purple-900/90 to-purple-800/80 p-4 backdrop-blur-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-purple-700">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.84 12H17v8H7v-8H5.16L12 4.84z" />
              <path d="M10 14v-2h4v2h-4z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              Install ArkeA
            </span>
            <span className="text-xs text-purple-200">
              Play offline as a native app
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/standalone-game"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-50"
          >
            Install
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-2 text-purple-300 transition-colors hover:text-white"
            aria-label="Dismiss"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
