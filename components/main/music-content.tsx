import Image from 'next/image'

const TRACKS = [
  { title: 'Ignition', duration: '3:12', playing: true },
  { title: 'Trial of Earth', duration: '4:01' },
  { title: 'Trial of Water', duration: '3:47' },
  { title: 'Trial of Fire', duration: '3:58' },
  { title: 'Trial of Air', duration: '4:15' },
  { title: 'The Awakening', duration: '5:02' },
]

const YOUTUBE_VIDEO_ID = 'FxTKvlNaj0s'

export const MusicContent = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="border-border bg-card relative aspect-video w-full overflow-hidden border">
        <iframe
          title="ArkeA — Trial Of The Elements"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          credentialless="true"
          allowFullScreen
        />
      </div>

      <div className="border-border bg-card flex w-full flex-col px-6 py-5 sm:px-8">
        <div className="border-border flex items-center gap-4 border-b pb-4">
          <div className="border-border bg-background relative flex h-16 w-16 shrink-0 items-center justify-center border">
            <Image
              src="/SVG/pad-emblem.svg"
              alt="EP artwork"
              width={64}
              height={64}
              draggable={false}
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-unbounded text-foreground text-lg font-bold sm:text-xl">
              Trial Of The Elements
            </h4>
            <p className="text-dim font-mono text-xs tracking-[0.15em] uppercase">
              EP — 2025
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col">
          {TRACKS.map((track, i) => (
            <div
              key={track.title}
              className={`group flex items-center gap-4 rounded-sm px-2 py-2.5 text-sm transition-colors ${
                track.playing ? 'bg-primary/10' : 'hover:bg-primary/5'
              }`}
            >
              <span
                className={`w-6 font-mono text-xs ${
                  track.playing ? 'text-primary' : 'text-dim'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`flex-1 font-medium ${
                  track.playing ? 'text-primary' : 'text-foreground/90'
                }`}
              >
                {track.title}
              </span>
              {track.playing && (
                <span className="flex items-center gap-1.5">
                  <span className="bg-primary flex items-end gap-[2px] rounded-sm px-1 py-[5px]">
                    <span className="bg-primary-foreground [height:6px] w-[2px] animate-pulse rounded-[1px] align-bottom" />
                    <span className="bg-primary-foreground [height:10px] w-[2px] animate-pulse rounded-[1px] align-bottom [animation-delay:120ms]" />
                    <span className="bg-primary-foreground [height:4px] w-[2px] animate-pulse rounded-[1px] [animation-delay:240ms]" />
                  </span>
                </span>
              )}
              <span className="text-dim w-12 text-right font-mono text-xs">
                {track.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
