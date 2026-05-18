import { ProductCard } from "./ProductCard"

export const RelatedProducts = ({ related }: { related: any[] }) => {
  return (
    <section className="mt-16 space-y-6 border-t border-pink-200 pt-10">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">
            Related Products
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            You may also like these products
          </p>
        </div>

        <div className="hidden md:block text-xs text-zinc-400">
          Hand-picked for you
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related?.map((p: any) => (
          <div
            key={p.id}
            className="group rounded-3xl bg-white transition overflow-hidden border border-zinc-100"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}