'use client'

import React from 'react'
import { getProductById } from '@/api/porducts'

const productCache = new Map()

export function useCartProducts(items: any[]) {
  const [lines, setLines] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let ignore = false

    async function load() {
      try {
        setLoading(true)

        const data = await Promise.all(
          items.map(async (i) => {
            try {
              let product

              // CACHE
              if (productCache.has(i.productId)) {
                product = productCache.get(i.productId)
              } else {
                const res = await getProductById(i.productId)

                product = res?.data

                if (product) {
                  productCache.set(i.productId, product)
                }
              }

              return {
                item: i,
                product,
              }
            } catch (error) {
              // console.log('Product fetch failed:', i.productId)

              return {
                item: i,
                product: null,
              }
            }
          })
        )

        if (!ignore) {
          setLines(data.filter((x) => x.product))
        }
      } catch (error) {
        // console.log('Cart load failed:', error)

        if (!ignore) {
          setLines([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    if (items.length) {
      load()
    } else {
      setLines([])
      setLoading(false)
    }

    return () => {
      ignore = true
    }
  }, [items])

  return { lines, loading }
}