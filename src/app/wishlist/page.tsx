"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/components/store/WishlistProvider";
import { ButtonLink, Button } from "@/components/ui/Button";
import { getProductById } from "@/lib/catalog";

export default function WishlistPage() {
  const { ids, clear } = useWishlist();
  const list = ids.map((id) => getProductById(id)).filter(Boolean);

  if (!list.length) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[2rem] bg-white p-8 text-center ring-1 ring-zinc-200">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Wishlist</h1>
        <p className="text-sm text-zinc-600">No saved items yet.</p>
        <div className="flex justify-center">
          <ButtonLink href="/search">Browse products</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Wishlist</h1>
          <p className="text-sm text-zinc-600">{list.length} items</p>
        </div>
        <Button variant="ghost" onClick={clear}>
          Clear
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p!.id} product={p!} />
        ))}
      </div>
    </div>
  );
}

