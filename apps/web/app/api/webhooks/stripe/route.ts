import { stripe } from "@/lib/stripe";
import { users } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    if (userId) {
      users.set(userId, {
        plan: "SUPPORTER",
        usage: 0,
        stripeCustomerId: session.customer as string,
        subscriptionStatus: "active",
      });
    }
  } else if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;
    for (const [id, record] of users.entries()) {
      if (record.stripeCustomerId === sub.customer) {
        record.subscriptionStatus = sub.status;
        record.plan = sub.status === "active" ? "SUPPORTER" : "FREE";
      }
    }
  }

  return new Response(null, { status: 200 });
}
