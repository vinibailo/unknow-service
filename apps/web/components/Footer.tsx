"use client";

import Link from "next/link";
import { RetentionNote } from "./RetentionNote";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-text-secondary md:flex-row">
        <div className="flex gap-4">
          <Link href="/tools" className="hover:underline">
            Tools
          </Link>
          <Link href="/support" className="hover:underline">
            Support
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/your-data" className="hover:underline">
            Your Data
          </Link>
        </div>
        <RetentionNote />
      </div>
    </footer>
  );
}
