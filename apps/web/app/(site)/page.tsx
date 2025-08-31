"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ToolCard } from "@/components/ToolCard";
import { tools, type CategoryName } from "@/constants/tools";

const categories: CategoryName[] = ["PDF", "Image", "Video", "AI Write", "File"];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryName>("PDF");

  const filtered = tools.filter(
    (t) => t.category === active && t.title.toLowerCase().includes(query.toLowerCase())
  );

  const categoryData = categories.map((name) => ({
    name,
    count: tools.filter((t) => t.category === name).length
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Free Online Tools</h1>
        <p className="text-text-secondary">Handy utilities for everyday tasks.</p>
        <div className="mx-auto w-full max-w-2xl">
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>
      <CategoryTabs categories={categoryData} active={active} onChange={(c) => setActive(c as CategoryName)} />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} icon={tool.icon} title={tool.title} description={tool.description} />
        ))}
      </div>
    </div>
  );
}
