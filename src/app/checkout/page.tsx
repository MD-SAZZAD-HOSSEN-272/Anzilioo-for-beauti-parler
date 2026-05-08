"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/store/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatMoney } from "@/lib/money";

type Country = "Bangladesh" | "Other";

export default function CheckoutPage() {
  const router = useRouter();
  const { subtotal, count, clear } = useCart();

  const [country, setCountry] = React.useState<Country>("Bangladesh");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pay, setPay] = React.useState<"sslcommerz">("sslcommerz");
  const [loading, setLoading] = React.useState(false);

  const bdOnly = country === "Bangladesh";
  const canPay = bdOnly && count > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Checkout</h1>
          <p className="text-sm text-zinc-600">
            Payment supported: <span className="font-semibold">Bangladesh only</span>.
          </p>
        </div>

        {count === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
            <div className="text-sm text-zinc-600">
              Your cart is empty. Please add products before checkout.
            </div>
            <div className="mt-4">
              <ButtonLink href="/search">Browse products</ButtonLink>
            </div>
          </div>
        ) : null}

        <div className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
          <div className="text-base font-semibold text-zinc-900">Shipping information</div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">Full name</div>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">Phone</div>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-700">Address</div>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, road, area"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">City</div>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Dhaka" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">Country</div>
              <select
                className="h-11 w-full rounded-full bg-white px-4 text-sm ring-1 ring-zinc-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
              >
                <option value="Bangladesh">Bangladesh</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {!bdOnly ? (
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
              SSLCommerz is Bangladesh-only. Please select Bangladesh as country.
            </div>
          ) : null}
        </div>

        <div className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
          <div className="text-base font-semibold text-zinc-900">Payment method</div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
            <input
              type="radio"
              name="pay"
              value="sslcommerz"
              checked={pay === "sslcommerz"}
              onChange={() => setPay("sslcommerz")}
              className="mt-1"
              disabled={!bdOnly}
            />
            <div className="space-y-1">
              <div className="text-sm font-semibold text-zinc-900">SSLCommerz (Bangladesh)</div>
              <div className="text-sm text-zinc-600">
                Cards, mobile banking & more (demo: we’ll simulate redirect).
              </div>
            </div>
          </label>

          <div className="flex flex-wrap gap-3">
            <Button
              disabled={!canPay || loading || !name || !phone || !address || !city}
              onClick={() => {
                setLoading(true);
                // Frontend-only mock:
                // In backend phase, we will call an API route to create SSLCommerz session and redirect.
                window.setTimeout(() => {
                  clear();
                  router.push("/checkout/success");
                }, 800);
              }}
            >
              {loading ? "Redirecting to SSLCommerz..." : "Pay with SSLCommerz"}
            </Button>
            <Link href="/cart" className="inline-flex items-center text-sm font-semibold text-zinc-600 hover:text-zinc-900">
              Back to cart
            </Link>
          </div>

          <div className="text-xs text-zinc-500">
            Backend will add real SSLCommerz session creation + callbacks (success/fail/cancel).
          </div>
        </div>
      </div>

      <aside className="h-fit space-y-4 rounded-[2rem] bg-[rgb(var(--surface))] p-6 ring-1 ring-zinc-200">
        <div className="text-lg font-semibold text-zinc-900">Order summary</div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Items</span>
          <span className="font-semibold text-zinc-900">{count}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Subtotal</span>
          <span className="font-semibold text-zinc-900">
            {formatMoney({ currency: "BDT", amount: subtotal })}
          </span>
        </div>
        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500">
          By placing an order you agree to our demo terms.
        </div>
      </aside>
    </div>
  );
}

