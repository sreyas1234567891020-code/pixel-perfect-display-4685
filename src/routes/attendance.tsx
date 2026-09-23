import { createFileRoute } from "@tanstack/react-router";

import {
  attendanceSummary,
  attendancePercentage,
  monthlyAttendance,
  attendanceMonth,
} from "@/data/student";

import {
  PageHeader,
  SectionTitle,
  StatCard,
} from "@/components/student/bits";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      {
        title: "Attendance — Assisi Vidyaniketan",
      },
    ],
  }),
  component: AttendancePage,
});

const statusStyles = {
  present: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  late: "bg-orange-100 text-orange-800",
  holiday: "bg-gray-100 text-gray-500",
};

function AttendancePage() {
  return (
    <div>
      <PageHeader
        title="My attendance"
        intro={`${attendanceSummary.present} days present out of ${attendanceSummary.totalWorkingDays}.`}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Attendance"
          value={`${attendancePercentage}%`}
          hint={`Target ${attendanceSummary.recommendedTarget}%`}
        />

        <StatCard
          label="Present"
          value={attendanceSummary.present}
        />

        <StatCard
          label="Absent"
          value={attendanceSummary.absent}
        />

        <StatCard
          label="Late"
          value={attendanceSummary.late}
        />
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle
          title={attendanceMonth.label}
          description="Daily attendance"
        />

        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {["M", "T", "W", "T", "F", "S", "S"].map(
            (day, index) => (
              <div
                key={index}
                className="py-1 font-semibold text-muted-foreground"
              >
                {day}
              </div>
            ),
          )}

          {Array.from({
            length: attendanceMonth.firstWeekdayOffset,
          }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {attendanceMonth.days.map((day, index) => (
            <div
              key={day.date}
              className={`flex aspect-square items-center justify-center rounded ${statusStyles[day.status]}`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>Green = Present</span>
          <span>Red = Absent</span>
          <span>Orange = Late</span>
          <span>Grey = Holiday</span>
        </div>
      </div>

      <div className="mt-4 surface p-4">
        <SectionTitle
          title="Monthly attendance"
          description="Attendance percentage for each month"
        />

        <div className="space-y-3">
          {monthlyAttendance.map((month) => (
            <div key={month.month}>
              <div className="flex justify-between text-sm">
                <span>{month.month}</span>
                <span className="font-semibold">
                  {month.percentage}%
                </span>
              </div>

              <div className="mt-1 h-2 rounded bg-secondary">
                <div
                  className="h-2 rounded bg-primary"
                  style={{
                    width: `${month.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
