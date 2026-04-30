import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/catalog/ProductCard';
import CategoryFilter from '@/components/catalog/CategoryFilter';
import SearchBar from '@/components/catalog/SearchBar';
import SortSelect from '@/components/catalog/SortSelect';
import Pagination from '@/components/catalog/Pagination';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 12;

type SP = { category?: string; q?: string; sort?: string; page?: string };

export default async function CatalogPage({ searchParams }: { searchParams: SP }) {
  const { category, q, sort = 'new', page: pageStr } = searchParams;
  const page = Math.max(1, Number(pageStr) || 1);

  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } });

  const where: any = {};
  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) where.categoryId = cat.id;
  }
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }

  const orderBy: any =
    sort === 'price-asc' ? { price: 'asc' } :
    sort === 'price-desc' ? { price: 'desc' } :
    { createdAt: 'desc' };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream border-b border-ink/5">
        <div className="container-x py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-slide-up">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold font-semibold">Dimond Jewelry</span>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">
              Бриллианттын<br />түбөлүк жарыгы
            </h1>
            <p className="mt-5 text-ink/60 max-w-md">
              Премиум ювелирдик буюмдар. Ар бир таш — өзгөчө окуя, ар бир дизайн — кылым ашуу классика.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#catalog" className="btn-primary">Каталогду карап чыгуу</a>
              <a href="/?category=rings#catalog" className="btn-ghost">Шакектер</a>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card bg-stone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/dimond-hero/900/1200" alt="Dimond" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div className="text-xs uppercase tracking-[0.25em] text-gold-light">Жаңы коллекция</div>
              <div className="font-serif text-2xl mt-1">Eternal Light</div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="container-x py-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl">Каталог</h2>
              <p className="text-sm text-ink/50 mt-1">{total} буюм табылды</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <SearchBar />
              <SortSelect />
            </div>
          </div>
          <CategoryFilter categories={categories} />
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <div className="font-serif text-2xl">Эч нерсе табылган жок</div>
            <p className="mt-2 text-sm text-ink/50">Башка категория же издөө сөзүн колдонуп көрүңүз.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} />
      </section>
    </div>
  );
}
