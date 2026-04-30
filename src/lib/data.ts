import rawData from '../../data/products.json';

export type CategoryData = {
  id: string;
  slug: string;
  name: string;
  order: number;
};

export type ProductData = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  images: string[];
  metal: string | null;
  stone: string | null;
  weight: string | null;
  stock: number;
  isNew: boolean;
  categoryId: string;
  createdAt: string;
  category: CategoryData;
};

export const categories: CategoryData[] = rawData.categories.map((c) => ({
  ...c,
  id: c.slug,
}));

const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const products: ProductData[] = rawData.products.map((p, i) => ({
  id: p.slug,
  slug: p.slug,
  name: p.name,
  description: p.description,
  price: p.price,
  oldPrice: (p as any).oldPrice ?? null,
  images: p.images,
  metal: (p as any).metal ?? null,
  stone: (p as any).stone ?? null,
  weight: (p as any).weight ?? null,
  stock: 10,
  isNew: !!(p as any).isNew,
  categoryId: p.category,
  createdAt: new Date(2025, 0, i + 1).toISOString(),
  category: catBySlug[p.category],
}));

export function getProducts({
  categorySlug,
  q,
  sort = 'new',
  page = 1,
  pageSize = 12,
}: {
  categorySlug?: string;
  q?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  let list = [...products];

  if (categorySlug) list = list.filter((p) => p.categoryId === categorySlug);
  if (q) {
    const lq = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(lq) ||
        p.description.toLowerCase().includes(lq)
    );
  }

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = list.slice((page - 1) * pageSize, page * pageSize);

  return { items, total, totalPages };
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getRelated(product: ProductData, limit = 4) {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}
