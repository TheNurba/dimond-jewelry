'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get('q') ?? '');

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value.trim()) next.set('q', value.trim());
      else next.delete('q');
      next.delete('page');
      const qs = next.toString();
      router.push(qs ? `/?${qs}` : '/', { scroll: false });
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full sm:max-w-sm">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Товар издөө..."
        className="input pl-10 pr-10"
      />
      {value && (
        <button onClick={() => setValue('')} aria-label="Тазалоо" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-ink/5">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
