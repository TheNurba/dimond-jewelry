'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/format';

export default function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const router = useRouter();
  const params = useSearchParams();
  if (totalPages <= 1) return null;

  const goto = (p: number) => {
    const next = new URLSearchParams(params.toString());
    if (p === 1) next.delete('page');
    else next.set('page', String(p));
    router.push(`/?${next.toString()}`, { scroll: false });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button onClick={() => goto(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-full border border-ink/10 hover:border-ink/30 disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goto(p)}
          className={cn(
            'min-w-[36px] h-9 px-3 rounded-full text-sm border transition',
            p === page ? 'bg-ink text-white border-ink' : 'border-ink/10 hover:border-ink/30'
          )}
        >
          {p}
        </button>
      ))}
      <button onClick={() => goto(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-full border border-ink/10 hover:border-ink/30 disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
