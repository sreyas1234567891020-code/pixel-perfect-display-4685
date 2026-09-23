import { Link } from "@tanstack/react-router";
import {
  Home,
  TrendingUp,
  CalendarCheck,
  BookOpen,
  ListChecks,
  Target,
} from "lucide-react";
import { student } from "@/data/student";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/marks", label: "Marks", icon: BookOpen },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/goals", label: "Goals", icon: Target },
] as const;

export function TopBar() {
  const initials = student.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{student.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {student.className} · {student.school}
          </p>
        </div>
      </div>
      <nav className="mx-auto hidden max-w-5xl gap-1 px-2 pb-2 md:flex">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-5xl">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] text-muted-foreground transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
