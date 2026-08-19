import Image from 'next/image'

const ITEMS = [
  {
    title: 'Logo Shirt',
    image: '/home/merch/logoshirt.webp',
    desc: 'Black oversized tee with embroidered logo',
    price: '35€',
  },
  {
    title: 'Elemental Short',
    image: '/home/merch/elemtalshort.webp',
    desc: 'Purple scoop-neck with foil print',
    price: '40€',
  },
  {
    title: 'Hoodie',
    image: '/home/merch/hoodie.webp',
    desc: 'White crew with game-art back print',
    price: '38€',
  },
]

export const MerchContent = () => {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3 md:gap-8">
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className="border-border bg-card group hover:border-primary/50 flex flex-col border transition-colors duration-300"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            <span className="text-primary border-primary/30 bg-background/70 absolute top-3 left-3 border px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase backdrop-blur-sm">
              Soon
            </span>

            <Image
              src="/SVG/pad-emblem.svg"
              alt=""
              width={120}
              height={120}
              draggable={false}
              className="pointer-events-none absolute right-3 bottom-3 h-auto w-12 opacity-25"
            />
          </div>

          <div className="border-border flex flex-col gap-2 border-t p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-unbounded text-foreground text-sm font-bold">
                {item.title}
              </h4>
              <span className="text-primary font-mono text-sm">
                {item.price}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
