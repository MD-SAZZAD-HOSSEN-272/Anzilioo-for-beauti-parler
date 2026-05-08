import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[rgb(var(--surface))]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <div className="text-base font-semibold">Anzilioo</div>
          <p className="text-sm text-zinc-600">
            Cosmetics & female care products. Frontend demo — backend will be added later.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Shop</div>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>
              <Link href="/search" className="hover:text-zinc-900">
                All products
              </Link>
            </li>
            <li>
              <Link href="/category/makeup" className="hover:text-zinc-900">
                Makeup
              </Link>
            </li>
            <li>
              <Link href="/category/skincare" className="hover:text-zinc-900">
                Skincare
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Customer</div>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>
              <Link href="/account" className="hover:text-zinc-900">
                My account
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-zinc-900">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-zinc-900">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Payment</div>
          <p className="text-sm text-zinc-600">
            Bangladesh-only checkout supports SSLCommerz (frontend mock for now).
          </p>
          <div className="text-xs text-zinc-500">© {new Date().getFullYear()} Anzilioo</div>
        </div>
      </div>
    </footer>
  );
}

