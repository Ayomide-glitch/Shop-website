"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import { useCartStore } from "@/store/use-cart-store";
import { ShippingAddress } from "@/types";
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  Lock,
  Mail,
  User,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shippingFee = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
  const grandTotal = subtotal + shippingFee;

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lagos",
    state: "Lagos State",
    postalCode: "100001",
    country: "Nigeria",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-fill user information if signed in with Google
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || session.user?.name || "",
        email: prev.email || session.user?.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your basket is empty. Please add items before checking out.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address) {
      toast.error("Please fill in all required delivery details.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Saving order to PostgreSQL & dispatching confirmation email...");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process order");
      }

      toast.success("Order confirmed! Confirmation email dispatched.", { id: toastId });
      clearCart();
      router.push(`/order-success/${data.order.id}`);
    } catch (err: any) {
      console.error("[Checkout Submission Error]:", err);
      toast.error(err?.message || "There was an error placing your order. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-3 border-[#2C4A3E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs font-semibold text-[#71717A]">
          Loading your basket &amp; kitchen courier details...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAECE5] border border-[#D48263] flex items-center justify-center mx-auto mb-4 text-[#C26D4D]">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E2822] mb-2">
          Your Basket is Empty
        </h1>
        <p className="text-sm text-[#71717A] mb-8">
          You haven&apos;t added any small-batch provisions to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2C4A3E] text-white font-semibold text-sm hover:bg-[#C26D4D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Artisan Provisions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] hover:text-[#2C4A3E] transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Storefront
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2822]">
          Checkout &amp; Kitchen Courier
        </h1>
        <p className="text-xs sm:text-sm text-[#71717A] mt-1">
          Complete your delivery information. Your order will be stored in PostgreSQL and a confirmation receipt sent via Mailgun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
        
        {/* Left Column: Delivery & Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Google Auth Prompt Banner (if guest) */}
          {!session && (
            <div className="p-4 bg-white rounded-2xl border border-[#EADBCE] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#2C4A3E]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E2822]">
                    Have a Google Account?
                  </h4>
                  <p className="text-xs text-[#71717A]">
                    Sign in to track this order in your permanent history.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="text-xs font-semibold text-[#2C4A3E] hover:text-[#C26D4D] border border-[#2C4A3E] px-4 py-2 rounded-full whitespace-nowrap transition-colors"
              >
                Sign In with Google
              </button>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADBCE] shadow-sm space-y-6">
            
            {/* Contact Details Section */}
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C4A3E] flex items-center gap-2 mb-4 pb-2 border-b border-[#F5EFEB]">
                <Mail className="w-4 h-4 text-[#C26D4D]" />
                Contact Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                    Email Address * (For Confirmation)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 801 234 5678"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C4A3E] flex items-center gap-2 mb-4 pb-2 border-b border-[#F5EFEB]">
                <MapPin className="w-4 h-4 text-[#C26D4D]" />
                Kitchen Delivery Destination
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2822] mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#EADBCE] bg-[#FBF8F3]/60 focus:bg-white focus:outline-none focus:border-[#2C4A3E] transition-all text-[#1E2822]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-[#F5EFEB]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#C26D4D] hover:bg-[#AB593A] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order &amp; Sending Mail...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Place Order (${grandTotal.toFixed(2)})
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-[#71717A] mt-3">
                🔒 Stored securely in PostgreSQL database. Triggers immediate Mailgun confirmation email.
              </p>
            </div>

          </form>

        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-[#EADBCE] p-6 sm:p-8 shadow-sm sticky top-28 space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#1E2822] pb-3 border-b border-[#F5EFEB]">
              Order Summary
            </h2>

            {/* Purchased Items List */}
            <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5EFEB] flex-shrink-0 border border-[#EADBCE]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#1E2822] truncate">
                      {product.title}
                    </h4>
                    <span className="text-[11px] text-[#71717A]">
                      Qty: {quantity} × ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1E2822]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#F5EFEB] text-sm">
              <div className="flex justify-between text-[#71717A]">
                <span>Provisions Subtotal</span>
                <span className="font-medium text-[#1E2822]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Kitchen Courier Shipping</span>
                <span className="font-medium text-[#047857]">
                  {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Estimated Sales Tax</span>
                <span className="font-medium text-[#1E2822]">$0.00</span>
              </div>

              <div className="flex justify-between items-center text-lg font-serif font-bold text-[#2C4A3E] pt-3 border-t border-[#EADBCE]">
                <span>Total Due</span>
                <span className="text-[#C26D4D]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Micro Guarantees */}
            <div className="bg-[#FBF8F3] p-4 rounded-xl border border-[#EADBCE] text-xs text-[#71717A] space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C26D4D]" />
                <span>Packaged fresh from Auntie Kemi&apos;s small batch.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C4A3E]" />
                <span>Orders persist across page closes &amp; re-entry.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
