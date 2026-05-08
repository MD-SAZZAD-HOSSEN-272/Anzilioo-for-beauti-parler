import type { MoneyBDT } from "@/lib/types";

export function bdt(amount: number): MoneyBDT {
  return { currency: "BDT", amount };
}

export function formatMoney(m: MoneyBDT) {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: 0
  }).format(m.amount);
}

