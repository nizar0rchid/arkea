import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

const TRACKS = [
  'Ignition',
  'Trial of Earth',
  'Trial of Water',
  'Trial of Fire',
  'Trial of Air',
  'The Awakening',
]

export const MusicContent = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="group border-primary/20 bg-card hover:border-primary/50 hover:shadow-primary/20 relative overflow-hidden rounded-xl border p-6 transition-all duration-500 hover:shadow-[0_0_30px_-5px] sm:p-8">
        <div className="bg-accent/5 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="group/art relative shrink-0">
            <div className="border-primary/30 relative h-44 w-44 overflow-hidden rounded-lg border sm:h-52 sm:w-52">
              <Image
                src="/emblm.png"
                alt="EP Artwork"
                fill
                sizes="208px"
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover/art:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/art:opacity-100">
              <div className="bg-primary/90 shadow-primary/30 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
                <FaPlay className="ml-1 h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h4 className="text-lg font-bold text-white sm:text-xl">
              Trial Of The Elements
            </h4>
            <p className="text-xs text-gray-400 sm:text-sm">EP — 2025</p>

            <div className="mt-2 flex flex-col gap-1.5">
              {TRACKS.map((track, i) => (
                <div
                  key={track}
                  className="hover:bg-primary/10 flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-gray-300 transition-colors hover:text-white"
                >
                  <span className="w-5 text-xs text-gray-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">{track}</span>
                  <span className="text-xs text-gray-600">—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
