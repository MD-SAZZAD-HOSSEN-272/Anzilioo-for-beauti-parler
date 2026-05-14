import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { bdt, formatMoney } from "@/lib/money";
import { cn } from "@/lib/cn";

export function ProductCard({ product }: { product: Product }) {
  const primary = product.images[0];
  const off =
    product.compareAtPrice && product.compareAtPrice.amount > product.price.amount
      ? Math.round(
          ((product.compareAtPrice.amount - product.price.amount) /
            product.compareAtPrice.amount) *
            100
        )
      : null;

     

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-zinc-50">
        {primary ? (
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        ) : null}

        <div className="absolute left-3 top-3 flex gap-2">
          {off ? (
            <span className="rounded-full bg-[rgb(var(--brand))] px-3 py-1 text-xs font-semibold text-white">
              -{off}%
            </span>
          ) : null}
          {!product.inStock ? (
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs font-medium text-zinc-500">{product.brand ?? " "}</div>
        <div className="mt-1 line-clamp-2 text-sm font-semibold text-zinc-900">
          {product.name}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="size-4 fill-current" />
            <span className="text-xs font-semibold text-zinc-800">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-zinc-500">({product.reviewCount})</span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <div className="text-base font-bold text-zinc-900">
            {formatMoney(bdt(Number(product.price)))}
          </div>
          {product.compareAtPrice ? (
            <div className={cn("text-sm text-zinc-400 line-through")}>
              {formatMoney(bdt(Number(product.compareAtPrice)))}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

