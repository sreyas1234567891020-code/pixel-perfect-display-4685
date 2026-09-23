import {
  createFileRoute,
  notFound,
  Link,
} from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";

import {
  subjects,
  average,
  trendOf,
  tasks,
  subjectCurrent,
  subjectPrevious,
  gradeFor,
} from "@/data/student";

import {
  PageHeader,
  SectionTitle,
  TargetBar,
  TrendPill,
} from "@/components/student/bits";

export const Route = createFileRoute(
  "/subject/$subjectId",
)({
  loader: ({ params }) => {
    const subject = subjects.find(
      (item) => item.id === params.subjectId,
    );

    if (!subject) {
      throw notFound();
    }

    return { subject };
  },

  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();

  const current = subjectCurrent(subject);
  const previous = subjectPrevious(subject);

  const avg = average(
    subject.history.map((item) => item.percentage),
  );

  const relatedTasks = tasks.filter(
    (task) => task.subject === subject.name,
  );

  return (
    <div>
      <Link
        to="/progress"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <PageHeader
        title={subject.name}
        intro={`Teacher: ${subject.teacher}`}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="surface p-4">
          <p className="text-xs text-muted-foreground">
            Current
          </p>
          <p className="mt-2 text-2xl font-bold">
            {current}%
          </p>
          <p className="text-xs text-muted-foreground">
            Grade {gradeFor(current)}
          </p>
        </div>

        <div className="surface p-4">
          <p className="text-xs text-muted-foreground">
            Previous
          </p>
          <p className="mt-2 text-2xl font-bold">
            {previous}%
          </p>
        </div>

        <div className="surface p-4">
          <p className="text-xs text-muted-foreground">
            Average
          </p>
          <p className="mt-2 text-2xl font-bold">
            {avg}%
          </p>
        </div>

        <div className="surface p-4">
          <p className="text-xs text-muted-foreground">
            Best mark
          </p>
          <p className="mt-2 text-2xl font-bold">
            {subject.highest}%
          </p>
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle
          title="Marks"
          action={
            <TrendPill trend={trendOf(subject.history)} />
          }
        />

        <div className="space-y-4">
          {subject.history.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-semibold">
                  {item.percentage}%
                </span>
              </div>

              <div className="mt-1 h-2 rounded bg-secondary">
                <div
                  className="h-2 rounded bg-primary"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="surface p-4">
          <SectionTitle title="Target" />

          <p className="text-3xl font-bold">
            {subject.target}%
          </p>

          <TargetBar
            className="mt-3"
            current={current}
            target={subject.target}
          />

          <p className="mt-3 text-sm text-muted-foreground">
            Next assessment: {subject.nextAssessment.name}
            <br />
            {subject.nextAssessment.date}
          </p>
        </div>

        <div className="surface p-4">
          <SectionTitle title="Teacher feedback" />

          <ul className="space-y-2 text-sm text-muted-foreground">
            {subject.feedback.map((feedback) => (
              <li key={feedback}>• {feedback}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle title="Assignments" />

        {relatedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No assignments for this subject.
          </p>
        ) : (
          <div className="space-y-3">
            {relatedTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between gap-3 border-b pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">
                    {task.title}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {task.type} · {task.due}
                  </p>
                </div>

                <span className="text-xs font-medium">
                  {task.status === "pending"
                    ? "Pending"
                    : "Submitted"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
