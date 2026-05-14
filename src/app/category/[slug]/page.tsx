"use client";

import { notFound } from "next/navigation";
import { getCategoryBySlug, productsByCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const list = productsByCategory(slug);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {category.name}
        </h1>

        <p className="text-sm text-zinc-600">
          {list.length} products
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}