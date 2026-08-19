import Image from 'next/image'

export const AboutContent = () => {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div className="text-muted-foreground flex flex-col gap-5 text-sm leading-relaxed sm:text-base">
        <p>
          <span className="text-foreground font-bold">
            Forged in the underground,
          </span>{' '}
          ArkeA is a modern metal band from Tunisia, crafting a unique blend of
          heavy riffs, atmospheric soundscapes, and mythology-driven lyrics.
        </p>
        <p>
          <span className="text-foreground font-bold">
            A world to step into.
          </span>{' '}
          We believe music is more than sound — it&apos;s a gateway to a
          universe where myth and metal collide.
        </p>
        <p>
          <span className="text-foreground font-bold">
            Trial Of The Elements.
          </span>{' '}
          Our debut EP is accompanied by an original video game that expands the
          universe. Every element hides a trial. Every trial reveals a secret.
        </p>
      </div>

      <div className="from-card border-border to-background relative aspect-[1/1.1] w-full max-w-[320px] overflow-hidden border bg-gradient-to-br lg:justify-self-end">
        <Image
          src="/SVG/pad-emblem.svg"
          alt="ArkeA sigil"
          width={600}
          height={600}
          draggable={false}
          className="absolute top-1/2 left-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90"
        />
        <span className="text-dim absolute top-3 left-4 font-mono text-[10px] tracking-[0.25em] uppercase">
          ArkeA
        </span>
        <span className="text-dim absolute right-4 bottom-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          EST. 2025
        </span>
      </div>
    </div>
  )
}
