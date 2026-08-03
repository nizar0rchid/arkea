import type { HTMLAttributes } from 'react'

const YOUTUBE_VIDEO_ID = 'FxTKvlNaj0s'

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    credentialless?: string | boolean
  }
}

export default function RewardVideo() {
  return (
    <main className="h-screen w-full">
      <iframe
        title="ArkeA Reward"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?&autoplay=1`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        credentialless="true"
        allowFullScreen
      />
    </main>
  )
}
