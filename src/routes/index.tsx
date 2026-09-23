import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ClipboardList, ArrowRight } from "lucide-react";
import {
  student,
  currentOverall,
  overallTrend,
  overallTarget,
  attendancePercentage,
  attendanceSummary,
  pendingTasks,
  exams,
  overallAssessments,
  subjects,
  subjectCurrent,
  subjectPrevious,
  trendOf,
  gradeFor,
} from "@/data/student";
import { StatCard, TrendPill, TargetBar, SectionTitle, PageHeader } from "@/components/student/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Assisi Vidyaniketan Student Progress" },
      {
        name: "description",
        content:
          "Where am I now, how am I progressing, what do I need to complete and what can I reach next.",
      },
      { property: "og:title", content: "My Dashboard — Assisi Vidyaniketan Student Progress" },
      {
        property: "og:description",
        content: "Your performance, attendance, pending work and academic target in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const recent = overallAssessments[overallAssessments.length - 1]!;
  const nextExam = exams[0]!;
  const needsAttention = subjects.filter((s) => trendOf(s.history) === "declining");

  return (
    <div>
      <PageHeader
        title={`Good to see you, ${student.name.split(" ")[0]}`}
        intro={`${student.className} · Academic year ${student.academicYear}`}
      />

      <SectionTitle title="My current status" description="Where am I right now?" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Overall performance"
          value={`${currentOverall}%`}
          hint={`Grade ${gradeFor(currentOverall)}`}
          tone="primary"
        />
        <StatCard
          label="Attendance"
          value={`${attendancePercentage}%`}
          hint={`Recommended ${attendanceSummary.recommendedTarget}%+`}
        />
        <StatCard
          label="Pending work"
          value={pendingTasks.length}
          hint={pendingTasks.length === 1 ? "item to submit" : "items to submit"}
        />
        <StatCard
          label="Recent exam"
          value={`${recent.percentage}%`}
          hint={`${recent.name}, ${recent.date}`}
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="surface p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Current trend
          </p>
          <div className="mt-2 flex items-center gap-3">
            <TrendPill trend={overallTrend} />
            <span className="text-sm text-muted-foreground">
              based on your last {overallAssessments.length} assessments
            </span>
          </div>
        </div>
        <div className="surface p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Current target
          </p>
          <p className="stat-value mt-2">{overallTarget}%</p>
          <TargetBar className="mt-3" current={currentOverall} target={overallTarget} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="surface p-4">
          <SectionTitle title="What I need to do" description="Pending work and next exam" />
          <ul className="space-y-3">
            {pendingTasks.map((t) => (
              <li key={t.id} className="flex items-start gap-3">
                <ClipboardList className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.subject} · {t.type} · due {t.due}
                  </p>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Next exam: {nextExam.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {nextExam.date} · {nextExam.syllabus}
                </p>
              </div>
            </li>
          </ul>
          <Link
            to="/tasks"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all tasks and exams <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="surface p-4">
          <SectionTitle
            title="Subjects to focus on"
            description="Where extra practice would help most"
          />
          {needsAttention.length ? (
            <ul className="space-y-3">
              {needsAttention.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/subject/$subjectId"
                    params={{ subjectId: s.id }}
                    className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-secondary"
                  >
                    <span>
                      <span className="text-sm font-medium">{s.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {subjectCurrent(s)}% now, {subjectPrevious(s)}% earlier · needs attention
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              All subjects are holding steady or improving right now.
            </p>
          )}
          <Link
            to="/progress"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            See full progress <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
