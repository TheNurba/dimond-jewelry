'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/format';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 md:gap-4">
      <div className="flex flex-col gap-2.5">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square rounded-xl overflow-hidden bg-stone border-2 transition',
              i === active ? 'border-ink' : 'border-transparent hover:border-ink/20'
            )}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone">
        <Image src={images[active]} alt={name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover animate-fade-in" priority />
      </div>
    </div>
  );
}
