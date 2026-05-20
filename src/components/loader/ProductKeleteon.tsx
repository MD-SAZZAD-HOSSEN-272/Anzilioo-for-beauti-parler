'use client'

export default function ProductSkeleton({num, grid} : {num : number, grid : number}) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-${grid}`}>
      
      {Array.from({ length: num }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-200"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] bg-zinc-200" />

          {/* Content */}
          <div className="flex flex-col p-4">
            
            {/* Brand */}
            <div className="h-3 w-20 rounded-full bg-zinc-200" />

            {/* Title */}
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded-full bg-zinc-200" />
              <div className="h-4 w-2/3 rounded-full bg-zinc-100" />
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="h-4 w-16 rounded-full bg-zinc-200" />
              <div className="h-4 w-10 rounded-full bg-zinc-100" />
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-2">
              <div className="h-5 w-24 rounded-full bg-zinc-200" />
              <div className="h-4 w-16 rounded-full bg-zinc-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}