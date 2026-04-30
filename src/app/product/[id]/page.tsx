import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartBlock from '@/components/product/AddToCartBlock';
import ProductCard from '@/components/catalog/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.id },
    include: { category: true },
  });
  if (!product) return notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container-x py-8 md:py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink mb-6">
        <ChevronLeft size={16} /> Каталогго
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:py-4">
          {product.category && (
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">{product.category.name}</div>
          )}
          <h1 className="mt-2 font-serif text-3xl md:text-4xl leading-tight">{product.name}</h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-base text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>}
          </div>

          <p className="mt-6 text-ink/70 leading-relaxed">{product.description}</p>

          <dl className="mt-7 grid grid-cols-2 gap-3 text-sm border-t border-ink/5 pt-6">
            {product.metal && (
              <div>
                <dt className="text-ink/40 text-xs uppercase tracking-wide">Металл</dt>
                <dd className="mt-1 text-ink">{product.metal}</dd>
              </div>
            )}
            {product.stone && (
              <div>
                <dt className="text-ink/40 text-xs uppercase tracking-wide">Таш</dt>
                <dd className="mt-1 text-ink">{product.stone}</dd>
              </div>
            )}
            {product.weight && (
              <div>
                <dt className="text-ink/40 text-xs uppercase tracking-wide">Салмагы</dt>
                <dd className="mt-1 text-ink">{product.weight}</dd>
              </div>
            )}
            <div>
              <dt className="text-ink/40 text-xs uppercase tracking-wide">Кампада</dt>
              <dd className="mt-1 text-ink">{product.stock > 0 ? `${product.stock} даана бар` : 'Жок'}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <AddToCartBlock product={product as any} />
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-ink/60">
            <li>✓ Бекер жеткирүү Бишкек ичинде</li>
            <li>✓ 14 күн ичинде кайтаруу</li>
            <li>✓ Сертификат менен</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl mb-6">Окшош буюмдар</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
