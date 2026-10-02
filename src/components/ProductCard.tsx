"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@/types";
import { useCartStore } from "@/store/use-cart-store";
import { Plus, ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`Added ${product.title} to your basket!`, {
      description: "Item persisted to your session.",
      duration: 2500,
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Product Image Container */}
      <Link href={`/products/${product.slug}`} className="relative h-64 w-full bg-[#F5EFEB] overflow-hidden block">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#2C4A3E] text-[#FBF8F3] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Quick Add Button Overlay */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-[#C26D4D] text-[#1E2822] hover:text-white p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0"
          aria-label={`Add ${product.title} to basket`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#71717A] block mb-1">
            {product.category}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-[#1E2822] group-hover:text-[#2C4A3E] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-[#71717A] line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-[#F5EFEB] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#71717A] block">Small-Batch Price</span>
            <span className="font-serif text-lg font-bold text-[#2C4A3E]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#C26D4D] hover:text-[#AB593A] bg-[#FAECE5] hover:bg-[#F5EFEB] px-3.5 py-2 rounded-full transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
