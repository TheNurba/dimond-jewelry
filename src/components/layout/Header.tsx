'use client';

import Link from 'next/link';
import { ShoppingBag, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { count, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur border-b border-ink/5">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-1.5 select-none">
          <span className="font-serif text-2xl tracking-wide">Dimond</span>
          <span className="text-gold text-xs uppercase tracking-[0.2em]">jewelry</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/70">
          <Link href="/" className="hover:text-ink transition">Каталог</Link>
          <Link href="/?category=rings" className="hover:text-ink transition">Шакектер</Link>
          <Link href="/?category=earrings" className="hover:text-ink transition">Сөйкөлөр</Link>
          <Link href="/?category=sets" className="hover:text-ink transition">Топтомдор</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/?focus=search" aria-label="Издөө" className="p-2 rounded-full hover:bg-ink/5 transition md:hidden">
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            aria-label="Корзина"
            className="relative inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm hover:border-ink/30 transition"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Корзина</span>
            {hydrated && count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-gold text-ink text-[11px] font-semibold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
