import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendDirection } from "@/data/student";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="surface p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      {hint && (
        <p className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TrendPill({
  trend,
}: {
  trend: TrendDirection;
}) {
  if (trend === "improving") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
        <ArrowUpRight className="size-3.5" />
        Improving
      </span>
    );
  }

  if (trend === "declining") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700">
        <ArrowDownRight className="size-3.5" />
        Needs work
      </span>
    );
  }

  return (
    <span className="text-xs font-medium text-muted-foreground">
      Stable
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
  const width = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className={className}>
      <div className="h-2 w-full rounded bg-secondary">
        <div
          className="h-full rounded bg-primary"
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        {current}% / {target}%
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
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold md:text-3xl">
        {title}
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        {intro}
      </p>
    </div>
  );
}
