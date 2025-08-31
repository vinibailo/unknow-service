import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { users } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const record = users.get(session.user.id);
  if (!record || !record.stripeCustomerId)
    return NextResponse.json({ error: "No customer" }, { status: 400 });

  const portal = await stripe.billingPortal.sessions.create({
    customer: record.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/(account)/dashboard`,
  });

  return NextResponse.json({ url: portal.url });
}
