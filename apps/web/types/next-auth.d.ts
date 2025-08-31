import type { DefaultSession } from "next-auth";
import { Plan } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: Plan;
      usage: number;
    } & DefaultSession["user"];
  }
}
