import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CartProvider } from "@/components/store/CartProvider";
import { WishlistProvider } from "@/components/store/WishlistProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anzilioo Beauty Store",
    template: "%s · Anzilioo"
  },
  description: "Cosmetics & beauty products shop (frontend demo)"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-dvh bg-[rgb(var(--bg))]">
              <Suspense fallback={<div className="h-[108px] border-b border-zinc-200 bg-white" />}>
                <SiteHeader />
              </Suspense>
              <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
                {children}
              </main>
              <SiteFooter />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

