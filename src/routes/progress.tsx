import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  overallAssessments,
  overallTrend,
  subjects,
  subjectCurrent,
  subjectPrevious,
  trendOf,
  currentOverall,
  average,
} from "@/data/student";
import { PageHeader, SectionTitle, TrendPill } from "@/components/student/bits";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Assisi Vidyaniketan Student Dashboard" },
      {
        name: "description",
        content: "Assessment-by-assessment performance trend and subject-wise comparison.",
      },
      { property: "og:title", content: "My Progress — Assisi Vidyaniketan Student Dashboard" },
      {
        property: "og:description",
        content: "See how your marks have moved across assessments and which subjects need focus.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const data = overallAssessments.map((a) => ({ name: a.name, percentage: a.percentage }));
  const avg = average(overallAssessments.map((a) => a.percentage));

  return (
    <div>
      <PageHeader
        title="How am I progressing?"
        intro="Your performance across every assessment this academic year."
      />

      <div className="surface p-4">
        <SectionTitle
          title="Academic trend"
          description={`Average ${avg}% · latest ${currentOverall}%`}
          action={<TrendPill trend={overallTrend} />}
        />
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[50, 100]}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, "Score"]}
              />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--color-primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle
          title="Subject-wise performance"
          description="Tap a subject for the full picture."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {subjects.map((s) => {
            const current = subjectCurrent(s);
            const previous = subjectPrevious(s);
            const diff = current - previous;
            return (
              <Link
                key={s.id}
                to="/subject/$subjectId"
                params={{ subjectId: s.id }}
                className="surface p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.teacher}</p>
                  </div>
                  <TrendPill trend={trendOf(s.history)} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="font-semibold">{current}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-semibold">
                      {previous}%{" "}
                      <span className="text-xs text-muted-foreground">
                        ({diff >= 0 ? "+" : ""}
                        {diff})
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="font-semibold">{s.target}%</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
