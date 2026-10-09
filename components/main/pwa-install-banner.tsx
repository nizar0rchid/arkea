'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const DISMISS_KEY = 'arkea-install-dismissed'
const DISMISS_EVENT = 'arkea-install-dismiss'

function detectIOS() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(globalThis as any).MSStream
  )
}

const useIsIOS = () =>
  useSyncExternalStore(
    () => () => {},
    () => detectIOS(),
    () => false,
  )

const isInstalled = () => {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari exposes installed state on navigator instead
    (window.navigator as any).standalone === true
  )
}

const subscribeInstalled = (onChange: () => void) => {
  const query = window.matchMedia('(display-mode: standalone)')

  window.addEventListener('appinstalled', onChange)
  query.addEventListener('change', onChange)

  return () => {
    window.removeEventListener('appinstalled', onChange)
    query.removeEventListener('change', onChange)
  }
}

// Start hidden on the server so nothing is baked into the HTML for users who
// already dismissed the banner, then reveal it on the client if appropriate.
const useInstalled = () =>
  useSyncExternalStore(subscribeInstalled, isInstalled, () => true)

const isDismissed = () => {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

// `storage` only fires cross-tab, so dismiss() dispatches DISMISS_EVENT itself
const subscribeDismissed = (onChange: () => void) => {
  window.addEventListener(DISMISS_EVENT, onChange)
  window.addEventListener('storage', onChange)

  return () => {
    window.removeEventListener(DISMISS_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

const useDismissed = () =>
  useSyncExternalStore(subscribeDismissed, isDismissed, () => true)

export const PWAInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isInstalling, setIsInstalling] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const isIOS = useIsIOS()
  const dismissed = useDismissed()
  const installed = useInstalled()

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
    }
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // storage unavailable, dismissal just will not persist
    }
    window.dispatchEvent(new Event(DISMISS_EVENT))
  }

  const install = async () => {
    // No native prompt available (dev, Firefox, already-declined). Fall back to
    // telling the user where the browser keeps its own install action.
    if (!deferredPrompt) {
      setShowFallback(true)
      return
    }

    setIsInstalling(true)

    try {
      ;(deferredPrompt as any).prompt()
      const { outcome } = await (deferredPrompt as any).userChoice

      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      } else {
        setShowFallback(true)
      }
    } catch {
      setShowFallback(true)
    }

    setIsInstalling(false)
  }

  if (dismissed || installed) return null

  return (
    <div className="bg-background/90 border-primary/30 fixed right-0 bottom-0 left-0 z-40 border-t p-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary/20 border-primary/40 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
            <svg
              className="text-primary h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.84 12H17v8H7v-8H5.16L12 4.84z" />
              <path d="M10 14v-2h4v2h-4z" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-white">
              Install ArkeA
            </span>
            <span className="text-muted-foreground text-xs">
              {showFallback
                ? 'Use your browser menu, then Install app or Add to Home screen'
                : isIOS
                  ? 'Share → Add to Home Screen to play offline'
                  : 'Play offline as a native app'}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!isIOS && (
            <button
              onClick={install}
              disabled={isInstalling}
              className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60"
            >
              {isInstalling ? 'Installing...' : 'Install'}
            </button>
          )}
          <button
            onClick={dismiss}
            className="text-muted-foreground p-2 transition-colors hover:text-white"
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
