import Link from 'next/link';
import { Check } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="container-x py-24 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center animate-fade-in">
        <Check size={40} strokeWidth={2.5} />
      </div>
      <h1 className="mt-7 font-serif text-4xl">Рахмат сизге!</h1>
      <p className="mt-3 text-ink/60 max-w-md mx-auto">
        Буйрутмаңыз ийгиликтүү кабыл алынды. Менеджерибиз жакын арада сиз менен байланышат.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/" className="btn-primary">Каталогго</Link>
        <Link href="/cart" className="btn-ghost">Корзина</Link>
      </div>
    </div>
  );
}
