import Image from 'next/image'

export const AboutContent = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="group border-primary/20 bg-card hover:border-primary/50 hover:shadow-primary/20 relative overflow-hidden rounded-xl border p-6 transition-all duration-500 hover:shadow-[0_0_30px_-5px] sm:p-8">
        <div className="bg-primary/5 pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl" />
        <div className="bg-primary/5 pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
          <div className="shrink-0">
            <div className="border-primary/30 relative h-32 w-32 overflow-hidden rounded-full border-2 sm:h-40 sm:w-40">
              <Image
                src="/logo.png"
                alt="ArkeA"
                fill
                sizes="160px"
                className="object-contain p-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
              ArkeA is a modern metal band from Tunisia, crafting a unique blend
              of heavy riffs, atmospheric soundscapes, and mythology-driven
              lyrics. We believe music is more than sound — it&apos;s a world to
              step into.
            </p>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Our debut EP,{' '}
              <span className="font-semibold text-white">
                &ldquo;Trial Of The Elements&rdquo;
              </span>
              , is accompanied by an original video game that expands the
              universe. Every element hides a trial. Every trial reveals a
              secret.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
