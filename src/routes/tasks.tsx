import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { tasks, exams, pendingTasks } from "@/data/student";
import { PageHeader, SectionTitle } from "@/components/student/bits";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "My Tasks — Assisi Vidyaniketan Student Dashboard" },
      {
        name: "description",
        content: "Pending assignments, projects and the schedule of upcoming examinations.",
      },
      { property: "og:title", content: "My Tasks — Assisi Vidyaniketan Student Dashboard" },
      {
        property: "og:description",
        content: "Everything you need to submit, plus your upcoming exam dates and syllabus.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const submitted = tasks.filter((t) => t.status === "submitted");

  return (
    <div>
      <PageHeader
        title="What I need to do"
        intro={`${pendingTasks.length} item${pendingTasks.length === 1 ? "" : "s"} still to submit.`}
      />

      <div className="surface p-4">
        <SectionTitle title="Pending work" />
        <ul className="space-y-3">
          {pendingTasks.map((t) => (
            <li key={t.id} className="flex items-start gap-3 rounded-lg bg-secondary/60 p-3">
              <Circle className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">
                  {t.subject} · {t.type} · due {t.due}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 surface p-4">
        <SectionTitle title="Upcoming examinations" />
        <ul className="divide-y divide-border">
          {exams.map((e) => (
            <li key={e.id} className="flex items-start gap-3 py-3">
              <CalendarDays className="mt-0.5 size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{e.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {e.date} · {e.syllabus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 surface p-4">
        <SectionTitle title="Already submitted" />
        <ul className="space-y-2">
          {submitted.map((t) => (
            <li key={t.id} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 text-success" />
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">
                  {t.subject} · submitted by {t.due}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
