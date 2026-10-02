"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/use-cart-store";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF8F3] border-l border-[#EADBCE] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#EADBCE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#2C4A3E]" />
              <h2 className="font-serif text-xl font-bold text-[#1E2822]">
                Your Pantry Basket
              </h2>
              <span className="text-xs bg-[#F5EFEB] text-[#2C4A3E] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 text-[#71717A] hover:text-[#1E2822] hover:bg-[#F5EFEB] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F5EFEB] px-6 py-3 border-b border-[#EADBCE]">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs font-semibold text-[#047857] flex items-center gap-1.5">
                <span>🎉</span> You&apos;ve unlocked Free Kitchen Courier Shipping!
              </p>
            ) : (
              <div>
                <p className="text-xs text-[#1E2822] mb-1.5">
                  Add <strong className="text-[#C26D4D]">${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for <strong className="text-[#2C4A3E]">Free Shipping</strong>
                </p>
                <div className="w-full bg-[#EADBCE] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2C4A3E] h-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F5EFEB] border border-[#EADBCE] flex items-center justify-center mx-auto mb-4 text-[#71717A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E2822] mb-1">
                  Your basket is empty
                </h3>
                <p className="text-sm text-[#71717A] mb-6 max-w-xs mx-auto">
                  Explore Auntie Kemi&apos;s small-batch seasonings, roasted snacks, and herbal infusions.
                </p>
                <button
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C4A3E] hover:text-[#C26D4D] transition-colors"
                >
                  Browse Provisions <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#EADBCE] shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5EFEB]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1E2822] truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-[#71717A] mt-0.5">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#EADBCE] rounded-lg bg-[#FBF8F3]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:text-[#C26D4D] text-[#71717A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#1E2822] px-2.5">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:text-[#2C4A3E] text-[#71717A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item & Delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#1E2822]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[#71717A] hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EADBCE] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-[#71717A]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1E2822]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#71717A]">
                  <span>Estimated Courier Shipping</span>
                  <span className="font-semibold text-[#047857]">
                    {subtotal >= freeShippingThreshold ? "FREE" : "$4.99"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#2C4A3E] pt-2 border-t border-[#F5EFEB]">
                  <span>Total</span>
                  <span className="text-[#C26D4D]">
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C26D4D] hover:bg-[#AB593A] text-[#FBF8F3] font-semibold text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={closeDrawer}
                className="w-full text-center text-xs text-[#71717A] hover:text-[#1E2822] transition-colors"
              >
                or Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
