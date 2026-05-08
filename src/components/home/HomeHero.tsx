import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { bunnyUrl } from "@/lib/bunny";

export function HomeHero() {
  return (
    <section className="grid gap-6 rounded-[2rem] bg-[rgb(var(--surface))] p-6 ring-1 ring-zinc-200 md:grid-cols-2 md:items-center md:p-10">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200">
          Bangladesh delivery · Cash on delivery (demo)
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Cosmetics & skincare you’ll love at prices that feel good.
        </h1>
        <p className="text-pretty text-sm text-zinc-600 md:text-base">
          A modern, fast ecommerce frontend inspired by Shajgoj built with Next.js and
          Tailwind. Browse categories, add to cart, and checkout with SSLCommerz (frontend
          mock).
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/category/skincare">Shop Skincare</ButtonLink>
          <ButtonLink href="/category/makeup" variant="outline">
            Explore Makeup
          </ButtonLink>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-zinc-200">
        <Image
          src='https://www.simpleskincare.in/cdn/shop/files/02_phone_homepage_banners-1.jpg?v=1742468719'
          alt="Beauty products"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

