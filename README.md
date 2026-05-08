## Anzilioo (Frontend)

Next.js + Tailwind ecommerce frontend (cosmetics / female products).

### Tech

- Next.js (App Router)
- Tailwind CSS (v4 via `@tailwindcss/postcss`)
- `next/image` configured for Bunny.net (`*.b-cdn.net`)
- Cart + wishlist stored in `localStorage`

### Run locally

```bash
cd anzilioo
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Bunny.net images

Set `NEXT_PUBLIC_BUNNY_CDN_HOST` (see `.env.example`). The demo catalog uses URLs like:

- `${NEXT_PUBLIC_BUNNY_CDN_HOST}/products/...`

### Payment (Bangladesh only)

Checkout UI includes **SSLCommerz** as the payment method (frontend mock).

Backend phase plan:

- Create order
- Create SSLCommerz session (init API)
- Redirect user to gateway
- Handle success/fail/cancel callbacks and update order status

