'use client'
import { useState, useRef, useEffect, useSyncExternalStore } from 'react'

const GAME_VERSION = process.env.NEXT_PUBLIC_GAME_VERSION ?? 'v0' // auto-bumped from the pck hash at build time

export const Standalone = () => {
  const [showContent, setShowContent] = useState(false)

  return (
    <div className="relative flex h-screen w-full flex-col">
      {showContent && (
        <StandaloneContent onReady={() => setShowContent(true)} />
      )}
      <InstallPromptHint
        showContent={showContent}
        onShowContent={() => setShowContent(true)}
      />
      {!showContent && <LoadingOverlay />}
    </div>
  )
}

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#030014]">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-sm text-white">Preparing game...</p>
      </div>
    </div>
  )
}

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

interface InstallPromptHintProps {
  showContent: boolean
  onShowContent: () => void
}

const InstallPromptHint = ({
  showContent,
  onShowContent,
}: InstallPromptHintProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const isIOS = useIsIOS()
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    if (isIOS) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as any)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [isIOS])

  const handleInstall = async () => {
    setIsInstalling(true)

    if (deferredPrompt) {
      try {
        ;(deferredPrompt as any).prompt()
        const { outcome } = await (deferredPrompt as any).userChoice
        if (outcome !== 'accepted') {
          setIsInstalling(false)
          return
        }
      } catch {
        // continue anyway
      }
    }
    onShowContent()
  }

  const handleSkip = () => {
    onShowContent()
  }

  if (showContent) return null

  const btnStyle =
    'px-4 py-2 bg-white text-primary font-medium rounded-lg hover:bg-primary-50 transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]/95 p-4">
      <div className="max-w-sm items-center justify-center text-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-4 h-48 w-48 object-contain"
        />

        <p className="text-primary/70 mb-6 text-sm">
          {isIOS
            ? 'Tap Share → Add to Home Screen to install'
            : 'Install to play offline as a native app'}
        </p>
        {!isIOS && (
          <button onClick={handleInstall} className={btnStyle}>
            {isInstalling ? 'Installing...' : 'Install App'}
          </button>
        )}
        {isIOS && (
          <div className="text-primary/60 mt-4 text-xs">
            1. Tap the Share button in the browser&#39;s address bar
            <br />
            2. Scroll down and tap &ldquo;Add to Home Screen&ldquo;
          </div>
        )}

        <button
          onClick={handleSkip}
          className="text-primary mx-auto mt-4 block text-sm transition-colors hover:text-white"
        >
          Continue without installing
        </button>
      </div>
    </div>
  )
}

interface StandaloneContentProps {
  onReady?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StandaloneContent = ({ onReady }: StandaloneContentProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isIOS = useIsIOS()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingError, setRecordingError] = useState<string | null>(null)
  const [showRewardVideo, setShowRewardVideo] = useState(false)
  const [rewardVideoSrc, setRewardVideoSrc] = useState<string>('')
  const [hasWon, setHasWon] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Manual test hook: run `testRewardVideo()` in the console to show the reward video without winning
  useEffect(() => {
    ;(window as any).testRewardVideo = () => {
      console.log('[test] manually showing reward video')
      setHasWon(true)
      setShowRewardVideo(true)
      setRewardVideoSrc(`/reward-video?v=${Date.now()}`)
    }
    return () => {
      delete (window as any).testRewardVideo
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)

      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          fs ? 'fullscreen-enter' : 'fullscreen-exit',
          '*',
        )
      }
    }

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'claim-reward') {
        console.log('Claim reward received from game:', e.data)
        console.log(
          '[standalone] Switching to reward video. COEP:',
          self.crossOriginIsolated,
        )
        setHasWon(true)
        setShowRewardVideo(true)
        setRewardVideoSrc(`/reward-video?v=${Date.now()}`)
        return
      }

      if (e.data?.type === 'recording-status') {
        switch (e.data.status) {
          case 'started':
            setIsRecording(true)
            setRecordingTime(0)
            setRecordingError(null)
            break
          case 'stopped':
            setIsRecording(false)
            setRecordingTime(0)
            break
          case 'timeupdate':
            setRecordingTime(e.data.data)
            break
          case 'download': {
            const a = document.createElement('a')
            a.href = e.data.data
            a.download = `game-recording-${Date.now()}.webm`
            a.click()
            break
          }
          case 'error':
            setRecordingError(e.data.data)
            setIsRecording(false)
            setRecordingTime(0)
            break
          case 'status':
            if (!e.data.data?.supported) {
              setRecordingError('Canvas recording not supported')
            } else if (!e.data.data?.hasCaptureStream) {
              setRecordingError('Screen capture not available')
            } else {
              setRecordingError(null)
            }
            break
        }
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    window.addEventListener('message', handleMessage)

    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'recording-command', command: 'status' },
        '*',
      )
    }, 2000)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const toggleFullscreen = async () => {
    const container = containerRef.current

    if (isIOS && container) {
      console.log('iOS fullscreen toggle, current state:', isFullscreen)
      if (!isFullscreen) {
        container.style.setProperty('position', 'fixed')
        container.style.setProperty('top', '0')
        container.style.setProperty('left', '0')
        container.style.setProperty('width', '100vw')
        container.style.setProperty('height', '100vh')
        container.style.setProperty('zIndex', '2147483647')
        document.body.style.setProperty('overflow', 'hidden')
        setIsFullscreen(true)
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'fullscreen-enter' },
            '*',
          )
        }
      } else {
        container.style.removeProperty('position')
        container.style.removeProperty('top')
        container.style.removeProperty('left')
        container.style.removeProperty('width')
        container.style.removeProperty('height')
        container.style.removeProperty('zIndex')
        document.body.style.removeProperty('overflow')
        setIsFullscreen(false)
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'fullscreen-exit' },
            '*',
          )
        }
      }
      return
    }

    if (!document.fullscreenElement) {
      try {
        await container?.requestFullscreen()
      } catch (e) {
        console.error(e)
        try {
          await (container as any)?.webkitRequestFullscreen()
        } catch (error_) {
          console.error('Fullscreen failed:', error_)
        }
      }
    } else {
      await document.exitFullscreen()
    }
  }

  const toggleRecording = () => {
    if (!iframeRef.current?.contentWindow) return

    if (isRecording) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'recording-command', command: 'stop' },
        '*',
      )
    } else {
      iframeRef.current.contentWindow.postMessage(
        { type: 'recording-command', command: 'start' },
        '*',
      )
    }
  }

  return (
    <div className="relative mt-16 h-screen w-full">
      <div className="relative h-full w-full" ref={containerRef}>
        {showRewardVideo ? (
          <iframe
            title="ArkeA Reward"
            src={rewardVideoSrc}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            onLoad={() => console.log('[standalone] Reward iframe loaded')}
            onError={(e) => console.log('[standalone] Reward iframe error:', e)}
          />
        ) : (
          <iframe
            title="ArkeA - Trial Of The Elements"
            ref={iframeRef}
            src={`/game-content/index.html?v=${GAME_VERSION}`}
            className="h-full w-full"
            allow="fullscreen"
          />
        )}
        <button
          onClick={toggleFullscreen}
          className={`bg-primary hover:bg-primary-50 absolute top-2 left-2 z-10 rounded-lg p-2 text-white backdrop-blur-xs transition-colors duration-200 sm:top-4 sm:left-4 sm:p-3 ${
            showRewardVideo ? 'hidden' : ''
          }`}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? (
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}
        </button>
        <button
          onClick={toggleRecording}
          className={`absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg p-2 backdrop-blur-xs transition-colors duration-200 sm:top-4 sm:right-4 sm:gap-2 sm:p-3 ${
            isRecording
              ? 'animate-pulse bg-red-600/80 hover:bg-red-700'
              : 'bg-gray-600/80 hover:bg-gray-700'
          } text-white ${showRewardVideo ? 'hidden' : ''}`}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isRecording ? (
            <>
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              <span className="font-mono text-xs sm:text-sm">
                {Math.floor(recordingTime / 60)}:
                {String(recordingTime % 60).padStart(2, '0')}
              </span>
            </>
          ) : (
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="8" />
            </svg>
          )}
        </button>
        {hasWon && (
          <button
            onClick={() => {
              setShowRewardVideo((v) => {
                if (!v) setRewardVideoSrc(`/reward-video?v=${Date.now()}`)
                return !v
              })
            }}
            className="bg-primary absolute top-2 left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white backdrop-blur-xs transition-colors duration-200 sm:top-4"
          >
            {showRewardVideo ? 'Back to Game' : 'Watch Video'}
          </button>
        )}
        {recordingError && (
          <div className="absolute right-4 bottom-4 left-4 z-20 rounded-lg bg-red-600/90 px-4 py-2 text-sm text-white sm:right-4 sm:left-auto">
            {recordingError}
          </div>
        )}
      </div>
    </div>
  )
}
