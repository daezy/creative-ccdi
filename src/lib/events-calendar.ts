// CCDI Year Calendar 2027, transcribed from CCDI_Year_Calendar_2027.docx.
// Months are 1-12. Exact dates are fixed later by the planning committee.
export const calendarYear = 2027;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type CalendarArm =
  | "capacity-development"
  | "benevolent-childcare"
  | "creative-community";

// How a programme's day is chosen within each scheduled month.
export type ScheduleRule =
  | "last-saturday"
  | "second-saturday"
  | "second-week-mwf"
  | "fifth-saturday"
  | "tba";

export const ruleLabels: Record<ScheduleRule, string> = {
  "last-saturday": "Last Saturday of the month",
  "second-saturday": "Second Saturday of the month",
  "second-week-mwf": "Monday, Wednesday & Friday of the second week",
  "fifth-saturday": "Fifth Saturday of the month",
  tba: "Date to be announced",
};

export type CalendarProgramme = {
  id: string;
  rule: ScheduleRule;
  name: string;
  short: string;
  detail: string;
  frequency: "Monthly" | "Bi-Monthly" | "Quarterly" | "Thrice a Year";
  arm: CalendarArm;
  months: number[];
};

export const calendarProgrammes: CalendarProgramme[] = [
  {
    id: "touch-of-love",
    rule: "last-saturday",
    name: "Benevolent Initiative: A Touch of Love",
    short: "Touch of Love",
    detail: "Widows, widowers and single mothers; gifts and scholarships.",
    frequency: "Monthly",
    arm: "benevolent-childcare",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: "welfare-support",
    rule: "last-saturday",
    name: "Welfare Support",
    short: "Welfare Support",
    detail: "The less privileged, destitute, sick at home, and prisons.",
    frequency: "Bi-Monthly",
    arm: "benevolent-childcare",
    months: [2, 4, 6, 8, 10, 12],
  },
  {
    id: "skills-empowerment",
    rule: "second-week-mwf",
    name: "Skills Empowerment Program",
    short: "Skills Empowerment",
    detail: "Subsidised training.",
    frequency: "Quarterly",
    arm: "capacity-development",
    months: [3, 6, 9, 12],
  },
  {
    id: "entrepreneurial-leadership",
    rule: "second-saturday",
    name: "Entrepreneurial Skills Empowerment & Work Ethics/Leadership Conference",
    short: "Entrepreneurial & Leadership Conference",
    detail: "Enterprise skills, work ethics and leadership.",
    frequency: "Thrice a Year",
    arm: "capacity-development",
    months: [4, 8, 12],
  },
  {
    id: "childcare",
    rule: "tba",
    name: "Childcare Initiative",
    short: "Childcare Initiative",
    detail: "Young exceptional entrepreneurs.",
    frequency: "Quarterly",
    arm: "benevolent-childcare",
    months: [2, 5, 8, 11],
  },
  {
    id: "couples-day-out",
    rule: "fifth-saturday",
    name: "Creative Community Initiative: Couples’ Blissful Day-Out",
    short: "Couples’ Blissful Day-Out",
    detail: "A day of rest, connection and enrichment for couples.",
    frequency: "Thrice a Year",
    arm: "creative-community",
    months: [2, 6, 10],
  },
  {
    id: "community-health",
    rule: "fifth-saturday",
    name: "Community Health Awareness Seminar",
    short: "Community Health Seminar",
    detail: "Preventive health and wellness education for the community.",
    frequency: "Quarterly",
    arm: "creative-community",
    months: [1, 4, 7, 10],
  },
  {
    id: "womens-health",
    rule: "fifth-saturday",
    name: "Women’s Health Awareness Seminar",
    short: "Women’s Health Seminar",
    detail: "Health awareness focused on women and families.",
    frequency: "Thrice a Year",
    arm: "creative-community",
    months: [3, 7, 11],
  },
];

export type ScheduledEvent = {
  key: string;
  programme: CalendarProgramme;
  month: number;
  /** ISO dates (YYYY-MM-DD). Empty when the date is still to be announced. */
  dates: string[];
};

const iso = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

function saturdaysOf(year: number, month: number) {
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const result: number[] = [];
  for (let d = 1; d <= days; d++) {
    if (new Date(Date.UTC(year, month - 1, d)).getUTCDay() === 6) result.push(d);
  }
  return result;
}

function secondMonday(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const firstMonday = 1 + ((8 - firstDay) % 7);
  return firstMonday + 7;
}

export function datesFor(rule: ScheduleRule, year: number, month: number) {
  const saturdays = saturdaysOf(year, month);
  switch (rule) {
    case "last-saturday":
      return [iso(year, month, saturdays[saturdays.length - 1])];
    case "second-saturday":
      return [iso(year, month, saturdays[1])];
    case "fifth-saturday":
      return saturdays[4] ? [iso(year, month, saturdays[4])] : [];
    case "second-week-mwf": {
      const monday = secondMonday(year, month);
      return [monday, monday + 2, monday + 4].map((d) => iso(year, month, d));
    }
    default:
      return [];
  }
}

/** Every scheduled event in the year, in date order (undated events last in their month). */
export function scheduledEvents(year = calendarYear): ScheduledEvent[] {
  return calendarProgrammes
    .flatMap((programme) =>
      programme.months.map((month) => ({
        key: `${programme.id}-${month}`,
        programme,
        month,
        dates: datesFor(programme.rule, year, month),
      })),
    )
    .sort(
      (a, b) =>
        a.month - b.month ||
        (a.dates[0] ?? "9999").localeCompare(b.dates[0] ?? "9999") ||
        calendarProgrammes.indexOf(a.programme) -
          calendarProgrammes.indexOf(b.programme),
    );
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

/** e.g. "Sat 30 Jan" or "Mon 8, Wed 10 & Fri 12 Mar". */
export function formatDates(dates: string[]) {
  if (!dates.length) return "Date to be announced";
  const parts = dates.map((d) => dateFormat.formatToParts(new Date(`${d}T00:00:00Z`)));
  const get = (p: Intl.DateTimeFormatPart[], t: string) =>
    p.find((x) => x.type === t)?.value ?? "";
  const days = parts.map((p) => `${get(p, "weekday")} ${get(p, "day")}`);
  const month = get(parts[0], "month");
  const list =
    days.length > 1
      ? `${days.slice(0, -1).join(", ")} & ${days[days.length - 1]}`
      : days[0];
  return `${list} ${month}`;
}
