import { Link } from "@tanstack/react-router";
import {
  Home,
  TrendingUp,
  CalendarCheck,
  BookOpen,
  ListChecks,
} from "lucide-react";
import { student } from "@/data/student";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/marks", label: "Marks", icon: BookOpen },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
] as const;

export function TopBar() {
  const initials = student.name
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {initials}
        </div>

        <div>
          <p className="text-sm font-semibold">
            {student.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {student.className}
          </p>
        </div>
      </div>

      <nav className="mx-auto hidden max-w-5xl gap-1 px-4 pb-2 md:flex">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{
              className:
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-secondary text-foreground font-medium",
            }}
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
    <nav className="fixed inset-x-0 bottom-0 border-t bg-white md:hidden">
      <div className="mx-auto flex max-w-5xl">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] text-muted-foreground"
            activeProps={{
              className:
                "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] text-primary font-semibold",
            }}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
