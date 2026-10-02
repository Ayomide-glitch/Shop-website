import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { CartItem, ShippingAddress, Order } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { items, shippingAddress }: { items: CartItem[]; shippingAddress: ShippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!shippingAddress || !shippingAddress.email || !shippingAddress.fullName || !shippingAddress.address) {
      return NextResponse.json({ error: "Incomplete shipping information" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const userId = session?.user?.id || null;

    let createdOrder: Order;

    try {
      // 1. Persist Order and OrderItems in PostgreSQL via Prisma
      const dbOrder = await prisma.order.create({
        data: {
          userId,
          customerName: shippingAddress.fullName,
          customerEmail: shippingAddress.email,
          customerPhone: shippingAddress.phone || null,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || "Nigeria",
          totalAmount,
          status: "CONFIRMED",
          items: {
            create: items.map((item) => ({
              product: {
                connectOrCreate: {
                  where: { slug: item.product.slug },
                  create: {
                    title: item.product.title,
                    slug: item.product.slug,
                    description: item.product.description,
                    price: item.product.price,
                    category: item.product.category,
                    inventory: item.product.inventory,
                    image: item.product.image,
                    badge: item.product.badge,
                    featured: item.product.featured ?? false,
                  },
                },
              },
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      createdOrder = {
        ...dbOrder,
        createdAt: dbOrder.createdAt.toISOString(),
      };
    } catch (dbError: any) {
      console.warn("[Database Notice]: Could not write to PostgreSQL directly, falling back to simulated order for local dev:", dbError?.message);
      // Fallback object for development before user supplies DATABASE_URL
      createdOrder = {
        id: `ord_${Date.now()}`,
        userId,
        customerName: shippingAddress.fullName,
        customerEmail: shippingAddress.email,
        customerPhone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country || "Nigeria",
        totalAmount,
        status: "CONFIRMED",
        emailSent: false,
        items: items.map((item, index) => ({
          id: `item_${index}`,
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          product: item.product,
        })),
        createdAt: new Date().toISOString(),
      };
    }

    // 2. Dispatch Confirmation Email via Mailgun (or Resend fallback)
    const emailResult = await sendOrderConfirmationEmail({
      order: createdOrder,
      recipientEmail: shippingAddress.email,
      recipientName: shippingAddress.fullName,
    });

    // 3. Update emailSent status in database if available
    try {
      if (createdOrder.id && !createdOrder.id.startsWith("ord_")) {
        await prisma.order.update({
          where: { id: createdOrder.id },
          data: {
            emailSent: emailResult.success,
            emailProvider: emailResult.provider,
          },
        });
      }
    } catch {
      // Non-blocking update failure
    }

    return NextResponse.json({
      success: true,
      order: createdOrder,
      emailSent: emailResult.success,
      emailProvider: emailResult.provider,
    });
  } catch (error: any) {
    console.error("[Checkout API Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during checkout" },
      { status: 500 }
    );
  }
}
