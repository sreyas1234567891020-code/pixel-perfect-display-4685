import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendDirection } from "@/data/student";
import { trendLabel } from "@/data/student";

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "primary" | "attention";
}) {
  return (
    <div
      className={cn(
        "surface p-4",
        tone === "primary" && "bg-primary text-primary-foreground border-primary",
        tone === "attention" && "border-attention/50 bg-attention/10",
      )}
    >
      <p
        className={cn(
          "text-xs font-medium uppercase tracking-wide",
          tone === "primary" ? "text-primary-foreground/75" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <p className="stat-value mt-2">{value}</p>
      {hint ? (
        <p
          className={cn(
            "mt-1 text-xs",
            tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TrendPill({ trend, className }: { trend: TrendDirection; className?: string }) {
  const Icon =
    trend === "improving" ? ArrowUpRight : trend === "declining" ? ArrowDownRight : ArrowRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        trend === "improving" && "bg-success/15 text-success",
        trend === "declining" && "bg-attention/20 text-attention-foreground",
        trend === "stable" && "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {trendLabel(trend)}
    </span>
  );
}

export function TargetBar({
  current,
  target,
  className,
}: {
  current: number;
  target: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  const reached = current >= target;
  return (
    <div className={className}>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all", reached ? "bg-success" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {reached ? "Goal achieved." : `${current}% of ${target}% target`}
      </p>
    </div>
  );
}

export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
    </div>
  );
}
