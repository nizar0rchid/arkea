'use client'

import { useState } from 'react'
import Image from 'next/image'

export const AboutContent = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
      <div className="text-primary flex flex-col gap-5 text-sm leading-relaxed sm:text-[15px]">
        <p>
          <span className="text-foreground font-bold">
            ArkeA started with a simple idea:
          </span>{' '}
          to turn years of writing music at home into something real.
        </p>
        <div className="relative">
          <div
            id="about-more"
            className={`overflow-hidden lg:overflow-visible ${
              isExpanded
                ? 'max-h-none'
                : 'max-h-44 [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)] lg:max-h-none lg:[mask-image:none] lg:[-webkit-mask-image:none]'
            }`}
          >
            <div className="flex flex-col gap-5">
              <p>
                <span className="text-foreground font-bold">In 2024,</span> a
                conversation between Tunisian musician{' '}
                <span className="text-foreground font-bold">Aziz</span> and
                drummer{' '}
                <span className="text-foreground font-bold">Youssef</span>{' '}
                became the starting point of a new project. What began with a
                collection of compositions gradually grew into a collective,
                bringing together musicians separated by borders but connected
                by a shared desire to create. With{' '}
                <span className="text-foreground font-bold">Ahmed</span>{' '}
                bringing electronic textures into the picture,{' '}
                <span className="text-foreground font-bold">Nizar</span> joining
                on bass, and{' '}
                <span className="text-foreground font-bold">Pablo</span>{' '}
                completing the lineup on vocals in September 2025, ArkeA took
                shape across Tunisia, Germany, and Canada.{' '}
                <span className="text-foreground font-semibold">
                  Different backgrounds, different environments, one shared body
                  of work.
                </span>
              </p>
              <p>
                <span className="text-foreground font-bold">
                  The name comes from Archaea:
                </span>{' '}
                ancient microorganisms known for their ability to adapt to a
                wide range of environments. It felt fitting. ArkeA was never
                meant to be confined to one place, one genre, or one way of
                thinking.
              </p>
              <p>
                <span className="text-foreground font-bold">Musically,</span>{' '}
                ArkeA brings together the weight of metal, the restless pulse of
                electronic music, intricate rhythms, and choruses built to stay
                with you. Heavy guitars that coexist with synthetic atmospheres
                and melodic passages, drawing from a wide range of influences
                without trying to fit into a single category.
              </p>
              <p>
                <span className="text-foreground font-bold">
                  ArkeA is an independent band built across borders,
                </span>{' '}
                shaped by different perspectives, and driven by the simple need
                to make music. No two elements are quite alike, but sometimes
                they find a way to work together.
              </p>
            </div>
          </div>

          {!isExpanded && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_80%)] [backdrop-filter:blur(3px)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_80%)] lg:hidden"
            />
          )}

          <div
            className={
              isExpanded
                ? 'mt-5 flex justify-center lg:hidden'
                : 'absolute inset-x-0 bottom-3 flex justify-center lg:hidden'
            }
          >
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              aria-expanded={isExpanded}
              aria-controls="about-more"
              className="text-foreground border-border bg-background/80 hover:border-primary hover:text-primary rounded-sm border px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase backdrop-blur-sm transition"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>
        </div>

        <div className="border-primary/60 bg-primary/10 mt-2 border-l-2 py-3 pl-4">
          <p className="font-display text-foreground text-base tracking-[0.02em] uppercase sm:text-lg">
            Different origins. One evolving organism.
          </p>
          <p className="text-primary mt-1.5 font-mono text-xs tracking-[0.2em]">
            🜃🜂 BECOME THE COLONY 🜄🜁
          </p>
        </div>
      </div>

      <div className="from-card border-border to-background relative mx-auto aspect-[1/1.1] w-full max-w-[320px] overflow-hidden border bg-gradient-to-br lg:mx-0 lg:self-center">
        <Image
          src="/SVG/pad-emblem.svg"
          alt="ArkeA sigil"
          width={600}
          height={600}
          draggable={false}
          className="absolute top-1/2 left-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90"
        />
        <span className="text-dim absolute right-4 bottom-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          EST. 2024
        </span>
      </div>
    </div>
  )
}
