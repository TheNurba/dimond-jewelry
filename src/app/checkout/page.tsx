'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const { items, hydrated } = useCart();

  if (!hydrated) {
    return <div className="container-x py-16 text-center text-ink/50">Жүктөлүүдө...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-3xl">Корзина бош</h1>
        <p className="mt-2 text-ink/60">Буйрутма берүү үчүн адегенде товар тандаңыз.</p>
        <Link href="/" className="btn-primary mt-6">Каталогго</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink mb-6">
        <ChevronLeft size={16} /> Корзинага
      </Link>
      <h1 className="font-serif text-3xl md:text-4xl mb-8">Буйрутма берүү</h1>
      <CheckoutForm />
    </div>
  );
}
