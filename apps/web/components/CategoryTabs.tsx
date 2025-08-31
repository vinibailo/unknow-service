import { cn } from "@/lib/utils";

export interface Category {
  name: string;
  count: number;
}

interface CategoryTabsProps {
  categories: Category[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onChange(cat.name)}
          className={cn(
            "rounded-full border px-4 py-1 text-sm",
            active === cat.name
              ? "bg-primary text-white"
              : "bg-surface text-text-secondary"
          )}
        >
          {cat.name} <span className="ml-1 text-xs">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}
