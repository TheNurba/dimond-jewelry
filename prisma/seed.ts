import { PrismaClient } from '@prisma/client';
import data from '../data/products.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed жүрүүдө...');

  for (const c of data.categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, order: c.order },
      create: { slug: c.slug, name: c.name, order: c.order },
    });
  }

  const cats = await prisma.category.findMany();
  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  for (const p of data.products as any[]) {
    const categoryId = bySlug[p.category];
    if (!categoryId) {
      console.warn(`⚠️  Категория табылган жок: ${p.category}`);
      continue;
    }
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        images: p.images,
        metal: p.metal ?? null,
        stone: p.stone ?? null,
        weight: p.weight ?? null,
        isNew: !!p.isNew,
        categoryId,
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        images: p.images,
        metal: p.metal ?? null,
        stone: p.stone ?? null,
        weight: p.weight ?? null,
        isNew: !!p.isNew,
        categoryId,
      },
    });
  }

  const cnt = await prisma.product.count();
  console.log(`✅ Бүттү. Товар: ${cnt}, категория: ${cats.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
