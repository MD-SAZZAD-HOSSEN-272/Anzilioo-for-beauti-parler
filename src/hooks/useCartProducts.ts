'use client'

import React from 'react'
import { getProductById } from '@/api/porducts'

const productCache = new Map()

export function useCartProducts(items: any[]) {
  const [lines, setLines] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  const itemIds = items.map(i => i.productId).join(',')

  React.useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)

      const data = await Promise.all(
        items.map(async (i) => {
          let product

          // ✅ CACHE CHECK
          if (productCache.has(i.productId)) {
            product = productCache.get(i.productId)
          } else {
            const res = await getProductById(i.productId)
            product = res?.data
            productCache.set(i.productId, product)
          }

          return {
            item: i,
            product,
          }
        })
      )

      if (!ignore) {
        setLines(data.filter((x) => x.product))
        setLoading(false)
      }
    }

    if (items.length) load()
    else {
      setLines([])
      setLoading(false)
    }

    return () => {
      ignore = true
    }
  }, [items]) // ⚠️ we'll improve this next

  return { lines, loading }
}