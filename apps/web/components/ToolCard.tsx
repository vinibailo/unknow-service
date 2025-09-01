import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { PremiumBadge } from "./PremiumBadge";

interface ToolCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  premium?: boolean;
}

export function ToolCard({ id, icon: Icon, title, description, premium }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${id}`}
      className="block rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center">
        <Icon className="h-6 w-6" />
        {premium && <PremiumBadge />}
      </div>
      <h3 className="font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </Link>
  );
}
