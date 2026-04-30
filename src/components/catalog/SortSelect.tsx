'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const OPTIONS = [
  { value: 'new', label: 'Жаңылар' },
  { value: 'price-asc', label: 'Баа: арзан → кымбат' },
  { value: 'price-desc', label: 'Баа: кымбат → арзан' },
];

export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const value = params.get('sort') ?? 'new';

  const onChange = (v: string) => {
    const next = new URLSearchParams(params.toString());
    if (v && v !== 'new') next.set('sort', v);
    else next.delete('sort');
    router.push(`/?${next.toString()}`, { scroll: false });
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-ink/15 bg-white px-4 py-2.5 pr-9 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
