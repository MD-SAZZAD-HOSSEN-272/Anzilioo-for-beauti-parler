"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { useCart } from "@/components/store/CartProvider";
import { getCategories } from "@/api/category";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const { count } = useCart();
  const user = ''

  const [categories, setCategories] = React.useState<any[]>([])

  React.useEffect(() => {
    const getCategory = async() => {
      const res = await getCategories()
      setCategories(res.data)
    }

    getCategory()
  }, [])

  const [q, setQ] = React.useState(() => params.get("q") ?? "");

  React.useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-[rgb(var(--brand))] text-sm font-semibold text-white">
            A
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Anzilioo</div>
            <div className="text-xs text-zinc-500">Beauty Store</div>
          </div>
        </Link>

        <form
          className="relative ml-auto hidden w-full max-w-xl items-center sm:flex"
          onSubmit={(e) => {
            e.preventDefault();
            const query = q.trim();
            router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
          }}
        >
          <span className="pointer-events-none absolute left-4 text-zinc-400">
            <Search className="size-4" />
          </span>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands..."
            className="pl-11"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1 sm:ml-0">
          <HeaderIconLink href={user ? '/account' : '/auth/login'} label={user ? 'Account' : 'Login'} icon={<User className="size-5" />} />
          <HeaderIconLink
            href="/wishlist"
            label="Wishlist"
            icon={<Heart className="size-5" />}
          />
          <HeaderIconLink
            href="/cart"
            label="Cart"
            icon={
              <span className="relative">
                <ShoppingBag className="size-5" />
                {count > 0 ? (
                  <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-[rgb(var(--brand))] px-1 text-[10px] font-semibold leading-5 text-white">
                    {count > 99 ? "99+" : count}
                  </span>
                ) : null}
              </span>
            }
          />
        </nav>
      </div>

      <div className="border-t border-zinc-100">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {categories?.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                pathname === `/category/${c.slug}`
                  ? "bg-[rgb(var(--brand))] text-white"
                  : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeaderIconLink({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

