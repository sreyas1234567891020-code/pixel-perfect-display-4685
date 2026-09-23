import { createFileRoute } from "@tanstack/react-router";
import {
  subjects,
  subjectCurrent,
  currentOverall,
  overallTarget,
  overallAssessments,
  projection,
  suggestTarget,
  trendOf,
  attendancePercentage,
  attendanceSummary,
} from "@/data/student";
import { PageHeader, SectionTitle, TargetBar, TrendPill } from "@/components/student/bits";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "My Goals — Assisi Vidyaniketan Student Dashboard" },
      {
        name: "description",
        content: "Realistic academic targets, estimated performance range and recommended actions.",
      },
      { property: "og:title", content: "My Goals — Assisi Vidyaniketan Student Dashboard" },
      {
        property: "og:description",
        content: "See a realistic target you can work toward and the steps to get there.",
      },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const reached = currentOverall >= overallTarget;
  const range = projection(overallAssessments);
  const nextTarget = suggestTarget(currentOverall);
  const focus = subjects
    .map((s) => ({ s, gap: s.target - subjectCurrent(s), trend: trendOf(s.history) }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Where can I reach?"
        intro="Targets are set close to your current level so they stay achievable."
      />

      <div className="surface p-5">
        <SectionTitle
          title="Overall target"
          description={reached ? "Goal achieved." : "Progress toward your current target"}
        />
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Current</p>
            <p className="stat-value">{currentOverall}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Target</p>
            <p className="stat-value">{overallTarget}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Estimated next exam
            </p>
            <p className="stat-value">
              {range.low}–{range.high}%
            </p>
          </div>
        </div>
        <TargetBar className="mt-4 max-w-md" current={currentOverall} target={overallTarget} />
        {reached ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Suggested next target: {nextTarget}%. Targets move up gently so they stay realistic.
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            {overallTarget - currentOverall} percentage points to go. This estimate is a guide based
            on your recorded marks, not a prediction of your final result.
          </p>
        )}
      </div>

      <div className="mt-6">
        <SectionTitle
          title="Subject targets"
          description="Where the biggest gains are available right now."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {focus.map(({ s, gap, trend }) => (
            <div key={s.id} className="surface p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-base font-semibold">{s.name}</p>
                <TrendPill trend={trend} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {subjectCurrent(s)}% now · target {s.target}%
              </p>
              <TargetBar className="mt-3" current={subjectCurrent(s)} target={s.target} />
              <p className="mt-2 text-xs text-muted-foreground">
                {gap > 0 ? `${gap} points to the target.` : "Target reached — keep it steady."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 surface p-4">
        <SectionTitle title="Recommended next steps" />
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Complete the two pending submissions before their due dates — they count toward internal
            assessment.
          </li>
          <li>
            Spend an extra practice session each week on {focus[0]!.s.name}, the subject with the
            widest gap to its target.
          </li>
          <li>
            Keep attendance at or above {attendanceSummary.recommendedTarget}% — you are currently at{" "}
            {attendancePercentage}%.
          </li>
          <li>Review teacher feedback on each subject page before the next assessment.</li>
        </ul>
      </div>
    </div>
  );
}
