"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ToolCard } from "@/components/ToolCard";
import { tools, type CategoryName } from "@/constants/tools";

const categories: CategoryName[] = [
  "PDF",
  "Image",
  "Video",
  "File Conversion",
  "AI Write",
];

const slugs: Record<CategoryName, string> = {
  PDF: "pdf",
  Image: "image",
  Video: "video",
  "File Conversion": "file_conversion",
  "AI Write": "write",
};

interface ToolsCategoryPageProps {
  initial: CategoryName;
  description: string;
}

export function ToolsCategoryPage({ initial, description }: ToolsCategoryPageProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(initial);

  const filtered = tools.filter(
    (t) =>
      (active === "All" || t.category === active) &&
      t.title.toLowerCase().includes(query.toLowerCase())
  );

  const categoryData = [
    { name: "All", count: tools.length },
    ...categories.map((name) => ({
      name,
      count: tools.filter((t) => t.category === name).length,
    })),
  ];

  function handleChange(name: string) {
    setActive(name);
    if (name === "All") {
      router.push("/tools");
    } else {
      router.push(`/tools/${slugs[name as CategoryName]}`);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-6">
      <p className="text-center text-text-secondary">{description}</p>
      <div className="mx-auto w-full max-w-2xl">
        <Input
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <CategoryTabs categories={categoryData} active={active} onChange={handleChange} />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            premium={tool.premium}
          />
        ))}
      </div>
    </div>
  );
}
