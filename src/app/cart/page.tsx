'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

import { useCart } from '@/components/store/CartProvider'
import { Button, ButtonLink } from '@/components/ui/Button'
import { bdt, formatMoney } from '@/lib/money'
import CosmeticLoader from '@/components/loader/CosmeticLoader'

import { useCartProducts } from '@/hooks/useCartProducts'
import QtyStepper from '@/components/cart/QtyStepper'

export default function CartPage() {
  const { items, remove, setQty, clear, subtotal } = useCart()

  const { lines, loading } = useCartProducts(items)

  // console.log(lines, 'form cart')

  if (loading) {
    return (
      <div className="py-36">
        <CosmeticLoader />
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-420px)] ">
      {/* Empty */}
      {!lines.length && (
        <div className="flex min-h-[calc(100vh-420px)] items-center justify-center px-4">
  <div className="w-full max-w-2xl space-y-4 rounded-3xl bg-white p-10 text-center ring-1 ring-zinc-200">
    <h1 className="text-2xl font-semibold">Your cart</h1>
    <p className="text-sm text-zinc-600">
      Your cart is empty
    </p>
    <ButtonLink href="/search">Browse products</ButtonLink>
  </div>
</div>
      )}

      {/* Content */}
      {lines.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-semibold">
                  Your cart
                </h1>
                <p className="text-sm text-zinc-600">
                  {lines.length} items
                </p>
              </div>

              <Button variant="ghost" onClick={clear}>
                Clear cart
              </Button>
            </div>

            {lines.map(({ item, product }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-3xl bg-white p-4 ring-1 ring-zinc-200"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative size-24 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={product.images?.[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                    loading="eager"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-semibold">
                        {product.name}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        {product.brand}
                      </p>
                    </div>

                    <div className="font-semibold">
                      {formatMoney(bdt(product.price))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
    
    {/* QTY (only needed width) */}
    <div className="w-fit">
      <QtyStepper
        value={item.qty}
        onChange={(v) => setQty(product.id, v)}
      />
    </div>

    {/* TOTAL PRICE */}
    <div className="text-sm font-semibold text-pink-600">
      Total: {formatMoney(bdt(product.price * item.qty))}
    </div>
  </div>

                  <button
                    onClick={() => remove(product.id)}
                    className="text-sm text-zinc-500 cursor-pointer hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <aside className="h-fit space-y-4 rounded-3xl bg-white p-6 ring-1 ring-zinc-200">
            <h2 className="text-lg font-semibold">
              Order summary
            </h2>

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatMoney({ currency: 'BDT', amount: subtotal })}
              </span>
            </div>

            <ButtonLink href="/checkout" className="w-full">
              Checkout
            </ButtonLink>

            <p className="text-xs text-zinc-500 text-center">
              SSLCommerz supported (BD)
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}