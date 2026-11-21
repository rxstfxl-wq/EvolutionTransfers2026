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
        className={`inline-flex flex-col items-center text-center select-none whitespace-nowrap shrink-0 ${className}`}
      >
        <span className="font-serif text-[17px] sm:text-2xl font-normal tracking-[0.12em] text-[#C6A66B] leading-none uppercase">
          Evolution
        </span>
        <span className="mt-1 sm:mt-1.5 flex items-center gap-2 w-full">
          <span className="h-px flex-1 bg-[#C6A66B]/60" aria-hidden="true" />
          <span className="font-sans text-[7.5px] sm:text-[9px] font-medium tracking-[0.28em] sm:tracking-[0.34em] text-[#FAF9F6] leading-none uppercase">
            Transfers
          </span>
          <span className="h-px flex-1 bg-[#C6A66B]/60" aria-hidden="true" />
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
      <div className="inline-flex flex-col items-center">
        <span className="font-serif text-3xl sm:text-4xl font-normal tracking-[0.12em] text-[#C6A66B] leading-none uppercase">
          Evolution
        </span>
        <div className="mt-2 flex items-center gap-3 w-full">
          <span className="h-px flex-1 bg-[#C6A66B]/60" aria-hidden="true" />
          <span className="font-sans text-[11px] font-medium tracking-[0.38em] text-[#FAF9F6] leading-none uppercase">
            Transfers
          </span>
          <span className="h-px flex-1 bg-[#C6A66B]/60" aria-hidden="true" />
        </div>
      </div>
      {showTagline && (
        <span className="mt-2.5 font-serif italic text-sm tracking-wide text-[#D8D0C2]">
          Your Journey, Evolved.
        </span>
      )}
    </div>
  );
}
