"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/components/store/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getProductById } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { Input } from "@/components/ui/Input";

export default function CartPage() {
  const { items, subtotal, remove, setQty, clear } = useCart();

  const lines = items
    .map((i) => ({ item: i, product: getProductById(i.productId) }))
    .filter((x) => Boolean(x.product));

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[2rem] bg-white p-8 text-center ring-1 ring-zinc-200">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Your cart</h1>
        <p className="text-sm text-zinc-600">Your cart is empty. Start shopping!</p>
        <div className="flex justify-center">
          <ButtonLink href="/search">Browse products</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Your cart</h1>
            <p className="text-sm text-zinc-600">{lines.length} items</p>
          </div>
          <Button variant="ghost" onClick={clear}>
            Clear cart
          </Button>
        </div>

        <div className="space-y-3">
          {lines.map(({ item, product }) => {
            if (!product) return null;
            return (
              <div
                key={product.id}
                className="flex gap-4 rounded-[2rem] bg-white p-4 ring-1 ring-zinc-200"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200"
                >
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </Link>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-semibold text-zinc-900 hover:underline"
                      >
                        {product.name}
                      </Link>
                      <div className="text-sm text-zinc-500">{product.brand}</div>
                    </div>
                    <div className="text-right font-semibold text-zinc-900">
                      {formatMoney(product.price)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600">Qty</span>
                      <Input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => setQty(product.id, Number(e.target.value))}
                        className="h-10 w-24 rounded-full"
                      />
                    </div>

                    <button
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
                      onClick={() => remove(product.id)}
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="h-fit space-y-4 rounded-[2rem] bg-[rgb(var(--surface))] p-6 ring-1 ring-zinc-200">
        <div className="space-y-1">
          <div className="text-lg font-semibold text-zinc-900">Order summary</div>
          <div className="text-sm text-zinc-600">Prices shown in BDT.</div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Subtotal</span>
          <span className="font-semibold text-zinc-900">
            {formatMoney({ currency: "BDT", amount: subtotal })}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Delivery</span>
          <span className="font-semibold text-zinc-900">Calculated at checkout</span>
        </div>
        <div className="border-t border-zinc-200 pt-4">
          <ButtonLink href="/checkout" className="w-full">
            Proceed to checkout
          </ButtonLink>
          <div className="mt-2 text-xs text-zinc-500">
            Bangladesh-only payment: SSLCommerz (demo).
          </div>
        </div>
      </aside>
    </div>
  );
}

