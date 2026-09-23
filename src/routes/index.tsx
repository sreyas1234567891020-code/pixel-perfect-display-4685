import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import {
  student,
  currentOverall,
  overallTrend,
  overallTarget,
  attendancePercentage,
  attendanceSummary,
  pendingTasks,
  exams,
  subjects,
  subjectCurrent,
  subjectPrevious,
  trendOf,
  gradeFor,
} from "@/data/student";

import {
  StatCard,
  TrendPill,
  TargetBar,
  SectionTitle,
  PageHeader,
} from "@/components/student/bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Student Dashboard — Assisi Vidyaniketan",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const nextExam = exams[0];

  const weakSubjects = subjects.filter(
    (subject) => trendOf(subject.history) === "declining",
  );

  return (
    <div>
      <PageHeader
        title={`Hi, ${student.name.split(" ")[0]}`}
        intro={`${student.className} · ${student.academicYear}`}
      />

      <SectionTitle title="Overview" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Overall mark"
          value={`${currentOverall}%`}
          hint={`Grade ${gradeFor(currentOverall)}`}
        />

        <StatCard
          label="Attendance"
          value={`${attendancePercentage}%`}
          hint={`${attendanceSummary.present} days present`}
        />

        <StatCard
          label="Pending work"
          value={pendingTasks.length}
          hint="to be completed"
        />

        <StatCard
          label="Target"
          value={`${overallTarget}%`}
          hint="current academic target"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="surface p-4">
          <SectionTitle
            title="Current performance"
            description="Based on recent assessments"
            action={<TrendPill trend={overallTrend} />}
          />

          <p className="text-3xl font-bold">
            {currentOverall}%
          </p>

          <TargetBar
            className="mt-4"
            current={currentOverall}
            target={overallTarget}
          />
        </div>

        <div className="surface p-4">
          <SectionTitle title="Next exam" />

          {nextExam && (
            <>
              <p className="font-semibold">
                {nextExam.subject}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {nextExam.date}
              </p>

              <p className="mt-2 text-sm">
                {nextExam.syllabus}
              </p>
            </>
          )}

          <Link
            to="/tasks"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            See tasks
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="surface p-4">
          <SectionTitle
            title="Pending work"
            description="Things that still need to be submitted"
          />

          <ul className="space-y-3">
            {pendingTasks.map((task) => (
              <li
                key={task.id}
                className="flex gap-3"
              >
                <ClipboardList className="mt-0.5 size-4 text-primary" />

                <div>
                  <p className="text-sm font-medium">
                    {task.title}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {task.subject} · due {task.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-4">
          <SectionTitle
            title="Subjects to check"
            description="Subjects where the recent marks dropped"
          />

          {weakSubjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No subjects need immediate attention.
            </p>
          ) : (
            <ul className="space-y-3">
              {weakSubjects.map((subject) => (
                <li key={subject.id}>
                  <Link
                    to="/subject/$subjectId"
                    params={{ subjectId: subject.id }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {subject.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {subjectCurrent(subject)}% now ·{" "}
                        {subjectPrevious(subject)}% before
                      </p>
                    </div>

                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle
          title="Upcoming"
          description="Next few exams"
        />

        <ul className="space-y-3">
          {exams.slice(0, 3).map((exam) => (
            <li
              key={exam.id}
              className="flex gap-3"
            >
              <CalendarDays className="mt-0.5 size-4 text-primary" />

              <div>
                <p className="text-sm font-medium">
                  {exam.subject}
                </p>

                <p className="text-xs text-muted-foreground">
                  {exam.date} · {exam.syllabus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
