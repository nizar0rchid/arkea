import Image from 'next/image'

export const UnderConstructionContent = ({ bg }: { bg: string | null }) => (
  <div className="relative z-10 flex flex-col items-center gap-8 p-8 select-none">
    <div className="relative">
      <Image
        src="/SVG/arkealogo.svg"
        alt="Arkea Logo"
        unoptimized
        width={350}
        height={123}
        draggable={false}
      />
      {bg && (
        <div
          className="absolute inset-0 opacity-40 shadow-lg contrast-[10] grayscale select-none"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'url(/SVG/arkealogo.svg)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: 'url(/SVG/arkealogo.svg)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        />
      )}
    </div>
    <Image
      src="/SVG/pad-emblem.svg"
      alt="Emblem"
      width={350}
      height={350}
      unoptimized
      loading="eager"
      draggable={false}
    />
    <Image
      src="/SVG/underconstruction.svg"
      alt="Under Construction"
      width={700}
      height={63}
      unoptimized
      draggable={false}
    />
  </div>
)
