import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INITIAL_PRODUCTS } from "@/lib/products-data";

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbProducts.length > 0) {
        return NextResponse.json({ products: dbProducts });
      }
    }
  } catch (err) {
    console.warn("[Products API] Fallback to initial artisan catalog:", err);
  }

  return NextResponse.json({ products: INITIAL_PRODUCTS });
}
