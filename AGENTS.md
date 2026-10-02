# AGENTS.md — Persistent Coding-Agent Context & Execution Log
**Project**: Kemi's Artisan Pantry & Provisions (HNG 15 — Lesson 2 MVP)  
**Last Updated**: 2026-10-02  
**Active Lead Model**: Antigravity (Gemini 3.8 Flash)  

---

## 1. Project Mission & HNG 15 Evaluation Target
Build a production-grade e-commerce website that fulfills all Lesson 2 requirements:
- Product catalog & detail pages.
- Add-to-cart with persistent state (Zustand + LocalStorage).
- Checkout flow with shipping address form.
- Persistent PostgreSQL database using **Supabase** (or **Neon**) via **Prisma ORM**.
- **Google Authentication** via Google Cloud Console OAuth 2.0 Credentials.
- **Confirmation Emails** sent upon checkout using **Mailgun API** (with Resend fallback).
- **Survival of Re-entry**: User signs in, orders, signs out, closes tab, reopens, signs in, and still sees their orders at `/orders`.
- Clean Git repository, zero secrets in GitHub, deployed to Vercel/Netlify.

---

## 2. Tech Stack & Design Reference
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS with "Heritage Harvest" palette:
  - Background: `#FBF8F3` (Alabaster Cream)
  - Primary / Brand: `#2C4A3E` (Deep Olive)
  - Warm Accent / CTA: `#C26D4D` (Terracotta)
  - Card/Surface: `#FFFFFF` / `#F5EFEB` with border `#EADBCE`
  - Typography: Refined serif headings with clean sans body text
- **Database & ORM**: PostgreSQL (Supabase / Neon) + Prisma
- **Auth**: NextAuth.js (Auth.js) with Google Provider
- **Email**: Mailgun API (`mailgun.js`) + Resend fallback (`resend`)
- **State**: Zustand (`useCartStore`) with `localStorage` persistence

---

## 3. Directory Layout & Architecture
```
Shop-website/
├── PRD.md                   # Product Requirements Document
├── AGENTS.md                # Persistent Agent Context (This file)
├── README.md                # Full setup & HNG testing guide
├── .env.example             # Safe environment variable template
├── .env.local               # Local development secrets (gitignored)
├── .gitignore               # Strict secret protection
├── next.config.mjs          # Remote image domains & unoptimized setting
├── package.json             # Core dependencies (Next.js 15, Prisma, NextAuth, Mailgun, Resend)
├── tailwind.config.ts       # Heritage Harvest theme definition
├── tsconfig.json            # TypeScript path aliases
├── public/
│   └── images/
│       └── products/        # Authentic small-batch photos (pepper-relish, shea-butter, honey, suya-spices)
├── prisma/
│   ├── schema.prisma        # PostgreSQL Schema (User, Account, Product, Order, OrderItem)
│   └── seed.js              # Seed data for artisanal pantry goods (synchronized with Supabase)
└── src/
    ├── types/
    │   └── index.ts         # Product, CartItem, ShippingAddress, Order
    ├── store/
    │   └── use-cart-store.ts# Zustand persistent shopping cart store (localStorage sync)
    ├── lib/
    │   ├── prisma.ts        # Prisma client singleton
    │   ├── auth.ts          # NextAuth options configuration (Google Provider)
    │   ├── email.ts         # Mailgun + Resend handler with HTML receipt
    │   └── products-data.ts # Curated artisan provisions with local image paths
    ├── components/
    │   ├── Providers.tsx    # SessionProvider & Sonner Toaster
    │   ├── Navbar.tsx       # Navigation bar with Google Auth, avatar fallback & mounted Cart count
    │   ├── CartDrawer.tsx   # Slide-over cart preview with controls & shipping progress
    │   ├── ProductCard.tsx  # Product card with hover zoom & quick add
    │   └── Footer.tsx       # Handcrafted aesthetic & trust badges
    └── app/
        ├── layout.tsx       # Root layout wrapping Providers, Nav, Cart, Footer (suppressHydrationWarning)
        ├── globals.css      # Tailwind & theme variables
        ├── page.tsx         # Home & Product catalog with live search/filters & authentic hero visual
        ├── products/[slug]/page.tsx # Product detail page
        ├── checkout/page.tsx        # Multi-step checkout form with mounted client guard
        ├── order-success/[id]/page.tsx # Order confirmation screen
        ├── orders/page.tsx          # Order history & re-entry test screen
        └── api/
            ├── auth/[...nextauth]/route.ts # NextAuth Google route handler
            ├── checkout/route.ts           # Order persistence & Mailgun trigger
            ├── orders/route.ts             # User order history endpoint
            └── products/route.ts           # Product catalog endpoint
```

---

## 4. Current Phase & Progress
- [x] **Phase 1: PRD & Context** — `PRD.md` and `AGENTS.md` created.
- [x] **Phase 2: Project Init & Heritage Harvest UI** — Next.js 15, Tailwind CSS, Lucide icons, responsive layout.
- [x] **Phase 3: Database & Prisma Setup** — Supabase schema migrated (`npx prisma db push`) and seeded (`npm run db:seed`) into live PostgreSQL.
- [x] **Phase 4: Google Cloud OAuth 2.0** — NextAuth Google provider, session management, user avatar dropdown with `referrerPolicy="no-referrer"` and `onError` fallback.
- [x] **Phase 5: Persistent Cart** — Zustand store with `localStorage` sync, drawer slide-in, quantity controls, and SSR hydration guards.
- [x] **Phase 6: Checkout & Order Persistence** — `/checkout` page, API saving to PostgreSQL.
- [x] **Phase 7: Mailgun / Resend Email Confirmation** — Rich HTML order receipt template and dispatch logic.
- [x] **Phase 8: Order History & Logout Re-entry Verification** — `/orders` page built with explicit HNG test indicator.
- [ ] **Phase 9: Vercel Deployment & Production Env Vars** — Ready for user to push to GitHub & deploy.
- [ ] **Phase 10: Final HNG Master Checklist Audit**

---

## 5. Notes for Next Agent / Session Continuation
1. `npm install` and `npm run db:seed` have already succeeded.
2. **Supabase Database Connected**: Supabase PostgreSQL is live and tables are synchronized. If modifying credentials, remember to URL-encode `@` characters in passwords (`%40`).
3. **Local Assets**: Authentic photos are located in `public/images/products/` and loaded locally with `images: { unoptimized: true }` in `next.config.mjs` to prevent external network failures.
4. **Google Avatar Support**: Google OAuth avatars in `Navbar.tsx` use `referrerPolicy="no-referrer"` so Google's CDN does not block requests with 403 Forbidden on localhost, plus an `onError` fallback to the user's initial.
5. **Hydration Guards**: Both `Navbar.tsx` and `checkout/page.tsx` use `mounted` state guards to avoid SSR vs client localStorage hydration mismatches.
