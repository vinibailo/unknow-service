import { type LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ToolCard({ icon: Icon, title, description }: ToolCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
      <Icon className="mb-2 h-6 w-6" />
      <h3 className="font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}
