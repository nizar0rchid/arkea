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
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6 sm:grid-cols-3">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="group border-primary/20 bg-card hover:border-primary/50 hover:shadow-primary/20 relative overflow-hidden rounded-xl border transition-all duration-500 hover:shadow-[0_0_25px_-5px]"
          >
            <div className="from-background to-primary/10 aspect-[3/4] overflow-hidden bg-gradient-to-br">
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <span className="text-primary text-xs font-semibold">
                  {item.price}
                </span>
              </div>
              <p className="text-xs text-gray-400">{item.desc}</p>
              <span className="border-primary/30 text-primary mt-2 inline-block self-start rounded-full border px-3 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
