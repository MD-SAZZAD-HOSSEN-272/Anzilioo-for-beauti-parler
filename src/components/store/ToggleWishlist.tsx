"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/components/store/WishlistProvider";

export function ToggleWishlist({ productId }: { productId: string }) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => toggle(productId)}
      className="w-full"
    >
      <Heart className={saved ? "size-4 fill-[rgb(var(--brand))] text-[rgb(var(--brand))]" : "size-4"} />
      {saved ? "Saved" : "Save to wishlist"}
    </Button>
  );
}

