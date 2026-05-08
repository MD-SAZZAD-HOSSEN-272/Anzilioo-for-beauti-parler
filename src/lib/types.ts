export type MoneyBDT = {
  currency: "BDT";
  amount: number;
};

export type Category = {
  slug: string;
  name: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  price: MoneyBDT;
  compareAtPrice?: MoneyBDT;
  rating: number; // 0..5
  reviewCount: number;
  inStock: boolean;
  images: string[];
  tags: string[];
};

export type CartItem = {
  productId: string;
  qty: number;
};

