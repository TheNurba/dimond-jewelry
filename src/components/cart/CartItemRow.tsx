'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart, type CartItem } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

export default function CartItemRow({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-ink/5">
      <Link href={`/product/${item.slug}`} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone shrink-0">
        <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
      </Link>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex justify-between gap-3">
          <Link href={`/product/${item.slug}`} className="text-sm font-medium leading-snug line-clamp-2 hover:underline">
            {item.name}
          </Link>
          <button onClick={() => remove(item.productId)} aria-label="Өчүрүү" className="p-1.5 -m-1.5 rounded-full hover:bg-ink/5 text-ink/40 hover:text-ink h-fit">
            <X size={16} />
          </button>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
            <button onClick={() => setQty(item.productId, item.qty - 1)} aria-label="−" className="p-2 hover:bg-ink/5 rounded-l-full">
              <Minus size={12} />
            </button>
            <span className="min-w-[28px] text-center text-sm">{item.qty}</span>
            <button onClick={() => setQty(item.productId, item.qty + 1)} aria-label="+" className="p-2 hover:bg-ink/5 rounded-r-full">
              <Plus size={12} />
            </button>
          </div>
          <div className="font-serif text-base">{formatPrice(item.price * item.qty)}</div>
        </div>
      </div>
    </div>
  );
}
