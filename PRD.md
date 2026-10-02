# Product Requirements Document (PRD)
## Project: Kemi's Artisan Pantry & Provisions (MVP Shop)
**HNG 15 — Lesson 2: Shop Website + Integrations**

---

## 1. Overview & Problem Statement
Small-batch food artisans, local traders, and family producers often lack a modern, trustworthy digital storefront to showcase their handcrafted food goods, receive orders, and automatically communicate with buyers. 

**Kemi's Artisan Pantry & Provisions** is a curated e-commerce MVP built for a real family artisan trader ("Auntie Kemi"), offering handcrafted condiments, small-batch preserves, stone-roasted nuts, shea butter apothecary items, and dried herbal infusions.

The primary objective is to fulfill all functional requirements of HNG 15 Lesson 2:
1. Product browsing & detail experience.
2. Persistent shopping cart (retains items across refresh).
3. Responsive, multi-step checkout page.
4. Persistent database using PostgreSQL (Supabase or Neon).
5. Google Authentication via Google Cloud Console OAuth 2.0.
6. Order history that survives logout and browser closure/re-entry.
7. Automated transactional confirmation emails sent upon order completion (via Mailgun, with Resend instant fallback).

---

## 2. Target Users & Personas
- **The Foodie / Conscious Consumer**: Shoppers looking for authentic, small-batch pantry staples with transparent ingredients.
- **The Returning Customer**: A user who signs in with Google, places an order, receives an email receipt, logs out, and returns days later to review previous orders.
- **The Shop Owner (Kemi)**: Needs clean order persistence and immediate email dispatch so no customer order is lost.

---

## 3. UI/UX Design System: "Heritage Harvest"
- **Aesthetic**: Warm, comforting, raw, small-batch kitchen atmosphere.
- **Color Palette**:
  - **Background**: `#FBF8F3` (Alabaster Cream)
  - **Brand Primary**: `#2C4A3E` (Deep Olive)
  - **Warm Accent / CTAs**: `#C26D4D` (Terracotta)
  - **Surfaces**: Crisp white `#FFFFFF` and warm tint `#F5EFEB` with subtle borders (`#EADBCE`)
  - **Text**: `#1E2822` (Charcoal Pine) for strong, accessible typography
- **Components**:
  - Responsive Top Navigation with real-time Cart counter and Google User Avatar menu.
  - Hero introduction banner with artisan value props.
  - Category filters (Pantry, Preserves, Roasted Treats, Botanicals).
  - Product cards with images, pricing, inventory counter, and "Add to Cart".
  - Slide-over Cart Drawer for seamless cart management.
  - Dedicated Checkout Page (`/checkout`) with contact & shipping forms.
  - Order Success Screen (`/order-success/[orderId]`) with delivery details and Mailgun dispatch badge.
  - Orders Dashboard (`/orders`) for authenticated order history.

---

## 4. Key Functional Requirements

### 4.1 Shop & Product Catalog
- List products stored in PostgreSQL / mock seed with image, title, price, description, category, and inventory status.
- Search and category filtering.
- Dynamic product detail pages (`/products/[slug]`).

### 4.2 Shopping Cart
- Client-side reactive Zustand store.
- LocalStorage persistence (cart remains intact when user refreshes or reopens the browser).
- Increment, decrement, remove item, subtotal calculation, free shipping indicator.

### 4.3 Authentication (Google Cloud Console OAuth 2.0)
- Authenticate via Google OAuth using NextAuth.js.
- Persist users and sessions in PostgreSQL.
- Support Google avatar, display name, and auto-filling checkout details.
- Clean Sign-in and Sign-out lifecycle.

### 4.4 Checkout & Order Persistence
- Input customer name, email, delivery address, city, state, zip.
- Validate inputs.
- Save order to PostgreSQL (`Order` and `OrderItem` tables) with status `PAID` / `PENDING`.
- Link order to authenticated user's ID.

### 4.5 Confirmation Email (Mailgun API + Resend Fallback)
- Trigger email dispatch immediately upon order creation.
- Rich HTML email template containing:
  - Store header ("Kemi's Artisan Pantry")
  - Order ID & Timestamp
  - Itemized table with product name, quantity, unit price, and subtotal
  - Delivery address & estimated delivery window
  - Customer support contact

### 4.6 Re-Entry & Persistence Test (What HNG Will Test)
- User signs in with Google.
- User places an order.
- Order is saved to database.
- User logs out.
- User closes browser/tab and reopens.
- User signs in again.
- User visits `/orders` and verifies previous order is intact with all line items.

---

## 5. Non-Functional Requirements
- **Performance**: Sub-second page loads leveraging Next.js App Router and Server Components.
- **Security**: No secrets or API keys stored in Git. All credentials managed via `.env.local` and Vercel environment variables.
- **Reliability**: Graceful error handling for database queries and email API requests.

---

## 6. Milestones & Phases
- **Phase 1**: PRD & AI Context (`AGENTS.md`)
- **Phase 2**: Next.js 15 UI, Tailwind CSS "Heritage Harvest" styling
- **Phase 3**: Prisma ORM schema & Supabase/Neon PostgreSQL setup
- **Phase 4**: Google Cloud OAuth 2.0 setup
- **Phase 5**: Zustand persistent cart store
- **Phase 6**: Checkout page & Order database persistence
- **Phase 7**: Mailgun / Resend transactional email integration
- **Phase 8**: Order history (`/orders`) & logout/re-entry verification
- **Phase 9**: Production Vercel deployment & environment variable configuration
- **Phase 10**: Master checklist end-to-end verification
