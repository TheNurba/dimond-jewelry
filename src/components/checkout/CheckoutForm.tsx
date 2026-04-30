'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

type Form = {
  name: string;
  phone: string;
  city: string;
  address: string;
  payment: 'cash' | 'card' | 'courier';
  note: string;
};

const initial: Form = { name: '', phone: '', city: 'Бишкек', address: '', payment: 'cash', note: '' };

export default function CheckoutForm() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = 'Атыңызды жазыңыз';
    if (!/^[+\d\s()-]{9,}$/.test(form.phone)) e.phone = 'Телефон номерин туура жазыңыз';
    if (form.city.trim().length < 2) e.city = 'Шаарды көрсөтүңүз';
    if (form.address.trim().length < 4) e.address = 'Толук дарек жазыңыз';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const order = {
      customer: form,
      items: items.map((i) => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price })),
      total,
      createdAt: new Date().toISOString(),
    };
    console.log('🛒 Жаңы буйрутма:', order);
    await new Promise((r) => setTimeout(r, 700));
    toast.success('Буйрутма кабыл алынды!');
    clear();
    router.push('/checkout/success');
  };

  const inputCls = (k: keyof Form) =>
    `input ${errors[k] ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`;

  return (
    <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_380px] gap-10">
      <div className="space-y-6">
        <fieldset className="rounded-2xl bg-white border border-ink/5 p-6 shadow-soft">
          <legend className="font-serif text-lg px-2">Байланыш</legend>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-xs text-ink/50">Аты-жөнү</label>
              <input className={inputCls('name')} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Айбек Асанов" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs text-ink/50">Телефон</label>
              <input className={inputCls('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+996 700 000 000" />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl bg-white border border-ink/5 p-6 shadow-soft">
          <legend className="font-serif text-lg px-2">Жеткирүү</legend>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-xs text-ink/50">Шаар</label>
              <input className={inputCls('city')} value={form.city} onChange={(e) => set('city', e.target.value)} />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-ink/50">Дарек</label>
              <input className={inputCls('address')} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Көчө, үй, батир" />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-ink/50">Кошумча эскертүү</label>
              <textarea className="input rounded-2xl" rows={3} value={form.note} onChange={(e) => set('note', e.target.value)} placeholder="Курьерге эскертүү (мисалы: үйдөн чакыруу)" />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-2xl bg-white border border-ink/5 p-6 shadow-soft">
          <legend className="font-serif text-lg px-2">Төлөм</legend>
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            {([
              { v: 'cash', label: 'Накталай', sub: 'Алганда' },
              { v: 'card', label: 'Карта', sub: 'Online' },
              { v: 'courier', label: 'Курьерге', sub: 'POS-терминал' },
            ] as const).map((o) => (
              <label key={o.v} className={`cursor-pointer rounded-2xl border-2 p-4 transition ${form.payment === o.v ? 'border-ink bg-ink/[0.03]' : 'border-ink/10 hover:border-ink/30'}`}>
                <input type="radio" name="payment" value={o.v} checked={form.payment === o.v} onChange={() => set('payment', o.v)} className="sr-only" />
                <div className="text-sm font-medium">{o.label}</div>
                <div className="text-xs text-ink/50 mt-0.5">{o.sub}</div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit lg:sticky lg:top-24 rounded-2xl bg-white border border-ink/5 p-6 shadow-soft">
        <h2 className="font-serif text-xl">Буйрутма</h2>
        <ul className="mt-4 divide-y divide-ink/5">
          {items.map((i) => (
            <li key={i.productId} className="py-3 flex justify-between gap-3 text-sm">
              <span className="line-clamp-1">{i.name} <span className="text-ink/40">× {i.qty}</span></span>
              <span className="shrink-0">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-ink/5 mt-3 pt-4 flex justify-between items-baseline">
          <span className="text-ink/60 text-sm">Жалпы</span>
          <span className="font-serif text-2xl">{formatPrice(total)}</span>
        </div>
        <button type="submit" disabled={submitting || items.length === 0} className="btn-primary w-full mt-5">
          {submitting ? 'Жөнөтүлүүдө...' : 'Буйрутманы тастыктоо'}
        </button>
        <p className="text-xs text-ink/40 mt-3 text-center">Тастыктоо менен сиз шарттарга макул болосуз</p>
      </aside>
    </form>
  );
}
