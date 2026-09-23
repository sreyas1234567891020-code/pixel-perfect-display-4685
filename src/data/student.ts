// Sample academic data for the student dashboard.
// All derived values (trends, averages, targets) are calculated from this data.

export type TrendDirection = "improving" | "stable" | "declining";

export type Assessment = {
  name: string;
  date: string;
  percentage: number;
};

export type SubjectRecord = {
  id: string;
  name: string;
  teacher: string;
  history: Assessment[];
  highest: number;
  target: number;
  feedback: string[];
  nextAssessment: { name: string; date: string };
};

export type TaskItem = {
  id: string;
  title: string;
  subject: string;
  type: "Assignment" | "Project";
  due: string;
  status: "pending" | "submitted";
};

export type ExamItem = {
  id: string;
  subject: string;
  date: string;
  syllabus: string;
};

export type AttendanceDay = {
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "late" | "holiday";
};

export const student = {
  name: "Ann Maria Joseph",
  admissionNo: "AVN/2024/0187",
  className: "Class X-B",
  school: "Assisi Vidyaniketan Public School",
  academicYear: "2026 - 27",
};

export const overallAssessments: Assessment[] = [
  { name: "Unit Test 1", date: "Jun 2026", percentage: 68 },
  { name: "Mid-Term", date: "Aug 2026", percentage: 72 },
  { name: "Unit Test 2", date: "Oct 2026", percentage: 76 },
  { name: "Model Exam", date: "Dec 2026", percentage: 78 },
];

export const subjects: SubjectRecord[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    teacher: "Mrs. Leena Thomas",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 64 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 69 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 71 },
      { name: "Model Exam", date: "Dec 2026", percentage: 76 },
    ],
    highest: 76,
    target: 82,
    feedback: [
      "Steady improvement in algebra problem solving.",
      "Give more practice time to coordinate geometry.",
    ],
    nextAssessment: { name: "Unit Test 3", date: "12 Feb 2027" },
  },
  {
    id: "physics",
    name: "Physics",
    teacher: "Mr. Rahul Menon",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 70 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 75 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 73 },
      { name: "Model Exam", date: "Dec 2026", percentage: 68 },
    ],
    highest: 75,
    target: 78,
    feedback: [
      "Numerical problems need more step-by-step working.",
      "Concepts in optics are understood well.",
    ],
    nextAssessment: { name: "Practical Assessment", date: "05 Feb 2027" },
  },
  {
    id: "chemistry",
    name: "Chemistry",
    teacher: "Mrs. Sandra Paul",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 66 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 70 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 74 },
      { name: "Model Exam", date: "Dec 2026", percentage: 75 },
    ],
    highest: 75,
    target: 80,
    feedback: ["Equations are balanced accurately.", "Revise organic nomenclature."],
    nextAssessment: { name: "Unit Test 3", date: "14 Feb 2027" },
  },
  {
    id: "computer-science",
    name: "Computer Science",
    teacher: "Mr. Jithin Varghese",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 84 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 86 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 87 },
      { name: "Model Exam", date: "Dec 2026", percentage: 91 },
    ],
    highest: 91,
    target: 93,
    feedback: ["Excellent logic building in the project work.", "Keep documenting your code."],
    nextAssessment: { name: "Project Review", date: "02 Feb 2027" },
  },
  {
    id: "english",
    name: "English",
    teacher: "Ms. Priya Nair",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 76 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 78 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 80 },
      { name: "Model Exam", date: "Dec 2026", percentage: 82 },
    ],
    highest: 82,
    target: 85,
    feedback: ["Essay structure has improved a lot.", "Work on precise vocabulary."],
    nextAssessment: { name: "Literature Test", date: "09 Feb 2027" },
  },
  {
    id: "social-science",
    name: "Social Science",
    teacher: "Mr. Alex Kurian",
    history: [
      { name: "Unit Test 1", date: "Jun 2026", percentage: 72 },
      { name: "Mid-Term", date: "Aug 2026", percentage: 74 },
      { name: "Unit Test 2", date: "Oct 2026", percentage: 73 },
      { name: "Model Exam", date: "Dec 2026", percentage: 76 },
    ],
    highest: 76,
    target: 80,
    feedback: ["Map work is accurate.", "Add more dates and examples in long answers."],
    nextAssessment: { name: "Unit Test 3", date: "16 Feb 2027" },
  },
];

export const tasks: TaskItem[] = [
  {
    id: "t1",
    title: "Working model on refraction of light",
    subject: "Physics",
    type: "Project",
    due: "30 Jan 2027",
    status: "pending",
  },
  {
    id: "t2",
    title: "Database design record submission",
    subject: "Computer Science",
    type: "Project",
    due: "02 Feb 2027",
    status: "pending",
  },
  {
    id: "t3",
    title: "Quadratic equations worksheet",
    subject: "Mathematics",
    type: "Assignment",
    due: "18 Jan 2027",
    status: "submitted",
  },
  {
    id: "t4",
    title: "Character sketch — The Merchant of Venice",
    subject: "English",
    type: "Assignment",
    due: "15 Jan 2027",
    status: "submitted",
  },
];

export const exams: ExamItem[] = [
  {
    id: "e1",
    subject: "Computer Science",
    date: "02 Feb 2027",
    syllabus: "Project review + Units 4-6",
  },
  { id: "e2", subject: "Physics", date: "05 Feb 2027", syllabus: "Practical assessment" },
  { id: "e3", subject: "English", date: "09 Feb 2027", syllabus: "Literature, Drama section" },
  { id: "e4", subject: "Mathematics", date: "12 Feb 2027", syllabus: "Coordinate geometry, Trigonometry" },
];

export const attendanceSummary = {
  totalWorkingDays: 112,
  present: 102,
  absent: 6,
  late: 4,
  recommendedTarget: 90,
};

export const monthlyAttendance = [
  { month: "Jun", percentage: 96 },
  { month: "Jul", percentage: 93 },
  { month: "Aug", percentage: 88 },
  { month: "Sep", percentage: 90 },
  { month: "Oct", percentage: 92 },
  { month: "Nov", percentage: 89 },
  { month: "Dec", percentage: 91 },
];

// January 2027 day-by-day record used for the calendar view.
export const attendanceMonth = {
  label: "January 2027",
  firstWeekdayOffset: 5, // 1 Jan 2027 is a Friday (Mon = 0)
  days: buildJanuary(),
};

function buildJanuary(): AttendanceDay[] {
  const absentDays = [8, 21];
  const lateDays = [14, 27];
  const holidays = [1, 26];
  const out: AttendanceDay[] = [];
  for (let d = 1; d <= 31; d++) {
    const date = `2027-01-${String(d).padStart(2, "0")}`;
    const weekday = (d + 4) % 7; // 0 = Monday
    if (weekday >= 5 || holidays.includes(d)) {
      out.push({ date, status: "holiday" });
    } else if (absentDays.includes(d)) {
      out.push({ date, status: "absent" });
    } else if (lateDays.includes(d)) {
      out.push({ date, status: "late" });
    } else {
      out.push({ date, status: "present" });
    }
  }
  return out;
}

/* ---------------- derived values ---------------- */

export function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

/** Trend from real history: compares the latest score with the average of earlier ones. */
export function trendOf(history: Assessment[]): TrendDirection {
  if (history.length < 2) return "stable";
  const latest = history[history.length - 1].percentage;
  const earlier = average(history.slice(0, -1).map((h) => h.percentage));
  const delta = latest - earlier;
  if (delta >= 2) return "improving";
  if (delta <= -2) return "declining";
  return "stable";
}

export function trendLabel(t: TrendDirection) {
  return t === "improving" ? "Improving" : t === "declining" ? "Performance declining" : "Stable";
}

export function gradeFor(percentage: number) {
  if (percentage >= 91) return "A1";
  if (percentage >= 81) return "A2";
  if (percentage >= 71) return "B1";
  if (percentage >= 61) return "B2";
  if (percentage >= 51) return "C1";
  return "C2";
}

/** Keeps targets realistic: a modest step above current performance, capped at 95. */
export function suggestTarget(current: number) {
  const step = current >= 90 ? 2 : current >= 80 ? 3 : current >= 70 ? 4 : 5;
  return Math.min(95, Math.round(current + step));
}

export const currentOverall = overallAssessments[overallAssessments.length - 1].percentage;
export const overallTrend = trendOf(overallAssessments);
export const overallTarget = 82;
export const attendancePercentage = Math.round(
  (attendanceSummary.present / attendanceSummary.totalWorkingDays) * 100,
);
export const pendingTasks = tasks.filter((t) => t.status === "pending");

export function subjectCurrent(s: SubjectRecord) {
  return s.history[s.history.length - 1].percentage;
}
export function subjectPrevious(s: SubjectRecord) {
  return s.history[s.history.length - 2]?.percentage ?? s.history[0].percentage;
}

/** Simple projection range based on recent pace of change, deliberately conservative. */
export function projection(history: Assessment[]) {
  const current = history[history.length - 1].percentage;
  const first = history[0].percentage;
  const pace = (current - first) / Math.max(1, history.length - 1);
  const expected = Math.min(97, Math.max(35, current + pace));
  return {
    low: Math.round(Math.max(35, expected - 3)),
    high: Math.round(Math.min(98, expected + 3)),
  };
}
