"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { useSearchParams } from "next/navigation";

import { getProducts, searchProducts } from "@/api/porducts";
import { ProductCard } from "@/components/product/ProductCard";
import CosmeticLoader from "@/components/loader/CosmeticLoader";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim();

  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let res;

        if (!query) {
          res = await getProducts();
        } else {
          res = await searchProducts(query);
        }

        setProducts(res.data || []); // adjust if backend uses res.data.data
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

 if (loading) {
  return (
    <div className="py-24">
      <CosmeticLoader />
    </div>
  );
}

  const results = products;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>

      <p className="text-sm text-zinc-600">
        {query ? `Showing results for "${query}"` : "All products"}
      </p>

      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] bg-white p-8 text-center text-sm text-zinc-600 ring-1 ring-zinc-200">
          No products found.
        </div>
      )}
    </div>
  );
}