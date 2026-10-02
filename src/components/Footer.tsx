import React from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Truck, Sparkles, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2C4A3E] text-[#FBF8F3] border-t border-[#36594C] mt-24">
      {/* Value Badges Banner */}
      <div className="border-b border-[#36594C]/60 bg-[#223B31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#36594C] text-[#FBF8F3]">
                <Leaf className="w-5 h-5 text-[#C26D4D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Small-Batch</h4>
                <p className="text-xs text-[#E5ECE7] mt-0.5">Authentic recipes made with wholesome ingredients</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#36594C] text-[#FBF8F3]">
                <Truck className="w-5 h-5 text-[#C26D4D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Courier Dispatch</h4>
                <p className="text-xs text-[#E5ECE7] mt-0.5">Freshly packed and shipped right to your doorstep</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#36594C] text-[#FBF8F3]">
                <ShieldCheck className="w-5 h-5 text-[#C26D4D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Google OAuth 2.0</h4>
                <p className="text-xs text-[#E5ECE7] mt-0.5">Secure session & order history with Google Cloud</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#36594C] text-[#FBF8F3]">
                <Sparkles className="w-5 h-5 text-[#C26D4D]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Instant Confirmation</h4>
                <p className="text-xs text-[#E5ECE7] mt-0.5">Automated HTML email receipts via Mailgun</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C26D4D] text-[#FBF8F3] flex items-center justify-center font-serif font-bold text-xl">
                K
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF8F3]">
                Kemi&apos;s Artisan Pantry
              </span>
            </div>
            <p className="text-sm text-[#E5ECE7] leading-relaxed max-w-md">
              Handcrafted in Auntie Kemi&apos;s kitchen. We believe in unadulterated spices, stone-roasted treats, wholesome wild shea balms, and slow herbal infusions that taste like home.
            </p>
            <p className="text-xs text-[#E5ECE7]/80">
              Built as a real-world showcase for <strong>HNG 15 — Lesson 2 Individual Task</strong>.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#C26D4D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#E5ECE7]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Shop All Provisions
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Order History &amp; Re-entry
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Checkout Basket
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech & Integration Credits */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#C26D4D]">
              Lesson 2 Integrations
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E5ECE7]/90">
              <li>• PostgreSQL (Supabase / Neon)</li>
              <li>• Google Cloud OAuth 2.0</li>
              <li>• Mailgun Transactional API</li>
              <li>• Next.js 15 App Router</li>
              <li>• Persistent Cart Store</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#36594C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5ECE7]/70 gap-4">
          <p>© {new Date().getFullYear()} Kemi&apos;s Artisan Pantry &amp; Provisions. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#C26D4D] fill-current" /> for Auntie Kemi &amp; HNG 15
          </p>
        </div>
      </div>
    </footer>
  );
}
