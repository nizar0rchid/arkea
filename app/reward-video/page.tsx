const YOUTUBE_VIDEO_ID = 'VfpG6hdz-Tg'

export default function RewardVideo() {
  return (
    <main className="h-screen w-full">
      <iframe
        title="ArkeA Reward"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      />
    </main>
  )
}
