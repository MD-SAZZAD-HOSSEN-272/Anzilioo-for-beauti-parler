'use client'

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import React from "react";
import { getProducts } from "@/api/porducts";
import HomeCategorySlider from "./HomeCategorySlider";
import ProductSkeleton from "../loader/ProductKeleteon";

export function HomeSections() {

  const [loader, setloader] = React.useState<Boolean>(true)
  const [product, setProduct] = React.useState<any[]>([])

  const newArrivals = product.sort((a, b) => b.createdAt - a.createdAt).slice(0, 6)


  const bestSellers = [...product]
    .filter((p) => p.inStock)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  React.useEffect(() => {
    setloader(true)
    const getCategory = async() => {
      const productRes = await getProducts()
      setProduct(productRes.data || [])
      setloader(false)
    }
    getCategory()
  }, [])


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

        <HomeCategorySlider />

        {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories?.map((c : any) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] bg-zinc-50">
                {c.image ? (
                  <Image
                    src={c.image}
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
        </div> */}



      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            Best sellers
          </h2>
          <p className="text-sm text-zinc-600">Top picks loved by customers.</p>
        </div>
        {
          loader ? <ProductSkeleton num = {8} grid={4} /> : <>
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
          </>
        }
       
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            New arrivals
          </h2>
          <p className="text-sm text-zinc-600">Freshly added to the store.</p>
        </div>
        {
          loader ? <ProductSkeleton num = {6} grid={3} /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        }
        
      </section>
    </div>
  );
}

