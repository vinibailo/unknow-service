"use client";

import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const checkout = async () => {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Support</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold">FREE</h2>
          <p className="mb-6 text-sm text-text-secondary">No sign-up needed</p>
          <Button disabled>Current</Button>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold">Supporter</h2>
          <p className="mb-2 text-sm text-text-secondary">Ad-free, no captcha, faster</p>
          <Button onClick={checkout}>Upgrade</Button>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6 text-center opacity-50">
          <h2 className="mb-4 text-xl font-semibold">Content Machine</h2>
          <p className="text-sm text-text-secondary">Coming soon</p>
        </div>
      </div>
    </div>
  );
}
