"use client";

import React, { use } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, Package, ArrowRight, Home } from "lucide-react";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      {/* Celebration Icon */}
      <div className="w-20 h-20 rounded-full bg-[#E5ECE7] border-2 border-[#2C4A3E] flex items-center justify-center mx-auto mb-6 text-[#2C4A3E] shadow-sm animate-in zoom-in duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Headline */}
      <span className="text-xs uppercase tracking-widest font-bold text-[#C26D4D] block mb-2">
        Order Successfully Placed
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2822] mb-3">
        Thank you for your order!
      </h1>
      <p className="text-sm sm:text-base text-[#71717A] max-w-lg mx-auto mb-8 leading-relaxed">
        Auntie Kemi and our kitchen team have received your order and are packing your handcrafted provisions for dispatch.
      </p>

      {/* Confirmation Badge Box */}
      <div className="bg-white rounded-3xl border border-[#EADBCE] p-6 sm:p-8 shadow-sm text-left mb-8 max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#F5EFEB]">
          <div>
            <span className="text-xs text-[#71717A] block">Order Reference:</span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#2C4A3E]">
              {id}
            </span>
          </div>
          <span className="text-xs bg-[#FAECE5] text-[#AB593A] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Confirmed
          </span>
        </div>

        {/* Mailgun Confirmation Notice */}
        <div className="flex items-start gap-3.5 bg-[#FBF8F3] p-4 rounded-2xl border border-[#EADBCE]">
          <div className="p-2 rounded-xl bg-[#2C4A3E] text-white flex-shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#1E2822]">
              Confirmation Email Dispatched
            </h4>
            <p className="text-xs text-[#71717A] mt-0.5 leading-relaxed">
              A nicely formatted HTML receipt with your full line items and delivery address was generated and sent via Mailgun.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 bg-[#FBF8F3] p-4 rounded-2xl border border-[#EADBCE]">
          <div className="p-2 rounded-xl bg-[#C26D4D] text-white flex-shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#1E2822]">
              Order Persisted to PostgreSQL
            </h4>
            <p className="text-xs text-[#71717A] mt-0.5 leading-relaxed">
              Your order is permanently stored in Supabase/Neon. You can sign out, close the browser, return anytime, and see it in your order history.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/orders"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#2C4A3E] hover:bg-[#C26D4D] text-[#FBF8F3] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>View in Order History</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#EADBCE] bg-white hover:bg-[#F5EFEB] text-[#1E2822] font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
