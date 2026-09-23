import { createFileRoute } from "@tanstack/react-router";

import {
  subjects,
  subjectCurrent,
  currentOverall,
  overallTarget,
  attendancePercentage,
  attendanceSummary,
} from "@/data/student";

import {
  PageHeader,
  SectionTitle,
  TargetBar,
} from "@/components/student/bits";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      {
        title: "Academic Targets — Assisi Vidyaniketan",
      },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const subjectsToWorkOn = subjects
    .filter(
      (subject) =>
        subjectCurrent(subject) < subject.target,
    )
    .sort(
      (a, b) =>
        b.target -
        subjectCurrent(b) -
        (a.target - subjectCurrent(a)),
    )
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        title="My targets"
        intro="Simple targets based on my current marks."
      />

      <div className="surface p-4">
        <SectionTitle title="Overall target" />

        <div className="flex items-end gap-8">
          <div>
            <p className="text-xs text-muted-foreground">
              Current
            </p>

            <p className="text-3xl font-bold">
              {currentOverall}%
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Target
            </p>

            <p className="text-3xl font-bold">
              {overallTarget}%
            </p>
          </div>
        </div>

        <TargetBar
          className="mt-4 max-w-md"
          current={currentOverall}
          target={overallTarget}
        />
      </div>

      <div className="mt-4">
        <SectionTitle
          title="Subjects to work on"
          description="The subjects with the biggest gap to their targets."
        />

        <div className="space-y-3">
          {subjectsToWorkOn.map((subject) => {
            const current = subjectCurrent(subject);

            return (
              <div
                key={subject.id}
                className="surface p-4"
              >
                <div className="flex justify-between">
                  <p className="font-medium">
                    {subject.name}
                  </p>

                  <p className="text-sm">
                    {current}% → {subject.target}%
                  </p>
                </div>

                <TargetBar
                  className="mt-3"
                  current={current}
                  target={subject.target}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle title="Attendance target" />

        <p className="text-sm">
          Current attendance:{" "}
          <strong>{attendancePercentage}%</strong>
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Try to keep attendance at or above{" "}
          {attendanceSummary.recommendedTarget}%.
        </p>
      </div>
    </div>
  );
}
