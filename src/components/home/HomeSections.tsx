'use client'

import Image from "next/image";
import Link from "next/link";
// import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import React from "react";
import { getCategories, getCategoryBySlug } from "@/api/category";
import { getProducts } from "@/api/porducts";

export function HomeSections() {

  const [categories, setCategory] = React.useState<any[]>([])
  const [product, setProduct] = React.useState<any[]>([])

  const newArrivals = product.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)

  const bestSellers = [...product]
    .filter((p) => p.inStock)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  React.useEffect(() => {
    const getCategory = async() => {
      const categoryRes = await getCategories()
      const productRes = await getProducts()
      setCategory(categoryRes.data || [])
      setProduct(productRes.data || [])
    }
    getCategory()
  }, [])

  console.log(newArrivals)

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Shop by category
            </h2>
            <p className="text-sm text-zinc-600">Find your favorites in seconds.</p>
          </div>
          <Link href="/search" className="text-sm font-semibold text-[rgb(var(--brand))]">
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories?.map((c : any) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] bg-zinc-50">
                {c.imageUrl ? (
                  <Image
                    src={c.imageUrl}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-zinc-900">{c.name}</div>
                <div className="text-xs text-zinc-500">Explore</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            Best sellers
          </h2>
          <p className="text-sm text-zinc-600">Top picks loved by customers.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            New arrivals
          </h2>
          <p className="text-sm text-zinc-600">Freshly added to the store.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

