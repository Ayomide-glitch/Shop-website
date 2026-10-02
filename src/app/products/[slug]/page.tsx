"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { useCartStore } from "@/store/use-cart-store";
import { ArrowLeft, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.title} to your basket!`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#71717A] hover:text-[#2C4A3E] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Pantry Provisions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Product Imagery */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F5EFEB] border border-[#EADBCE] shadow-sm">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#2C4A3E] text-[#FBF8F3] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#C26D4D] block mb-1">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2822]">
              {product.title}
            </h1>
            <p className="font-serif text-2xl font-bold text-[#2C4A3E] mt-3">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="prose text-sm sm:text-base text-[#4B5563] leading-relaxed border-y border-[#EADBCE] py-6">
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector and Action Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#EADBCE] rounded-xl bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-[#71717A] hover:text-[#C26D4D] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm text-[#1E2822]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-[#71717A] hover:text-[#2C4A3E] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl border border-[#2C4A3E] text-[#2C4A3E] hover:bg-[#2C4A3E] hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Basket
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#C26D4D] hover:bg-[#AB593A] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Artisan Guarantees */}
          <div className="bg-[#F5EFEB] rounded-2xl p-5 border border-[#EADBCE] space-y-3">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1E2822]">
              <Truck className="w-4 h-4 text-[#2C4A3E] flex-shrink-0" />
              <span>Ships in temperature-monitored courier packaging</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1E2822]">
              <ShieldCheck className="w-4 h-4 text-[#2C4A3E] flex-shrink-0" />
              <span>Small-batch freshness guarantee from Auntie Kemi</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1E2822]">
              <RefreshCw className="w-4 h-4 text-[#2C4A3E] flex-shrink-0" />
              <span>Stored in PostgreSQL with instant Mailgun email receipt</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
