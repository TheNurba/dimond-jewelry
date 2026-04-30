'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import CartItemRow from '@/components/cart/CartItemRow';

export default function CartPage() {
  const { items, total, count, hydrated, clear } = useCart();

  if (!hydrated) {
    return <div className="container-x py-16 text-center text-ink/50">Жүктөлүүдө...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-stone flex items-center justify-center text-ink/40">
          <ShoppingBag size={28} />
        </div>
        <h1 className="mt-5 font-serif text-3xl">Корзинаңыз бош</h1>
        <p className="mt-2 text-ink/60">Каталогдон сизге жаккан буюмду тандаңыз.</p>
        <Link href="/" className="btn-primary mt-7">Каталогго өтүү</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-serif text-3xl md:text-4xl">Корзина</h1>
      <p className="text-sm text-ink/50 mt-1">{count} буюм</p>

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          {items.map((it) => <CartItemRow key={it.productId} item={it} />)}
          <button onClick={clear} className="mt-5 text-sm text-ink/50 hover:text-ink underline-offset-4 hover:underline">
            Корзинаны тазалоо
          </button>
        </div>

        <aside className="h-fit lg:sticky lg:top-24 rounded-2xl bg-white border border-ink/5 p-6 shadow-soft">
          <h2 className="font-serif text-xl">Жыйынтык</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-ink/60">Товарлар ({count})</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Жеткирүү</span><span className="text-gold-dark">Бекер</span></div>
            <div className="border-t border-ink/5 pt-3 flex justify-between items-baseline">
              <span className="text-ink/60">Жалпы</span>
              <span className="font-serif text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary w-full mt-6">Буйрутма берүү</Link>
          <Link href="/" className="btn-ghost w-full mt-2">Каталогго кайтуу</Link>
        </aside>
      </div>
    </div>
  );
}
