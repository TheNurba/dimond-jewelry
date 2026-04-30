'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="card animate-fade-in">
      <div className="relative aspect-square bg-stone overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="badge">Жаңы</span>}
          {product.oldPrice && <span className="badge-sale">−{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>}
        </div>
        <button
          onClick={onAdd}
          aria-label="Корзинага кошуу"
          className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white shadow-soft opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition hover:bg-gold hover:text-ink"
        >
          <ShoppingBag size={16} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-lg">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
        {product.metal && <p className="mt-1 text-xs text-ink/50 line-clamp-1">{product.metal}</p>}
      </div>
    </Link>
  );
}
