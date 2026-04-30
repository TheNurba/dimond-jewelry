export type Category = {
  id: string;
  slug: string;
  name: string;
  order: number;
};

export type Product = {
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
  createdAt: Date | string;
  category?: Category;
};
