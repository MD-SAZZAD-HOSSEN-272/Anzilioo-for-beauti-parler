"use client";

import * as React from "react";

type WishlistState = {
  ids: string[];
};

type WishlistContextValue = WishlistState & {
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

const WishlistContext = React.createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "anzilioo.wishlist.v1";

function readInitial(): WishlistState {
  if (typeof window === "undefined") return { ids: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ids: [] };
    const parsed = JSON.parse(raw) as WishlistState;
    if (!parsed?.ids || !Array.isArray(parsed.ids)) return { ids: [] };
    return { ids: parsed.ids.filter((x) => typeof x === "string" && x.length) };
  } catch {
    return { ids: [] };
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<WishlistState>(() => ({ ids: [] }));
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setState(readInitial());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const toggle = React.useCallback((productId: string) => {
    setState((prev) => {
      const exists = prev.ids.includes(productId);
      return { ids: exists ? prev.ids.filter((id) => id !== productId) : [...prev.ids, productId] };
    });
  }, []);

  const has = React.useCallback((productId: string) => state.ids.includes(productId), [state.ids]);

  const clear = React.useCallback(() => setState({ ids: [] }), []);

  const value: WishlistContextValue = React.useMemo(
    () => ({ ...state, toggle, has, clear }),
    [state, toggle, has, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = React.useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

