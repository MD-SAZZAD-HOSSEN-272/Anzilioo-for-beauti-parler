"use client";

import { getProductById } from "@/api/porducts";
import * as React from "react";

type CartItem = {
  productId: string;
  qty: number;

  // Optional product info for subtotal
  product?: {
    price: number;
  };
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];

 add: (
  productId: string,
  qty?: number,
  product?: {
    name: string,
    price: number,
    image: string
  }
) => void;
  remove: (productId: string) => Promise<void>;
  setQty: (productId: string, qty: number) => Promise<void>;
  clear: () => Promise<void>;

  count: number;
  subtotal: number;

  loading: boolean;
};

const CartContext = React.createContext<CartContextValue | null>(null);

const STORAGE_KEY = "anzilioo.cart.v1";

function getLocalCart(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { items: [] };
    }

    return JSON.parse(raw);
  } catch {
    return { items: [] };
  }
}

function saveLocalCart(cart: CartState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem("user");

  if (!raw) {
    return null;
  }

  return JSON.parse(raw);
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<CartState>({
    items: [],
  });

  const [loading, setLoading] = React.useState(true);

  /**
   * INITIAL LOAD
   */
  React.useEffect(() => {
    const initializeCart = async () => {
      try {
        const user = getUser();

        /**
         * LOGGED USER
         */
        if (user) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`,
            {
              cache: "no-store",
            }
          );

          const data = await res.json();

          setState({
            items: data.data || [],
          });
        }

        /**
         * GUEST USER
         */
        else {
          const localCart = getLocalCart();

          setState(localCart);
        }
      } catch (error) {
        console.error("Cart init error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  /**
   * SAVE LOCALSTORAGE
   */
  React.useEffect(() => {
    if (loading) return;

    const user = getUser();

    if (!user) {
      saveLocalCart(state);
    }
  }, [state, loading]);

  /**
   * ADD
   */
  const add = React.useCallback(
    async (productId: string, qty = 1, product?: {price: number}) => {
      const user = getUser();

      /**
       * DB USER
       */
      if (user) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                productId,
                qty,
                product
              }),
            }
          );

          const data = await res.json();

          setState({
            items: data.data || [],
          });

          return;
        } catch (error) {
          console.error(error);
          return;
        }
      }

      /**
       * GUEST
       */
      setState((prev) => {
        const existing = prev.items.find(
          (i) => i.productId === productId
        );

        if (existing) {
          return {
            items: prev.items.map((i) =>
              i.productId === productId
                ? {
                    ...i,
                    qty: i.qty + qty,
                    product: product || i.product,
                  }
                : i
            ),
          };
        }

        return {
          items: [
            ...prev.items,
            {
              productId,
              qty,
              product
            },
          ],
        };
      });
    },
    []
  );

  /**
   * REMOVE
   */
  const remove = React.useCallback(
    async (productId: string) => {
      const user = getUser();

      // console.log(productId)

      /**
       * DB USER
       */
      if (user) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/remove`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                productId,
              }),
            }
          );

          const data = await res.json();

          setState({
            items: data.data || [],
          });

          return;
        } catch (error) {
          console.error(error);
          return;
        }
      }

      /**
       * GUEST
       */
      setState((prev) => ({
        items: prev.items.filter(
          (i) => i.productId !== productId
        ),
      }));
    },
    []
  );

  /**
   * UPDATE QTY
   */
  const setQty = React.useCallback(
    async (productId: string, qty: number) => {
      const safeQty = Math.max(1, Math.floor(qty));

      const user = getUser();

      /**
       * DB USER
       */
      if (user) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/update`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                productId,
                qty: safeQty,
              }),
            }
          );

          const data = await res.json();

          setState({
            items: data.data || [],
          });

          return;
        } catch (error) {
          console.error(error);
          return;
        }
      }

      /**
       * GUEST
       */
      setState((prev) => ({
        items: prev.items.map((i) =>
          i.productId === productId
            ? {
                ...i,
                qty: safeQty,
              }
            : i
        ),
      }));
    },
    []
  );

  /**
   * CLEAR
   */
  const clear = React.useCallback(async () => {
    const user = getUser();

    /**
     * DB USER
     */
    if (user) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/clear/${user.id}`,
          {
            method: "DELETE",
          }
        );

        setState({
          items: [],
        });

        return;
      } catch (error) {
        console.error(error);
        return;
      }
    }

    /**
     * GUEST
     */
    setState({
      items: [],
    });

    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * TOTAL ITEM COUNT
   */
  const count = React.useMemo(() => {
    return state.items.reduce(
      (acc, item) => acc + item.qty,
      0
    );
  }, [state.items]);

  /**
   * SUBTOTAL
   */
const subtotal = React.useMemo(() => {
  return state.items.reduce((acc, item) => {
    return (
      acc +
      (item.product?.price || 0) * item.qty
    );
  }, 0);
}, [state.items]);

  const value = React.useMemo(
    () => ({
      items: state.items,

      add,
      remove,
      setQty,
      clear,

      count,
      subtotal,

      loading,
    }),
    [
      state.items,
      add,
      remove,
      setQty,
      clear,
      count,
      subtotal,
      loading,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return ctx;
}


















// "use client";

// import * as React from "react";
// import type { CartItem } from "@/lib/types";
// import { getProductById } from "@/lib/catalog";

// type CartState = {
//   items: CartItem[];
// };

// type CartContextValue = CartState & {
//   add: (productId: string, qty?: number) => void;
//   remove: (productId: string) => void;
//   setQty: (productId: string, qty: number) => void;
//   clear: () => void;
//   count: number;
//   subtotal: number;
// };

// const CartContext = React.createContext<CartContextValue | null>(null);

// const STORAGE_KEY = "anzilioo.cart.v1";

// function readInitial(): CartState {
//   if (typeof window === "undefined") return { items: [] };
//   try {
//     const raw = window.localStorage.getItem(STORAGE_KEY);
//     if (!raw) return { items: [] };
//     const parsed = JSON.parse(raw) as CartState;
//     if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
//     return { items: parsed.items.filter((i) => i?.productId && i.qty > 0) };
//   } catch {
//     return { items: [] };
//   }
// }

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [state, setState] = React.useState<CartState>(() => ({ items: [] }));
//   const [hydrated, setHydrated] = React.useState(false);

//   React.useEffect(() => {
//     setState(readInitial());
//     setHydrated(true);
//   }, []);

//   React.useEffect(() => {
//     if (!hydrated) return;
//     window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   }, [state, hydrated]);

//   const add = React.useCallback((productId: string, qty = 1) => {
//     setState((prev) => {
//       const existing = prev.items.find((i) => i.productId === productId);
//       if (existing) {
//         return {
//           items: prev.items.map((i) =>
//             i.productId === productId ? { ...i, qty: i.qty + qty } : i
//           )
//         };
//       }
//       return { items: [...prev.items, { productId, qty }] };
//     });
//   }, []);

//   const remove = React.useCallback((productId: string) => {
//     setState((prev) => ({
//       items: prev.items.filter((i) => i.productId !== productId)
//     }));
//   }, []);

//   const setQty = React.useCallback((productId: string, qty: number) => {
//     const safe = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
//     setState((prev) => ({
//       items: prev.items.map((i) => (i.productId === productId ? { ...i, qty: safe } : i))
//     }));
//   }, []);

//   const clear = React.useCallback(() => setState({ items: [] }), []);

//   const count = React.useMemo(
//     () => state.items.reduce((acc, i) => acc + i.qty, 0),
//     [state.items]
//   );

//   const subtotal = React.useMemo(() => {
//     return state.items.reduce((acc, i) => {
//       const p = getProductById(i.productId);
//       if (!p) return acc;
//       return acc + p.price.amount * i.qty;
//     }, 0);
//   }, [state.items]);

//   const value: CartContextValue = React.useMemo(
//     () => ({ ...state, add, remove, setQty, clear, count, subtotal }),
//     [state, add, remove, setQty, clear, count, subtotal]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = React.useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// }

