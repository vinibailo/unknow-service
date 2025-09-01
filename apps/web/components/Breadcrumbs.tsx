"use client";

import Link from "next/link";

interface Crumb {
  href: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-text-secondary" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.href}>
          <Link href={item.href} className="hover:underline text-primary">
            {item.label}
          </Link>
          {i < items.length - 1 && <span className="mx-1">→</span>}
        </span>
      ))}
    </nav>
  );
}
