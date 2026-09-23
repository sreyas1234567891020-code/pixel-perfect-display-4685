import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import {
  subjects,
  average,
  trendOf,
  projection,
  tasks,
  subjectCurrent,
  subjectPrevious,
  gradeFor,
} from "@/data/student";
import { PageHeader, SectionTitle, TargetBar, TrendPill } from "@/components/student/bits";

export const Route = createFileRoute("/subject/$subjectId")({
  loader: ({ params }) => {
    const subject = subjects.find((s) => s.id === params.subjectId);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Subject unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.subject.name} — My Subject Progress`;
    const description = `Marks, average, trend, feedback and target for ${loaderData.subject.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();
  const current = subjectCurrent(subject);
  const previous = subjectPrevious(subject);
  const avg = average(subject.history.map((h) => h.percentage));
  const range = projection(subject.history);
  const related = tasks.filter((t) => t.subject === subject.name);

  return (
    <div>
      <Link
        to="/progress"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to progress
      </Link>

      <PageHeader title={subject.name} intro={`Class teacher for this subject: ${subject.teacher}`} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Current", `${current}%`, `Grade ${gradeFor(current)}`],
          ["Previous", `${previous}%`, "last assessment"],
          ["Average", `${avg}%`, "this year"],
          ["Highest", `${subject.highest}%`, "best score"],
        ].map(([label, value, hint]) => (
          <div key={label} className="surface p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="stat-value mt-2">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 surface p-4">
        <SectionTitle
          title="Recent trend"
          description={`Estimated next assessment: ${range.low}–${range.high}%`}
          action={<TrendPill trend={trendOf(subject.history)} />}
        />
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={subject.history} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
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

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="surface p-4">
          <SectionTitle title="Suggested target" />
          <p className="stat-value">{subject.target}%</p>
          <TargetBar className="mt-3" current={current} target={subject.target} />
          <p className="mt-3 text-sm text-muted-foreground">
            Next assessment: {subject.nextAssessment.name} on {subject.nextAssessment.date}.
          </p>
        </div>

        <div className="surface p-4">
          <SectionTitle title="Teacher feedback" />
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {subject.feedback.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3 surface p-4">
        <SectionTitle title="Assignments and projects" />
        {related.length ? (
          <ul className="divide-y divide-border">
            {related.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.type} · due {t.due}
                  </p>
                </div>
                <span
                  className={
                    t.status === "pending"
                      ? "rounded-full bg-attention/20 px-2.5 py-1 text-xs font-semibold text-attention-foreground"
                      : "rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success"
                  }
                >
                  {t.status === "pending" ? "Pending" : "Submitted"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nothing assigned in this subject right now.</p>
        )}
      </div>
    </div>
  );
}
