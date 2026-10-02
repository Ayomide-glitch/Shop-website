"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { ProductCard } from "@/components/ProductCard";
import { Search, Sparkles, ArrowRight, ShieldCheck, Heart, Award } from "lucide-react";

const CATEGORIES = [
  "All Provisions",
  "Pantry & Condiments",
  "Artisan Snacks",
  "Botanicals & Teas",
  "Apothecary & Body",
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Provisions");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Provisions" || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 border-b border-[#EADBCE] bg-[#F5EFEB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Story Intro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAECE5] border border-[#D48263]/40 text-[#AB593A] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Handcrafted in Small Batches
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E2822] leading-[1.15]">
                Authentic pantry provisions from{" "}
                <span className="text-[#2C4A3E] underline decoration-[#C26D4D] decoration-wavy decoration-2">
                  Auntie Kemi&apos;s
                </span>{" "}
                kitchen.
              </h1>

              <p className="text-base sm:text-lg text-[#71717A] max-w-xl leading-relaxed">
                Slow-roasted condiments, wood-fired crunchy groundnuts, wild wildflower honey, and raw whipped shea butter apothecary balms made the old-fashioned way.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-full bg-[#2C4A3E] hover:bg-[#C26D4D] text-[#FBF8F3] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Provisions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#our-story"
                  className="px-6 py-3.5 rounded-full border border-[#EADBCE] bg-white hover:bg-[#F5EFEB] text-[#1E2822] font-semibold text-sm transition-all"
                >
                  Read Our Story
                </a>
              </div>

              {/* Artisan Highlight Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EADBCE]">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3E] block">40+ Yrs</span>
                  <span className="text-xs text-[#71717A]">Heritage Recipe</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3E] block">100%</span>
                  <span className="text-xs text-[#71717A]">Clean Ingredients</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C4A3E] block">24hr</span>
                  <span className="text-xs text-[#71717A]">Courier Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/products/pepper-relish.jfif"
                  alt="Auntie Kemi Artisan Relish"
                  fill
                  priority
                  className="object-cover"
                />
                
                {/* Floating Artisan Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EADBCE] shadow-lg flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#FAECE5] flex items-center justify-center text-[#C26D4D] flex-shrink-0">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1E2822]">
                      Small-Batch Pepper Relish
                    </h4>
                    <p className="text-xs text-[#71717A]">
                      Slow-cooked with scotch bonnets &amp; palm oil
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EADBCE]">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#C26D4D] block mb-1">
              Curated Kitchen Goods
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E2822]">
              Explore Our Small-Batch Pantry
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search provisions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#EADBCE] rounded-full focus:outline-none focus:border-[#2C4A3E] w-full sm:w-56"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-4 text-xs sm:text-sm bg-white border border-[#EADBCE] rounded-full focus:outline-none focus:border-[#2C4A3E] text-[#1E2822]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div id="categories" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-[#2C4A3E] text-[#FBF8F3] shadow-sm"
                  : "bg-white text-[#71717A] border border-[#EADBCE] hover:text-[#1E2822] hover:bg-[#F5EFEB]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#EADBCE] p-8">
            <p className="font-serif text-xl text-[#1E2822] font-bold mb-2">No provisions found</p>
            <p className="text-sm text-[#71717A] mb-6">
              Try adjusting your search terms or clearing your category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Provisions");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-[#2C4A3E] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Auntie Kemi's Real Story Section */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C4A3E] rounded-3xl p-8 sm:p-14 text-[#FBF8F3] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C26D4D]">
                A Concrete Family Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                How a small iron pot in Ibadan became our family&apos;s pantry.
              </h2>
              <p className="text-sm sm:text-base text-[#E5ECE7] leading-relaxed">
                For over four decades, Auntie Kemi prepared her signature pepper relish and stone-roasted groundnuts for family gatherings and market days. Neighbors would line up with reusable glass jars just to carry home a fresh scoop.
              </p>
              <p className="text-sm sm:text-base text-[#E5ECE7] leading-relaxed">
                This website is her digital home — bringing her handcrafted pantry staples, unrefined shea butter, and sun-dried hibiscus botanicals to your doorstep with guaranteed freshness and care.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C26D4D]" />
                  <span className="text-xs sm:text-sm font-semibold text-white">Authentic Heritage Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C26D4D]" />
                  <span className="text-xs sm:text-sm font-semibold text-white">Directly from the Artisan</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#36594C] p-3 border-2 border-[#C26D4D]/50 shadow-2xl relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80"
                  alt="Auntie Kemi Groundnuts"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
