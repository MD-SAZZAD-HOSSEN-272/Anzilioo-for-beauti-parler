"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/components/store/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatMoney } from "@/lib/money";
import { OrderPayload } from "@/lib/types";
import { orderSchema } from "@/lib/Zod/order.schama";

export default function CheckoutPage() {
  const { subtotal, count, items } = useCart();

  // FORM STATES
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");

  // ACCOUNT
  const [createAccount, setCreateAccount] = React.useState(false);
  const [password, setPassword] = React.useState("");

  // PAYMENT
  const [pay, setPay] = React.useState<"sslcommerz">("sslcommerz");

  // UI
  const [loading, setLoading] = React.useState(false);

  // VALIDATION ERRORS
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // HANDLE ACCOUNT CHECKBOX
  const handleCreateAccount = () => {
    setCreateAccount((prev) => {
      const next = !prev;

      // clear password + password error if unchecked
      if (!next) {
        setPassword("");

        setErrors((prevErrors) => {
          const updated = { ...prevErrors };
          delete updated.password;
          return updated;
        });
      }

      return next;
    });
  };

  // HANDLE ORDER CREATE
  const handleCreateOrder = async () => {
    setLoading(true);

    // BUILD ORDER DATA
    const orderData: OrderPayload = {
      name,
      phone,
      email,
      address,
      city,
      createAccount,
      password: createAccount ? password : undefined,
      pay,

      items: items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),

      subtotal,
    };

    console.log("ORDER DATA:", orderData);

    // VALIDATE WITH ZOD
    const result = orderSchema.safeParse(orderData);

    // VALIDATION FAILED
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0];

        if (field) {
          fieldErrors[field.toString()] = err.message;
        }
      });

      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    // CLEAR OLD ERRORS
    setErrors({});

    try {
      console.log("VALID ORDER:", result);

      // =========================
      // API CALL HERE LATER
      // =========================

      // Example:
      // const response = await fetch("/api/orders", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(result.data),
      // });

      alert("Order validation successful!");

    } catch (error) {
      console.error(error);

      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Checkout
          </h1>

          <p className="text-sm text-zinc-600">
            Payment supported:{" "}
            <span className="font-semibold">Bangladesh only</span>.
          </p>
        </div>

        {/* EMPTY CART */}
        {count === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
            <div className="text-sm text-zinc-600">
              Your cart is empty. Please add products before checkout.
            </div>

            <div className="mt-4">
              <ButtonLink href="/search">
                Browse products
              </ButtonLink>
            </div>
          </div>
        ) : null}

        {/* SHIPPING */}
        <div className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
          <div className="text-base font-semibold text-zinc-900">
            Shipping information
          </div>

          {/* NAME + PHONE */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* NAME */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">
                Full name
              </div>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">
                Phone
              </div>

              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
              />

              {errors.phone && (
                <p className="text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-700">
              Address
            </div>

            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, road, area"
            />

            {errors.address && (
              <p className="text-sm text-red-500">
                {errors.address}
              </p>
            )}
          </div>

          {/* CITY + EMAIL */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* CITY */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">
                City
              </div>

              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Dhaka"
              />

              {errors.city && (
                <p className="text-sm text-red-500">
                  {errors.city}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-700">
                Email *
              </div>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* CREATE ACCOUNT */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-800">
              <input
                type="checkbox"
                checked={createAccount}
                onChange={handleCreateAccount}
              />

              Create account to view order details
            </label>

            {/* PASSWORD */}
            {createAccount && (
              <div className="space-y-1">
                <div className="text-sm font-medium text-zinc-700">
                  Password *
                </div>

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password}
                  </p>
                )}

                <p className="text-xs text-zinc-500">
                  Use email + password to view your order history later.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-zinc-200">
          <div className="text-base font-semibold text-zinc-900">
            Payment method
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-4">
            <input
              type="radio"
              checked={pay === "sslcommerz"}
              onChange={() => setPay("sslcommerz")}
              className="mt-1"
            />

            <div className="space-y-1">
              <div className="text-sm font-semibold text-zinc-900">
                SSLCommerz (Bangladesh)
              </div>

              <div className="text-sm text-zinc-600">
                Cards, mobile banking & more (demo mode)
              </div>
            </div>
          </label>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <Button
              disabled={loading || count === 0}
              onClick={handleCreateOrder}
            >
              {loading
                ? "Processing..."
                : "Pay with SSLCommerz"}
            </Button>

            <Link
              href="/cart"
              className="inline-flex items-center text-sm font-semibold text-zinc-600 hover:text-zinc-900"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <aside className="h-fit space-y-4 rounded-[2rem] bg-[rgb(var(--surface))] p-6 ring-1 ring-zinc-200">
        <div className="text-lg font-semibold text-zinc-900">
          Order summary
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Items</span>

          <span className="font-semibold text-zinc-900">
            {count}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600">Subtotal</span>

          <span className="font-semibold text-zinc-900">
            {formatMoney({
              currency: "BDT",
              amount: subtotal,
            })}
          </span>
        </div>

        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500">
          By placing an order you agree to our demo terms.
        </div>
      </aside>
    </div>
  );
}