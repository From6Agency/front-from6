import type { LucideIcon } from "lucide-react";
import { T } from "@/components/Bilingual";

export function ServiceCard({
  icon: Icon,
  title,
  titleFr,
  description,
  descriptionFr,
  index,
}: {
  icon: LucideIcon;
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  index?: number;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-7 card-shadow hover-lift hover:border-primary/30">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10 group-hover:text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {typeof index === "number" && (
          <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="mb-2 text-xl font-medium">
        <T en={title} fr={titleFr || title} />
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        <T en={description} fr={descriptionFr || description} />
      </p>
    </div>
  );
}
