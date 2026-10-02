# Kemi's Artisan Pantry & Provisions 🍯
### HNG 15 — Lesson 2: Shop Website + Integrations MVP

A production-ready e-commerce platform built for Auntie Kemi's handcrafted food & apothecary business. Built with **Next.js 15**, **PostgreSQL (Supabase/Neon)**, **Google Cloud Console OAuth 2.0**, and **Mailgun** confirmation emails.

---

## 🎨 Theme & Aesthetic: "Heritage Harvest"
- **Background**: `#FBF8F3` (Alabaster Cream) — warm, comforting, raw, small-batch kitchen atmosphere.
- **Brand Primary**: `#2C4A3E` (Deep Olive) — earthy, grounded, natural quality.
- **Accent & Actions**: `#C26D4D` (Terracotta) — warm baked earth for CTAs, badges, and highlights.
- **Surfaces**: Crisp white `#FFFFFF` cards with warm biscuit borders (`#EADBCE`).

---

## 📋 What HNG Will Test & How This App Solves It

| HNG Requirement | Implementation & Location |
| :--- | :--- |
| **1. Product / Shop Experience** | Interactive catalog with category filters, search, and detail pages (`/` & `/products/[slug]`). |
| **2. Add-to-Cart (Persistent)** | Zustand store synced with `localStorage` in `src/store/use-cart-store.ts`. Survives page reloads. |
| **3. Checkout Page** | Multi-step checkout form at `/checkout` with address validation and real-time total summary. |
| **4. Database Persistence** | PostgreSQL modeled via Prisma ORM (`prisma/schema.prisma`) for `User`, `Account`, `Order`, `OrderItem`, and `Product`. |
| **5. Google Authentication** | NextAuth.js configured with Google Cloud Console OAuth 2.0 Credentials in `src/lib/auth.ts`. |
| **6. Confirmation Emails** | Automated responsive HTML receipt dispatched upon checkout using Mailgun API (`mailgun.js`) with Resend alternative in `src/lib/email.ts`. |
| **7. Order History & Re-entry** | Order history at `/orders`. Survives sign-out, browser closure, and re-entry. |
| **8. No Secrets in GitHub** | `.gitignore` properly configured. All secrets kept in `.env.local`. |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront!

---

## 🔑 Human Integration Setup Guide (External Accounts)

### A. Google Cloud Console (Google Authentication)
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. In the sidebar, navigate to **APIs & Services > OAuth consent screen**:
   - Choose **External**, click **Create**.
   - Set **App Name** to `Kemi's Artisan Pantry`, select your user support email, and add developer contact email.
   - Under **Scopes**, add `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`.
   - Under **Test users**, add your own Google email. Save.
4. Go to **APIs & Services > Credentials**:
   - Click **+ Create Credentials > OAuth client ID**.
   - Select **Web application**.
   - Name: `Pantry Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - *(Add your production Vercel URL once deployed)*
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://<your-vercel-domain>.vercel.app/api/auth/callback/google`
   - Copy your **Client ID** and **Client Secret** into `.env.local`:
     ```env
     GOOGLE_CLIENT_ID="your_client_id.apps.googleusercontent.com"
     GOOGLE_CLIENT_SECRET="your_client_secret"
     ```

---

### B. Database (Supabase or Neon PostgreSQL)
1. **Using Supabase**:
   - Go to [Supabase](https://supabase.com/) and create a free project.
   - Go to **Project Settings > Database > Connection string**.
   - Copy the **URI (Transaction mode, port 6543)** and paste into `.env.local`:
     ```env
     DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
     DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
     ```
2. **Push the schema & seed data**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

### C. Mailgun Confirmation Email Setup
1. Go to [Mailgun](https://www.mailgun.com/) and sign up / log in.
2. In **Sending > Domains**, find your free sandbox domain (e.g. `sandboxXYZ.mailgun.org`).
3. **Important for Sandbox**: Go to **Authorized Recipients** and click **Add Recipient** to add the email you will test checkout with (Mailgun sandbox only delivers to authorized emails).
4. Go to **Sending > Sending Keys** or **Settings > API Security** to copy your **Private API key**.
5. Put credentials in `.env.local`:
   ```env
   MAILGUN_API_KEY="key-xxxxxxxxxxxxxxxxxxxxxxxx"
   MAILGUN_DOMAIN="sandboxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org"
   MAILGUN_HOST="api.mailgun.net"
   MAIL_FROM="Kemi's Artisan Pantry <orders@sandboxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org>"
   ```

*(Alternative: If Mailgun has delivery delays, get a free key from [Resend.com](https://resend.com) with zero card required, set `RESEND_API_KEY="re_..."` and it works instantly!)*

---

## 🧪 Testing the HNG Evaluation Flow Step-by-Step

1. **Sign In**:
   - Click **"Sign in with Google"** in the top navigation.
   - Authenticate with your Google account. Your avatar will appear with a user dropdown.
2. **Add to Cart**:
   - Browse provisions on the home page or click on any product detail page.
   - Click **"Add"** or **"Add to Basket"**. The slide-over cart drawer appears.
3. **Verify Cart Persistence**:
   - Refresh the page (`F5`). Notice that your cart items and counts remain intact.
4. **Checkout**:
   - Click **"Proceed to Checkout"**.
   - Your name and Google email are pre-filled.
   - Fill in shipping address details and click **"Place Order"**.
5. **Receive Confirmation Email**:
   - Order completes and navigates to `/order-success/[orderId]`.
   - Check your inbox: a real, formatted HTML receipt from Mailgun has arrived with your order details and items table.
6. **Verify Persistence Across Logout & Re-entry**:
   - Click **"View in Order History"** or navigate to `/orders`. Your placed order is listed with all line items and status badges.
   - Click on your avatar dropdown $\rightarrow$ **"Sign Out"**.
   - **Close the browser tab completely**.
   - Reopen the browser and visit `http://localhost:3000`.
   - Click **"Sign in with Google"** and sign in again.
   - Go to `/orders`: **Your previous orders are still there, intact!**

---

## 🌐 Git, GitHub & Production Deployment Guide

### Step 1: Commit Your Code (Zero Secrets Guaranteed)
Open your terminal inside `Shop-website` and run:

```bash
# 1. Verify secrets (.env, .env.local) are ignored
git status

# 2. Stage all clean project files
git add .

# 3. Create initial commit
git commit -m "feat: complete MVP shop website with Supabase, Google OAuth, Mailgun, and Heritage Harvest design"

# 4. Set main branch
git branch -M main
```

---

### Step 2: Push to GitHub
1. Go to [GitHub.com](https://github.com) and click **"New repository"**.
2. Name it (e.g., `kemis-artisan-pantry` or `hng-shop-website`).
3. Leave **"Initialize this repository with a README" unchecked** (you already have one).
4. Click **Create repository**.
5. Copy the remote URL commands provided by GitHub and run them in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

### Step 3: Deploy to Vercel (Free & Instant)
1. Go to [Vercel.com](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Locate your repository from GitHub and click **"Import"**.
4. In **Build and Output Settings**, keep defaults:
   - Framework Preset: **Next.js**
5. Expand the **"Environment Variables"** section and paste your production variables:
   - `NEXTAUTH_URL`: `https://your-app-name.vercel.app` *(or your custom domain)*
   - `NEXTAUTH_SECRET`: (e.g. `dev-secret-kemis-artisan-pantry-hng15-lesson2` or a 32-character string)
   - `GOOGLE_CLIENT_ID`: `your-client-id.apps.googleusercontent.com`
   - `GOOGLE_CLIENT_SECRET`: `your-google-secret`
   - `DATABASE_URL`: `postgresql://postgres.[ref]:[password]@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true`
   - `DIRECT_URL`: `postgresql://postgres.[ref]:[password]@aws-1-eu-west-3.pooler.supabase.com:5432/postgres`
   - `MAILGUN_API_KEY`: `key-xxxxxxxxxxxxxxxxxxxxxxxx`
   - `MAILGUN_DOMAIN`: `sandboxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org`
   - `MAILGUN_HOST`: `api.mailgun.net`
   - `MAIL_FROM`: `Kemi's Artisan Pantry <orders@sandboxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org>`
   - *(Optional) `RESEND_API_KEY`: `re_xxxx...`*
6. Click **"Deploy"**!

---

### Step 4: Update Google Cloud Console for Production
Once Vercel gives you your live URL (e.g., `https://kemis-pantry.vercel.app`):
1. Go back to [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services** > **Credentials**.
2. Click on your **Web OAuth Client ID**.
3. Under **Authorized JavaScript origins**, click **+ Add URI** and add:
   - `https://your-app-name.vercel.app`
4. Under **Authorized redirect URIs**, click **+ Add URI** and add:
   - `https://your-app-name.vercel.app/api/auth/callback/google`
5. Click **Save**!

Your app is now 100% deployed and functional in production for HNG testing!
