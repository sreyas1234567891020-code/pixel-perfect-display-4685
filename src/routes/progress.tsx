import { createFileRoute, Link } from "@tanstack/react-router";

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

import {
  PageHeader,
  SectionTitle,
  TrendPill,
} from "@/components/student/bits";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      {
        title: "My Progress — Assisi Vidyaniketan",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const averageMark = average(
    overallAssessments.map((item) => item.percentage),
  );

  return (
    <div>
      <PageHeader
        title="My progress"
        intro="A simple look at how my marks have changed."
      />

      <div className="surface p-4">
        <SectionTitle
          title="Assessment marks"
          description={`Average: ${averageMark}%`}
          action={<TrendPill trend={overallTrend} />}
        />

        <div className="space-y-4">
          {overallAssessments.map((assessment) => (
            <div key={assessment.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{assessment.name}</span>
                <span className="font-semibold">
                  {assessment.percentage}%
                </span>
              </div>

              <div className="h-3 rounded bg-secondary">
                <div
                  className="h-3 rounded bg-primary"
                  style={{
                    width: `${assessment.percentage}%`,
                  }}
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {assessment.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <SectionTitle
          title="Subjects"
          description="Click a subject to see its marks."
        />

        <div className="space-y-2">
          {subjects.map((subject) => {
            const current = subjectCurrent(subject);
            const previous = subjectPrevious(subject);

            return (
              <Link
                key={subject.id}
                to="/subject/$subjectId"
                params={{ subjectId: subject.id }}
                className="surface flex items-center justify-between p-4 hover:bg-secondary/50"
              >
                <div>
                  <p className="font-medium">
                    {subject.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {current}% now · {previous}% previous
                  </p>
                </div>

                <TrendPill
                  trend={trendOf(subject.history)}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <p className="text-sm text-muted-foreground">
          Current overall mark
        </p>

        <p className="mt-1 text-3xl font-bold">
          {currentOverall}%
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Keep working consistently and check individual
          subjects for more detail.
        </p>
      </div>
    </div>
  );
}
