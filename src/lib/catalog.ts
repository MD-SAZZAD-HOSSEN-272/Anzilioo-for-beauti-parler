
import { bunnyUrl } from "@/lib/bunny";
import { bdt } from "@/lib/money";
import type { Category, Product } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "makeup",
    name: "Makeup",
    imageUrl: 'https://i.pinimg.com/736x/a4/f1/e6/a4f1e6e0c31ffb60ef1f64d8ee3bfe75.jpg'
  },
  {
    slug: "skincare",
    name: "Skincare",
    imageUrl: 'https://i.pinimg.com/736x/2a/ef/be/2aefbebd57aec94482ff23e4b26fd2f7.jpg'
  },
  {
    slug: "haircare",
    name: "Haircare",
    imageUrl: 'https://i.pinimg.com/736x/8f/ca/f1/8fcaf18217a4a66b50751d0219ad0db2.jpg'
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    imageUrl: 'https://i.pinimg.com/736x/ca/a2/2e/caa22e3cbd28c1cfdbc1656a898c30eb.jpg'
  },
  {
    slug: "body",
    name: "Body Care",
    imageUrl: 'https://i.pinimg.com/736x/d5/85/3f/d5853f7af5b62d9bb80364a08a5cc979.jpg'
  }
];

export const products: Product[] = [
  {
    id: "p_rose_glow_serum",
    slug: "rose-glow-vitamin-c-serum",
    name: "Rose Glow Vitamin C Serum (30ml)",
    brand: "Anzilioo Lab",
    categorySlug: "skincare",
    shortDescription: "Brightening serum for everyday glow.",
    description:
      "A lightweight Vitamin C serum formulated to help brighten dull skin, improve the look of spots, and support a healthy glow. Use after cleansing and before moisturizer.",
    price: bdt(1190),
    compareAtPrice: bdt(1490),
    rating: 4.6,
    reviewCount: 218,
    inStock: true,
    images: [
      'https://i.pinimg.com/1200x/fa/0f/1d/fa0f1dfad130e18cef27011ba17f716a.jpg',
      'https://i.pinimg.com/1200x/fb/9d/2c/fb9d2cac8fdb138c49942647b5318d96.jpg',
      'https://i.pinimg.com/736x/c7/e1/84/c7e184ee4047571f12e41397099d2033.jpg'
    ],
    tags: ["vitamin-c", "brightening", "serum"]
  },
  {
    id: "p_hydra_moisturizer",
    slug: "hydra-cream-moisturizer",
    name: "Hydra Cream Moisturizer (50g)",
    brand: "Anzilioo Lab",
    categorySlug: "skincare",
    shortDescription: "Daily moisture with a soft finish.",
    description:
      "Rich but non-greasy moisturizer that supports a smooth, hydrated look. Suitable for normal to dry skin.",
    price: bdt(990),
    rating: 4.4,
    reviewCount: 146,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/bf/d4/39/bfd4393cf166151ba937a04d2728a95d.jpg', 'https://i.pinimg.com/736x/3e/b1/4d/3eb14d4f913585674942e759da53dbfe.jpg'],
    tags: ["moisturizer", "hydration"]
  },
  {
    id: "p_sunscreen_spf50",
    slug: "daily-sunscreen-spf-50-pa",
    name: "Daily Sunscreen SPF 50 PA+++ (50ml)",
    brand: "SunShield",
    categorySlug: "skincare",
    shortDescription: "No white cast, everyday protection.",
    description:
      "Broad spectrum SPF 50 PA+++ sunscreen with a comfortable finish. Reapply every 2-3 hours when outdoors.",
    price: bdt(1250),
    rating: 4.7,
    reviewCount: 520,
    inStock: true,
    images: ['https://i.pinimg.com/736x/f0/73/98/f07398d940239968075f4303f682de00.jpg', 'https://i.pinimg.com/1200x/92/bd/34/92bd3458510271c27e6fb65cecf5904d.jpg'],
    tags: ["sunscreen", "spf50", "daily"]
  },
  {
    id: "p_matte_lipstick",
    slug: "velvet-matte-lipstick-cherry",
    name: "Velvet Matte Lipstick - Cherry",
    brand: "VelvetPop",
    categorySlug: "makeup",
    shortDescription: "Comfort matte, bold color payoff.",
    description:
      "High-pigment matte lipstick with a soft, comfortable feel. Perfect for everyday and special occasions.",
    price: bdt(650),
    compareAtPrice: bdt(790),
    rating: 4.3,
    reviewCount: 301,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/eb/59/3a/eb593ab9016559a7a1de9b921f0688e0.jpg', 'https://i.pinimg.com/736x/8d/32/51/8d32517dd5fff45d403716258deec5e0.jpg'],
    tags: ["lipstick", "matte", "makeup"]
  },
  {
    id: "p_brow_pencil",
    slug: "micro-brow-pencil-dark-brown",
    name: "Micro Brow Pencil - Dark Brown",
    brand: "BrowPro",
    categorySlug: "makeup",
    shortDescription: "Precise, natural-looking brows.",
    description:
      "Ultra-fine brow pencil for hair-like strokes. Includes spoolie for blending.",
    price: bdt(420),
    rating: 4.2,
    reviewCount: 188,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/eb/79/87/eb79871e4e6e163d386dacc979f53dee.jpg', 'https://i.pinimg.com/1200x/91/e4/1b/91e41bcf8f7abd0492ba591afddd0a54.jpg'],
    tags: ["brows", "pencil"]
  },
  {
    id: "p_cushion_foundation",
    slug: "dewy-cushion-foundation-natural",
    name: "Dewy Cushion Foundation - Natural",
    brand: "GlowBase",
    categorySlug: "makeup",
    shortDescription: "Light coverage, fresh dewy finish.",
    description:
      "Buildable lightweight cushion foundation that evens the look of skin. Great for daily wear.",
    price: bdt(1650),
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/f1/4e/81/f14e81feccac4979e9ed2ec8b525835e.jpg', 'https://i.pinimg.com/736x/8e/ff/08/8eff083d4c87effb0eaf380a85de043f.jpg'],
    tags: ["foundation", "cushion", "dewy"]
  },
  {
    id: "p_hair_oil",
    slug: "argan-hair-oil-smooth-shine",
    name: "Argan Hair Oil - Smooth & Shine (100ml)",
    brand: "HairCare+",
    categorySlug: "haircare",
    shortDescription: "Tames frizz and adds shine.",
    description:
      "Nourishing hair oil to smooth frizz and enhance shine. Apply 1-2 pumps to damp or dry hair.",
    price: bdt(780),
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
    images: ['https://i.pinimg.com/736x/2d/6f/97/2d6f9700a7251c32295b4022be1153b8.jpg', 'https://i.pinimg.com/736x/f7/8c/a9/f78ca9223e298836e9ce5dd297e1907b.jpg'],
    tags: ["hair-oil", "anti-frizz"]
  },
  {
    id: "p_shampoo",
    slug: "keratin-repair-shampoo",
    name: "Keratin Repair Shampoo (300ml)",
    brand: "HairCare+",
    categorySlug: "haircare",
    shortDescription: "For dry and damaged hair.",
    description:
      "Gentle keratin shampoo designed to help the look of damaged hair feel softer and smoother over time.",
    price: bdt(690),
    rating: 4.1,
    reviewCount: 77,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/07/7d/1f/077d1f3af6fca591e19d4529184a5984.jpg', 'https://i.pinimg.com/736x/20/81/d2/2081d2b64d759fe34bd53b991afd2003.jpg'],
    tags: ["shampoo", "repair"]
  },
  {
    id: "p_perfume_mist",
    slug: "vanilla-blossom-body-mist",
    name: "Vanilla Blossom Body Mist (200ml)",
    brand: "ScentStory",
    categorySlug: "fragrance",
    shortDescription: "Sweet vanilla with a soft floral touch.",
    description:
      "Everyday body mist with a cozy vanilla note. Layer with lotion for longer wear.",
    price: bdt(520),
    rating: 4.0,
    reviewCount: 65,
    inStock: true,
    images: ['https://i.pinimg.com/736x/c9/9c/96/c99c968b44bf12ff008a7292ba86045d.jpg', 'https://i.pinimg.com/736x/10/68/55/106855febc46c04e05e6d7a9cb0a69fb.jpg'],
    tags: ["mist", "vanilla", "fragrance"]
  },
  {
    id: "p_perfume_edp",
    slug: "midnight-rose-edp-50ml",
    name: "Midnight Rose EDP (50ml)",
    brand: "ScentStory",
    categorySlug: "fragrance",
    shortDescription: "Elegant rose with warm musk.",
    description:
      "A richer Eau de Parfum with rose-forward notes balanced by soft musk and amber.",
    price: bdt(2450),
    rating: 4.6,
    reviewCount: 41,
    inStock: false,
    images: ['https://i.pinimg.com/736x/d5/55/91/d555914820c3228fc10f50443ea03ee9.jpg', 'https://i.pinimg.com/1200x/b7/8c/b1/b78cb1b64b48b8144fe660176cdf28b7.jpg'],
    tags: ["edp", "rose"]
  },
  {
    id: "p_body_lotion",
    slug: "cocoa-shea-body-lotion",
    name: "Cocoa Shea Body Lotion (400ml)",
    brand: "BodyBlend",
    categorySlug: "body",
    shortDescription: "Deep moisture for soft skin.",
    description:
      "Moisturizing body lotion with cocoa and shea for a soft, smooth feel. Great after shower.",
    price: bdt(850),
    rating: 4.5,
    reviewCount: 134,
    inStock: true,
    images: ['https://i.pinimg.com/736x/48/28/9e/48289e456c981fd69a92d2fec8d1e9f5.jpg', 'https://i.pinimg.com/736x/24/79/6e/24796e4a87345277a3349a6733e9bbd3.jpg'],
    tags: ["lotion", "body-care"]
  },
  {
    id: "p_face_wash",
    slug: "gentle-foaming-face-wash",
    name: "Gentle Foaming Face Wash (120ml)",
    brand: "Anzilioo Lab",
    categorySlug: "skincare",
    shortDescription: "Soft foam cleanser for daily use.",
    description:
      "A gentle daily cleanser that helps remove makeup and impurities without feeling tight or dry.",
    price: bdt(540),
    rating: 4.3,
    reviewCount: 189,
    inStock: true,
    images: ['https://i.pinimg.com/1200x/b5/d3/4a/b5d34ab341a994f6e92bdc95ed0565ec.jpg', 'https://i.pinimg.com/1200x/a0/aa/61/a0aa61a4e41496671ea8c927df9c82f2.jpg'],
    tags: ["cleanser", "face-wash"]
  }
];

export function getCategoryBySlug(slug: string) {
  
  return categories.find((c) => c.slug === slug) || null;
  
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id) || null;
}

export function productsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const hay = `${p.name} ${p.brand ?? ""} ${p.tags.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

