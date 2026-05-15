import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProductBySlug, productsByCategory } from "@/lib/catalog";
import { bdt, formatMoney } from "@/lib/money";
import { Badge } from "@/components/ui/Badge";
import { AddToCart } from "@/components/store/AddToCart";
import { ToggleWishlist } from "@/components/store/ToggleWishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductById, getProductsByCategory } from "@/api/porducts";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productResponse = await getProductById(slug);
  const product = productResponse?.data;

  if (!product) {
    notFound();
  }

  
  let related: any[] = [];

  try {
    const relatedResponse = await getProductsByCategory(
      product.categorySlug
    );

    related =
      relatedResponse?.data
        ?.filter((p: any) => p.id !== product.id)
        ?.slice(0, 4) || [];
  } catch (error) {
    console.error("Related products error:", error);
  }

  const primaryImage = product.images?.[0] || null;

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {
            primaryImage ? <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-zinc-50 ring-1 ring-zinc-200">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div> : <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                No image available
              </div>
          }
         {
          product.images.length > 0 ? (
             <div className="grid grid-cols-3 gap-3">
            {product.images?.slice(0, 3).map((src : string) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200"
              >
                <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
              </div>
            ))}
          </div>
          ) : (null)
         }
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-zinc-500">{product.brand}</div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Star className="size-4 fill-current" />
                <span className="text-sm font-semibold text-zinc-900">
                  {typeof product.rating === "number"
                    ? product.rating.toFixed(1)
                    : "0.0"}
                </span>
              </div>
              <span className="text-sm text-zinc-500">
                {product.reviewCount || 0} reviews
              </span>
              <Badge className="bg-zinc-900 text-white">
                {product.inStock ? "In stock" : "Out of stock"}
              </Badge>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="text-2xl font-bold text-zinc-900">
              {formatMoney(bdt(product.price))}
            </div>
            {product.compareAtPrice ? (
              <div className="text-base text-zinc-400 line-through">
                {formatMoney(bdt(product.compareAtPrice))}
              </div>
            ) : null}
          </div>

          <p className="text-sm text-zinc-600">{product.shortDescription || null}</p>

          <div className="rounded-3xl bg-[rgb(var(--surface))] p-4 ring-1 ring-zinc-200">
            <div className="grid gap-3">
              <AddToCart productId={product.id} product={{name: product.name, price: product.price, image: product.images[0]}} disabled={!product.inStock} />
              <ToggleWishlist productId={product.id} />
              <div className="text-xs text-zinc-500">
                Checkout supports Bangladesh-only SSLCommerz (demo flow).
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-900">Details</h2>
            <p className="text-sm text-zinc-600">{product.description}</p>
            {
              product.tags?.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-2">
              {product.tags?.map((t : string) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
              ) : null
            }
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Related products
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p : any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

