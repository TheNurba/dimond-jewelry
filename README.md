# Dimond — Премиум ювелир интернет-дүкөн

Next.js 14 + TypeScript + Tailwind CSS менен жасалган ювелир дүкөнүнүн MVP'си.

## Технологиялар

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — кастом дизайн токендери (ink, gold, cream)
- **React Context + LocalStorage** — корзина
- **Static JSON** — товарлар базасы (demo режим, DB жок)
- **react-hot-toast** — toast билдирүүлөр
- **Lucide React** — иконкалар

## Барактар

| Барак | URL | Сүрөттөмө |
|-------|-----|-----------|
| Каталог | `/` | Hero, категория filter, издөө, сорттоо, пагинация |
| Товар | `/product/[slug]` | Галерея, мүнөздөмөлөр, корзинага кошуу |
| Корзина | `/cart` | Qty +/−, өчүрүү, жыйынтык |
| Checkout | `/checkout` | Форма (аты, телефон, дарек, төлөм), валидация |
| Ийгилик | `/checkout/success` | Буйрутма кабыл алынды |

## Каталог

- 30 товар, 6 категория: Шакектер, Сөйкөлөр, Кулондор, Билериктер, Чынжырлар, Топтомдор
- Сүзгү категория боюнча
- Издөө (debounce 300мс)
- Сорттоо: жаңы / баа ↑ / баа ↓
- Пагинация: 12 товар / бет

## Долбоор структурасы

```
dimond/
├── data/
│   └── products.json          # 30 товар, 6 категория (статик маалымат)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Каталог барагы
│   │   ├── product/[id]/      # Товар барагы
│   │   ├── cart/              # Корзина
│   │   └── checkout/          # Checkout + success
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── catalog/           # ProductCard, CategoryFilter, SearchBar, SortSelect, Pagination
│   │   ├── product/           # ProductGallery, AddToCartBlock
│   │   ├── cart/              # CartItemRow
│   │   └── checkout/          # CheckoutForm
│   ├── context/
│   │   └── CartContext.tsx    # Корзина state + LocalStorage sync
│   └── lib/
│       ├── data.ts            # JSON'дан товарларды окуу, сүзүү, сорттоо
│       └── format.ts          # formatPrice(), cn()
└── public/
```

## Иштетүү (локалдуу)

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Railway деплой

1. GitHub'дан `dimond-jewelry` репосун туташтыруу
2. Variables'ка эч нерсе кошуунун кереги жок (DB жок, demo режим)
3. Build Command: `next build` (автоматтык)
4. Start Command: `npm start`

## GitHub

https://github.com/TheNurba/dimond-jewelry

## Дизайн токендери

| Токен | Маани | Колдонуу |
|-------|-------|----------|
| `ink` | `#0A0A0A` | Негизги текст, баскычтар |
| `gold` | `#C9A961` | Акцент, badge, баалар |
| `cream` | `#FAF8F3` | Фон |
| `stone` | `#F5F5F5` | Карточка фону |

## Шрифттер

- **Playfair Display** — баш аттар (`font-serif`)
- **Inter** — текст (`font-sans`)

## Кийинки этаптар (MVP'ден кийин)

- [ ] PostgreSQL (Neon.tech же Railway Postgres) туташтыруу
- [ ] Буйрутмаларды DB'ге сактоо (Order модели)
- [ ] Админ панель (товар кошуу/өзгөртүү)
- [ ] Аутентификация (NextAuth)
- [ ] Реалдуу төлөм системасы
- [ ] SEO оптимизация
