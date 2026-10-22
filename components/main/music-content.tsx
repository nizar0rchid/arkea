import Image from 'next/image'

const TRACKS = [
  { title: 'Earthbound', duration: '3:52', released: true },
  { title: 'To be Announced', duration: '4:01', released: false },
  { title: 'Coming Soon', duration: '3:47', released: false },
  { title: 'Scheduled for release', duration: '3:58', released: false },
  { title: 'Stay tuned', duration: '4:15', released: false },
]

const YOUTUBE_VIDEO_ID = 'Xedjf2ryS4s'

export const MusicContent = () => {
  return (
    <div className="grid gap-y-3 lg:grid-cols-2 lg:gap-x-8">
      <span className="eyebrow text-primary border-primary/40 bg-primary/10 w-fit border px-3 py-1.5 lg:col-start-1 lg:row-start-1">
        Latest Release
      </span>

      <div className="border-border bg-card relative aspect-video w-full overflow-hidden border lg:col-start-1 lg:row-start-2">
        <iframe
          title="ArkeA — Earthbound"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          credentialless="true"
          allowFullScreen
        />
      </div>

      <div className="border-border bg-card mt-3 flex w-full flex-col px-6 py-5 sm:px-8 lg:col-start-2 lg:row-start-2 lg:mt-0">
        <div className="border-border flex items-center gap-4 border-b pb-4">
          <Image
            src="/SVG/art/front.png"
            alt="EP artwork"
            width={64}
            height={64}
            draggable={false}
            className="h-16 w-16 object-contain"
          />
          <div className="flex flex-col gap-1">
            <h4 className="font-unbounded text-foreground text-lg font-bold sm:text-xl">
              Trials of the Elements
            </h4>
            <p className="text-dim font-mono text-xs tracking-[0.15em] uppercase">
              EP — 2026
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          {TRACKS.map((track, i) => (
            <div
              key={track.title}
              className={`flex items-center gap-4 rounded-sm px-2 py-2.5 text-sm ${
                track.released ? 'bg-primary/10' : ''
              }`}
            >
              <span className="flex w-6 items-center justify-center">
                <span
                  className={`font-mono text-xs ${
                    track.released ? 'text-primary' : 'text-dim'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <span
                className={`flex-1 font-medium ${
                  track.released
                    ? 'text-primary'
                    : 'text-foreground/50 blur-[4px] select-none'
                }`}
              >
                {track.title}
              </span>
              {track.released && (
                <span className="flex items-center gap-1.5">
                  <span className="bg-primary flex items-end gap-[2px] rounded-sm px-1 py-[5px]">
                    <span className="bg-primary-foreground [height:6px] w-[2px] animate-pulse rounded-[1px] align-bottom" />
                    <span className="bg-primary-foreground [height:10px] w-[2px] animate-pulse rounded-[1px] align-bottom [animation-delay:120ms]" />
                    <span className="bg-primary-foreground [height:4px] w-[2px] animate-pulse rounded-[1px] [animation-delay:240ms]" />
                  </span>
                </span>
              )}
              <span
                className={`text-dim w-12 text-right font-mono text-xs ${
                  track.released ? '' : 'blur-[1px] select-none'
                }`}
              >
                {track.released ? track.duration : '--:--'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
