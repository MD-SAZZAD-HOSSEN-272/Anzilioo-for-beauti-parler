'use client'

import React from 'react'
import { AddToCart } from '@/components/store/AddToCart'
import { ToggleWishlist } from '@/components/store/ToggleWishlist'
import { Minus, Plus } from 'lucide-react'

export default function ProductActions({
  product,
}: {
  product: {
    id: string
    name: string
    price: number
    image: string
    inStock: boolean
  }
}) {
  const [qty, setQty] = React.useState(1)

  const increase = () => setQty((p) => p + 1)
  const decrease = () => setQty((p) => (p > 1 ? p - 1 : 1))

  const totalPrice = product.price * qty

  return (
    <div className="space-y-6 .bg-zinc-100 { background: #f4f4f5; }">
      {/* Quantity + Price Row */}
      <div className="flex items-center justify-between">
        
        {/* Quantity */}
        <div>
          <span className="text-sm font-medium text-zinc-500">
            Quantity
          </span>

          <div className="flex items-center gap-2 bg-zinc-100 px-2 py-1 rounded-full mt-3">
            <button
              onClick={decrease}
              className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full hover:bg-white transition"
            >
              <Minus size={16} />
            </button>

            <span className="w-8 text-center font-medium text-sm">
              {qty}
            </span>

            <button
              onClick={increase}
              className="w-9 h-9 flex cursor-pointer items-center justify-center rounded-full hover:bg-white transition"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="text-sm font-semibold text-zinc-700">
          {totalPrice.toFixed(2)} BDT
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <AddToCart
          productId={product.id}
          quantity={qty}
          product={{
            name: product.name,
            price: product.price,
            image: product.image,
          }}
          disabled={!product.inStock}
        />

        <ToggleWishlist productId={product.id} />

        <p className="text-xs text-zinc-400 text-center">
          Secure checkout via SSLCommerz (Bangladesh)
        </p>
      </div>
    </div>
  )
}