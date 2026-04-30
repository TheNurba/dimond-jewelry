'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { CategoryData as Category } from '@/lib/data';
import { cn } from '@/lib/format';

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get('category') ?? '';

  const setCategory = useCallback((slug: string) => {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set('category', slug);
    else next.delete('category');
    next.delete('page');
    router.push(`/?${next.toString()}`, { scroll: false });
  }, [params, router]);

  return (
    <div className="flex gap-2 overflow-x-auto scroll-fade pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      <button onClick={() => setCategory('')} className={cn('chip', !active && 'chip-active')}>Бардыгы</button>
      {categories.map((c) => (
        <button key={c.id} onClick={() => setCategory(c.slug)} className={cn('chip whitespace-nowrap', active === c.slug && 'chip-active')}>
          {c.name}
        </button>
      ))}
    </div>
  );
}
