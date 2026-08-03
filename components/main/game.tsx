'use client'
import { useState, useRef, useEffect } from 'react'

export const Game = () => {
  return (
    <div className="cente relative flex h-full w-full flex-col py-20">
      <GameContent />
    </div>
  )
}

const GameContent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingError, setRecordingError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

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
            } else if (e.data.data?.hasCaptureStream) {
              setRecordingError(null)
            } else {
              setRecordingError('Screen capture not available')
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
      if (!isFullscreen) {
        container.style.setProperty('position', 'fixed')
        container.style.setProperty('top', '0')
        container.style.setProperty('left', '0')
        container.style.setProperty('width', '100vw')
        container.style.setProperty('height', '100vh')
        container.style.setProperty('zIndex', '2147483647')
        document.body.style.overflow = 'hidden'
        setIsFullscreen(true)
      } else {
        container.style.removeProperty('position')
        container.style.removeProperty('top')
        container.style.removeProperty('left')
        container.style.removeProperty('width')
        container.style.removeProperty('height')
        container.style.removeProperty('zIndex')
        document.body.style.removeProperty('overflow')
        setIsFullscreen(false)
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
    <div className="relative flex w-full justify-center px-4">
      <div className="relative w-full max-w-5xl">
        <div className="relative w-full" ref={containerRef}>
          <iframe
            title="ArkeA - Trial Of The Elements"
            ref={iframeRef}
            src="/game-content/index.html"
            className="relative z-0 aspect-video w-full"
            style={{ height: 'auto' }}
            allow="fullscreen"
          />
          <button
            onClick={toggleFullscreen}
            className="bg-primary hover:bg-primary-50 absolute top-2 left-2 z-10 rounded-lg p-2 text-white backdrop-blur-xs transition-colors duration-200 sm:top-4 sm:left-4 sm:p-3"
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
            } text-white`}
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
          {recordingError && (
            <div className="absolute right-4 bottom-4 left-4 z-20 rounded-lg bg-red-600/90 px-4 py-2 text-sm text-white sm:right-4 sm:left-auto">
              {recordingError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
