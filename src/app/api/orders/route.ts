import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userEmail = session.user.email;

    try {
      const orders = await prisma.order.findMany({
        where: {
          OR: [
            ...(userId ? [{ userId }] : []),
            { customerEmail: userEmail },
          ],
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ orders });
    } catch (dbError: any) {
      console.warn("[Orders API] Database query error:", dbError?.message);
      return NextResponse.json({ orders: [] });
    }
  } catch (error: any) {
    console.error("[Orders API Error]:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
