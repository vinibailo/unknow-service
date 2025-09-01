import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type Plan = "FREE" | "PRO";

export interface UserRecord {
  plan: Plan;
  usage: number;
  stripeCustomerId?: string;
}

export const users = new Map<string, UserRecord>();
