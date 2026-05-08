"use client";

import * as React from "react";
import type { CartItem } from "@/lib/types";
import { getProductById } from "@/lib/catalog";

type CartState = {
  items: CartItem[];
};

type CartContextValue = CartState & {
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = React.createContext<CartContextValue | null>(null);

const STORAGE_KEY = "anzilioo.cart.v1";

function readInitial(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items.filter((i) => i?.productId && i.qty > 0) };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>(() => ({ items: [] }));
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setState(readInitial());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const add = React.useCallback((productId: string, qty = 1) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.productId === productId);
      if (existing) {
        return {
          items: prev.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + qty } : i
          )
        };
      }
      return { items: [...prev.items, { productId, qty }] };
    });
  }, []);

  const remove = React.useCallback((productId: string) => {
    setState((prev) => ({
      items: prev.items.filter((i) => i.productId !== productId)
    }));
  }, []);

  const setQty = React.useCallback((productId: string, qty: number) => {
    const safe = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
    setState((prev) => ({
      items: prev.items.map((i) => (i.productId === productId ? { ...i, qty: safe } : i))
    }));
  }, []);

  const clear = React.useCallback(() => setState({ items: [] }), []);

  const count = React.useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty, 0),
    [state.items]
  );

  const subtotal = React.useMemo(() => {
    return state.items.reduce((acc, i) => {
      const p = getProductById(i.productId);
      if (!p) return acc;
      return acc + p.price.amount * i.qty;
    }, 0);
  }, [state.items]);

  const value: CartContextValue = React.useMemo(
    () => ({ ...state, add, remove, setQty, clear, count, subtotal }),
    [state, add, remove, setQty, clear, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

