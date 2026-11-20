interface BrandWordmarkProps {
  variant?: 'header' | 'stacked';
  showTagline?: boolean;
  className?: string;
}

export function BrandWordmark({
  variant = 'header',
  showTagline = false,
  className = '',
}: BrandWordmarkProps) {
  if (variant === 'header') {
    return (
      <span
        className={`inline-flex items-baseline gap-2 font-serif tracking-[0.14em] text-[#C6A66B] uppercase whitespace-nowrap shrink-0 ${className}`}
      >
        <span className="text-lg sm:text-xl font-medium">Evolution</span>
        <span className="text-[0.68rem] tracking-[0.26em] text-[#FAF9F6]/85 font-sans font-medium">
          Transfers
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
      <span className="font-serif text-3xl sm:text-4xl font-normal tracking-[0.12em] text-[#C6A66B] leading-none uppercase">
        Evolution
      </span>
      <div className="mt-2 flex items-center gap-3 w-full justify-center">
        <span className="h-px w-8 bg-[#C6A66B]/60" aria-hidden="true" />
        <span className="font-sans text-[11px] font-medium tracking-[0.38em] text-[#FAF9F6] uppercase">
          Transfers
        </span>
        <span className="h-px w-8 bg-[#C6A66B]/60" aria-hidden="true" />
      </div>
      {showTagline && (
        <span className="mt-2.5 font-serif italic text-sm tracking-wide text-[#D8D0C2]">
          Your Journey, Evolved.
        </span>
      )}
    </div>
  );
}
