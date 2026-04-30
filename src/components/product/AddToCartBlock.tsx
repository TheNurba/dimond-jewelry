'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import type { ProductData as Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function AddToCartBlock({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−" className="p-3 hover:bg-ink/5 rounded-l-full">
          <Minus size={14} />
        </button>
        <span className="min-w-[36px] text-center text-sm font-medium">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} aria-label="+" className="p-3 hover:bg-ink/5 rounded-r-full">
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={() =>
          add(
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.images[0],
            },
            qty
          )
        }
        className="btn-primary flex-1"
      >
        <ShoppingBag size={16} />
        Корзинага кошуу
      </button>
    </div>
  );
}
