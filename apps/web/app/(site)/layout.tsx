"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="font-bold text-xl text-text-primary">Utilify</Link>
          <div className="hidden flex-1 px-4 md:block">
            <Input placeholder="Search tools..." className="mx-auto max-w-md" />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost">Login</Button>
            <Button>Upgrade</Button>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {open && (
          <div className="space-y-2 border-t border-border bg-surface p-4 md:hidden">
            <Input placeholder="Search tools..." />
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1">Login</Button>
              <Button className="flex-1">Upgrade</Button>
            </div>
          </div>
        )}
      </header>
      <main>
        <AdPlaceholder />
        {children}
      </main>
      <Footer />
    </div>
  );
}
