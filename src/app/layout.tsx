import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kemi's Artisan Pantry & Provisions | Small-Batch Kitchen",
  description:
    "Handcrafted food seasonings, stone-roasted snacks, raw wild shea butter, and herbal infusions made with love in Auntie Kemi's kitchen. HNG 15 Lesson 2 MVP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-[#FBF8F3] text-[#1E2822] antialiased flex flex-col min-h-screen"
      >
        <Providers>
          <Navbar />
          <CartDrawer />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
