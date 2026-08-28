import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 card-shadow hover-lift">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5" />
        </div>
        {typeof index === "number" && (
          <span className="text-sm font-medium text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
