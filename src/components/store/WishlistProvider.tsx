"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WishlistContextType = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "wishlist";

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ids, setIds] = useState<string[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setIds(JSON.parse(stored));
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  }, [ids]);

  // Add / Remove product
  const toggle = (id: string) => {
    if (ids.includes(id)) {
      setIds(ids.filter((item) => item !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  // Check product exists
  const has = (id: string) => {
    return ids.includes(id);
  };

  // Clear wishlist
  const clear = () => {
    setIds([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        ids,
        toggle,
        has,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}