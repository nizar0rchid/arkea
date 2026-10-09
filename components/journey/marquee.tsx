const PHRASES = [
  'Trial Of The Elements — Out Now',
  'Every Element Hides A Trial',
  'Every Trial Reveals A Secret',
  'ArkeA — Modern Metal From Tunisia',
]

const MarqueeRow = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden}
    className="flex shrink-0 items-center gap-8 pr-8"
  >
    {PHRASES.map((phrase) => (
      <span
        key={phrase}
        className="font-display text-foreground/60 text-sm tracking-[0.3em] whitespace-nowrap uppercase"
      >
        {phrase}
      </span>
    ))}
  </div>
)

export const Marquee = () => {
  return (
    <div
      aria-label="Trial Of The Elements announcements"
      className="border-border bg-background relative flex w-full overflow-hidden border-y py-3"
    >
      <div className="animate-marquee flex w-max items-center">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </div>
  )
}
