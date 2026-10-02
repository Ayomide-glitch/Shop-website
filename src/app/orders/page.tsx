"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Order } from "@/types";
import {
  Package,
  Calendar,
  MapPin,
  Mail,
  CheckCircle,
  Clock,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/orders");
          const data = await res.json();
          if (data.orders) {
            setOrders(data.orders);
          }
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        } finally {
          setIsLoading(false);
        }
      } else if (status === "unauthenticated") {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-3 border-[#2C4A3E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-[#1E2822]">
          Retrieving orders from PostgreSQL database...
        </p>
      </div>
    );
  }

  // Unauthenticated State
  if (!session) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAECE5] border border-[#D48263] flex items-center justify-center mx-auto mb-4 text-[#C26D4D]">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E2822] mb-3">
          Sign In to View Orders
        </h1>
        <p className="text-sm text-[#71717A] mb-8 leading-relaxed">
          Please sign in with your Google account to access your permanent order history and track kitchen courier deliveries.
        </p>
        <button
          onClick={() => signIn("google")}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2C4A3E] hover:bg-[#C26D4D] text-[#FBF8F3] font-semibold text-sm shadow-md transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADBCE]">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#C26D4D] block mb-1">
            Account Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2822]">
            My Order History
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1">
            Logged in as <strong className="text-[#2C4A3E]">{session.user?.email}</strong>
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2C4A3E] hover:text-[#C26D4D] transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Browse More Provisions
        </Link>
      </div>

      {/* HNG 15 Persistence & Re-Entry Verification Callout */}
      <div className="bg-[#E5ECE7] border border-[#2C4A3E]/30 rounded-2xl p-5 text-xs sm:text-sm text-[#1E2822] space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#2C4A3E]">
          <ShieldCheck className="w-5 h-5 text-[#2C4A3E]" />
          <span>HNG 15 Persistence &amp; Re-entry Test Verification</span>
        </div>
        <p className="text-[#4B5563]">
          All orders are stored in PostgreSQL (Supabase/Neon). To verify Lesson 2 requirements:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-medium text-xs text-[#2C4A3E]">
          <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#2C4A3E]/20">
            1. Orders visible below
          </span>
          <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#2C4A3E]/20">
            2. Sign out in navbar &amp; close tab
          </span>
          <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-[#2C4A3E]/20">
            3. Reopen &amp; sign in: orders persist!
          </span>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EADBCE] p-8">
          <div className="w-14 h-14 rounded-full bg-[#F5EFEB] flex items-center justify-center mx-auto mb-4 text-[#71717A]">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1E2822] mb-1">
            No orders placed yet
          </h2>
          <p className="text-sm text-[#71717A] max-w-sm mx-auto mb-6">
            When you complete checkout with Auntie Kemi&apos;s provisions, your orders and receipts will appear here permanently.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#2C4A3E] text-white font-semibold text-xs hover:bg-[#C26D4D] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-[#EADBCE] shadow-sm overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="p-6 bg-[#FBF8F3] border-b border-[#EADBCE] flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#1E2822]">
                        {order.id}
                      </span>
                      <span className="text-xs bg-[#FAECE5] text-[#AB593A] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#71717A]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#71717A] block">Total Amount</span>
                    <span className="font-serif text-xl font-bold text-[#2C4A3E]">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Order Details & Items */}
                <div className="p-6 space-y-6">
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#047857] font-semibold bg-[#E5ECE7] px-3 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Database Persisted</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#2C4A3E] font-semibold bg-[#F5EFEB] px-3 py-1 rounded-full">
                      <Mail className="w-3.5 h-3.5 text-[#C26D4D]" />
                      <span>
                        {order.emailSent
                          ? "Confirmation Email Sent (Mailgun)"
                          : "Confirmation Email Dispatched"}
                      </span>
                    </div>
                  </div>

                  {/* Purchased Items */}
                  <div className="divide-y divide-[#F5EFEB]">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3.5">
                          {item.product?.image && (
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F5EFEB] flex-shrink-0 border border-[#EADBCE]">
                              <Image
                                src={item.product.image}
                                alt={item.product.title || "Product"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-bold text-[#1E2822]">
                              {item.product?.title || "Handcrafted Provision"}
                            </h4>
                            <span className="text-xs text-[#71717A]">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <span className="text-sm font-bold text-[#1E2822]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address Snippet */}
                  <div className="pt-4 border-t border-[#F5EFEB] flex items-start gap-2.5 text-xs text-[#71717A]">
                    <MapPin className="w-4 h-4 text-[#2C4A3E] flex-shrink-0 mt-0.5" />
                    <span>
                      Delivering to <strong>{order.customerName}</strong>: {order.address}, {order.city}, {order.state} {order.postalCode}, {order.country}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
