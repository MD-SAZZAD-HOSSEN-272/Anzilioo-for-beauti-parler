'use client'

import React from 'react'
import Image from 'next/image'

export default function ProductImageGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [selected, setSelected] = React.useState(images?.[0] || '')

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-zinc-50 ring-1 ring-zinc-200">
        <Image
          src={selected}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images?.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.slice(0, 3).map((src) => (
            <div
              key={src}
              onClick={() => setSelected(src)}
              className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 cursor-pointer"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}