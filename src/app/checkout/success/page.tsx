import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-[2rem] bg-white p-8 text-center ring-1 ring-zinc-200">
      <div className="text-2xl font-semibold tracking-tight text-zinc-900">
        Payment successful (demo)
      </div>
      <p className="text-sm text-zinc-600">
        In the backend phase, this page will be reached via SSLCommerz success callback.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Continue shopping</ButtonLink>
        <Link href="/account" className="inline-flex items-center text-sm font-semibold text-zinc-600 hover:text-zinc-900">
          Go to account
        </Link>
      </div>
    </div>
  );
}

