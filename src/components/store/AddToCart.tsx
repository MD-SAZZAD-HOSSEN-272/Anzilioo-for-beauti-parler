"use client";

import * as React from "react";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/Button";

export function AddToCart({ productId, disabled, product }: { productId: string; disabled?: boolean; product : {name: string, price: number, image: string} }) {
  const { add } = useCart();
  const [adding, setAdding] = React.useState(false);

  return (
    <Button
      disabled={disabled || adding}
      onClick={() => {
        setAdding(true);
        try {
          add(productId, 1, product);
        } finally {
          window.setTimeout(() => setAdding(false), 250);
        }
      }}
      className="w-full"
    >
      {disabled ? "Out of stock" : adding ? "Adding..." : "Add to cart"}
    </Button>
  );
}

