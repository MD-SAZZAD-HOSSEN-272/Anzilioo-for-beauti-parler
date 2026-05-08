import { ProductCard } from "@/components/product/ProductCard";
import { products, searchProducts } from "@/lib/catalog";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchProducts(query) : products;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Search</h1>
        <p className="text-sm text-zinc-600">
          {query ? (
            <>
              Showing results for <span className="font-semibold">“{query}”</span>
            </>
          ) : (
            "All products"
          )}
        </p>
      </div>

      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
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

