import { createFileRoute, Link } from "@tanstack/react-router";
import {
  subjects,
  overallAssessments,
  average,
  gradeFor,
  subjectCurrent,
} from "@/data/student";
import { PageHeader, SectionTitle } from "@/components/student/bits";

export const Route = createFileRoute("/marks")({
  head: () => ({
    meta: [
      { title: "My Marks — Assisi Vidyaniketan Student Dashboard" },
      {
        name: "description",
        content: "Assessment-wise marks for every subject, with averages and grades.",
      },
      { property: "og:title", content: "My Marks — Assisi Vidyaniketan Student Dashboard" },
      {
        property: "og:description",
        content: "A clear record of your scores in each subject across the year.",
      },
    ],
  }),
  component: MarksPage,
});

function MarksPage() {
  const columns = overallAssessments.map((a) => a.name);

  return (
    <div>
      <PageHeader title="My marks" intro="Every recorded assessment, subject by subject." />

      <div className="surface overflow-x-auto p-1">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-3">Subject</th>
              {columns.map((c) => (
                <th key={c} className="px-3 py-3 text-center">
                  {c}
                </th>
              ))}
              <th className="px-3 py-3 text-center">Average</th>
              <th className="px-3 py-3 text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => {
              const avg = average(s.history.map((h) => h.percentage));
              return (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-3 py-3 font-medium">
                    <Link
                      to="/subject/$subjectId"
                      params={{ subjectId: s.id }}
                      className="hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  </td>
                  {s.history.map((h) => (
                    <td key={h.name} className="px-3 py-3 text-center">
                      {h.percentage}%
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center font-semibold">{avg}%</td>
                  <td className="px-3 py-3 text-center">{gradeFor(subjectCurrent(s))}</td>
                </tr>
              );
            })}
            <tr className="border-t border-border bg-secondary/60">
              <td className="px-3 py-3 font-semibold">Overall</td>
              {overallAssessments.map((a) => (
                <td key={a.name} className="px-3 py-3 text-center font-semibold">
                  {a.percentage}%
                </td>
              ))}
              <td className="px-3 py-3 text-center font-semibold">
                {average(overallAssessments.map((a) => a.percentage))}%
              </td>
              <td className="px-3 py-3 text-center font-semibold">
                {gradeFor(overallAssessments[overallAssessments.length - 1].percentage)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 surface p-4">
        <SectionTitle title="Grade scale" description="How percentages map to grades." />
        <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          {[
            ["A1", "91% and above"],
            ["A2", "81% - 90%"],
            ["B1", "71% - 80%"],
            ["B2", "61% - 70%"],
            ["C1", "51% - 60%"],
            ["C2", "Below 51%"],
          ].map(([g, r]) => (
            <div key={g} className="rounded-lg bg-secondary px-3 py-2">
              <span className="font-semibold">{g}</span>{" "}
              <span className="text-muted-foreground">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
