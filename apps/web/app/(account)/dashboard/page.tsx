import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-text-primary">Plan: {session.user.plan}</p>
      <p className="text-text-secondary">Usage: {session.user.usage}</p>
    </div>
  );
}
