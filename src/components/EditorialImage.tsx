import { useState } from 'react';
import { Compass } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function EditorialImage({
  src,
  alt,
  fallbackTitle = 'Evolution Transfers',
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#202020] via-[#090909] to-[#1a1610] text-[#FAF9F6] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-7 h-7 text-[#C6A66B] mb-2.5 stroke-[1.5]" aria-hidden="true" />
        <span className="font-serif text-lg tracking-wide text-[#FAF9F6]">
          {fallbackTitle}
        </span>
        <span className="mt-1 text-xs text-[#D8D0C2]/75 tracking-wider uppercase">
          Cape Town
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#202020] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
