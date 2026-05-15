"use client";

import * as React from "react";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/Button";
import Swal from "sweetalert2";

export function AddToCart({ productId, disabled, product }: { productId: string; disabled?: boolean; product : {name: string, price: number, image: string} }) {
  const { add } = useCart();
  const [adding, setAdding] = React.useState(false);

  const handleAddToCart = () => {
    setAdding(true);
        try {
          add(productId, 1, product);

          Swal.fire({
  position: "center",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
})

        } finally {
          window.setTimeout(() => setAdding(false), 250);
        }
  }

  return (
    <Button
      disabled={disabled || adding}
      onClick={() => handleAddToCart()}
      className="w-full"
    >
      {disabled ? "Out of stock" : adding ? "Adding..." : "Add to cart"}
      
    </Button>
  );
}

