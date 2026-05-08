import { ButtonLink } from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-[2rem] bg-white p-8 ring-1 ring-zinc-200">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">My account</h1>
      <p className="text-sm text-zinc-600">
        Frontend demo. In the backend phase we will add login, orders, address book, and profile
        management.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/search">Continue shopping</ButtonLink>
        <ButtonLink href="/cart" variant="outline">
          View cart
        </ButtonLink>
      </div>
    </div>
  );
}

