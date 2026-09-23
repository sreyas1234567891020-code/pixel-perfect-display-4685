import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  attendanceSummary,
  attendancePercentage,
  monthlyAttendance,
  attendanceMonth,
} from "@/data/student";
import { PageHeader, SectionTitle, StatCard } from "@/components/student/bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "My Attendance — Assisi Vidyaniketan Student Dashboard" },
      {
        name: "description",
        content: "Daily attendance calendar, monthly trend and the attendance target to maintain.",
      },
      { property: "og:title", content: "My Attendance — Assisi Vidyaniketan Student Dashboard" },
      {
        property: "og:description",
        content: "Track days present, absent and late, and see your monthly attendance trend.",
      },
    ],
  }),
  component: AttendancePage,
});

const statusStyles: Record<string, string> = {
  present: "bg-success/15 text-success",
  absent: "bg-destructive/12 text-destructive",
  late: "bg-attention/25 text-attention-foreground",
  holiday: "bg-muted text-muted-foreground",
};

function AttendancePage() {
  const belowTarget = attendancePercentage < attendanceSummary.recommendedTarget;

  return (
    <div>
      <PageHeader
        title="My attendance"
        intro={`Recorded across ${attendanceSummary.totalWorkingDays} working days this year.`}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Attendance"
          value={`${attendancePercentage}%`}
          hint={`Target ${attendanceSummary.recommendedTarget}%+`}
          tone="primary"
        />
        <StatCard label="Days present" value={attendanceSummary.present} />
        <StatCard label="Days absent" value={attendanceSummary.absent} />
        <StatCard label="Days late" value={attendanceSummary.late} />
      </div>

      {belowTarget ? (
        <div className="mt-3 rounded-xl border border-attention/50 bg-attention/10 p-4 text-sm">
          Your attendance is currently below the school target. Maintaining regular attendance can
          help you stay consistent with your coursework.
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-success/40 bg-success/10 p-4 text-sm">
          You are meeting the recommended attendance of {attendanceSummary.recommendedTarget}%. Keep
          it steady.
        </div>
      )}

      <div className="mt-6 surface p-4">
        <SectionTitle title={attendanceMonth.label} description="Day-by-day record." />
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="py-1 font-semibold text-muted-foreground">
              {d}
            </div>
          ))}
          {Array.from({ length: attendanceMonth.firstWeekdayOffset }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {attendanceMonth.days.map((day, i) => (
            <div
              key={day.date}
              title={`${i + 1} — ${day.status}`}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg font-medium",
                statusStyles[day.status],
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {[
            ["Present", "bg-success/15"],
            ["Absent", "bg-destructive/12"],
            ["Late", "bg-attention/25"],
            ["Holiday", "bg-muted"],
          ].map(([label, cls]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span className={cn("size-3 rounded", cls)} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 surface p-4">
        <SectionTitle title="Monthly attendance" description="How each month compares." />
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyAttendance} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[70, 100]}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--color-secondary)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, "Attendance"]}
              />
              <Bar dataKey="percentage" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
