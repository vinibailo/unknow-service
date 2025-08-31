export type Plan = "FREE" | "SUPPORTER";

export interface UserRecord {
  plan: Plan;
  usage: number;
  stripeCustomerId?: string;
  subscriptionStatus?: string;
}

// simple in-memory store for demo purposes
export const users = new Map<string, UserRecord>();
