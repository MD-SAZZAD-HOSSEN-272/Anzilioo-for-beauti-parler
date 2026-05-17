        import { notFound } from "next/navigation";
        import { ProductCard } from "@/components/product/ProductCard";
        import { getProductsByCategory } from "@/api/porducts";
        import { getCategoryBySlug } from "@/api/category";

        export default async function CategoryPage({
          params
        }: {
          params: Promise<{ slug: string }>;
        }) {
          const { slug } = await params;
          const getCategory = await getCategoryBySlug(slug);
          const category = getCategory.data
          if (!category) notFound();

          const res  = await getProductsByCategory(slug)
          const list = res?.data ?? [];

          // const list = productsByCategory(slug);

          return (
            <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {category.name}
        </h1>

        <p className="text-sm text-zinc-600">
          {list.length} products
        </p>
      </div>

      {/* EMPTY STATE */}
      {list.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 bg-white p-10 text-center">
          <div className="max-w-md space-y-3">
            <div className="text-5xl">🛍️</div>

            <h2 className="text-xl font-semibold text-zinc-900">
              Products coming soon
            </h2>

            <p className="text-sm leading-6 text-zinc-600">
              We’re preparing amazing products for "{category.name}" category.
              Please check back later.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
          );
        }

