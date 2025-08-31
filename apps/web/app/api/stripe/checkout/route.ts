import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_SUPPORTER_PRICE_ID || "", quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/(account)/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/(site)/support`,
    customer_email: session.user.email || undefined,
    metadata: { userId: session.user.id },
  });

  return NextResponse.json({ url: checkout.url });
}
