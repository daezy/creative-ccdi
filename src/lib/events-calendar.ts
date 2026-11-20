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

export type CalendarProgramme = {
  id: string;
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
    name: "Benevolent Initiative: A Touch of Love",
    short: "Touch of Love",
    detail: "Widows, widowers and single mothers; gifts and scholarships.",
    frequency: "Monthly",
    arm: "benevolent-childcare",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: "welfare-support",
    name: "Welfare Support",
    short: "Welfare Support",
    detail: "The less privileged, destitute, sick at home, and prisons.",
    frequency: "Bi-Monthly",
    arm: "benevolent-childcare",
    months: [2, 4, 6, 8, 10, 12],
  },
  {
    id: "skills-empowerment",
    name: "Skills Empowerment Program",
    short: "Skills Empowerment",
    detail: "Subsidised training.",
    frequency: "Quarterly",
    arm: "capacity-development",
    months: [3, 6, 9, 12],
  },
  {
    id: "entrepreneurial-leadership",
    name: "Entrepreneurial Skills Empowerment & Work Ethics/Leadership Conference",
    short: "Entrepreneurial & Leadership Conference",
    detail: "Enterprise skills, work ethics and leadership.",
    frequency: "Thrice a Year",
    arm: "capacity-development",
    months: [4, 8, 12],
  },
  {
    id: "childcare",
    name: "Childcare Initiative",
    short: "Childcare Initiative",
    detail: "Young exceptional entrepreneurs.",
    frequency: "Quarterly",
    arm: "benevolent-childcare",
    months: [2, 5, 8, 11],
  },
  {
    id: "couples-day-out",
    name: "Creative Community Initiative: Couples’ Blissful Day-Out",
    short: "Couples’ Blissful Day-Out",
    detail: "A day of rest, connection and enrichment for couples.",
    frequency: "Thrice a Year",
    arm: "creative-community",
    months: [2, 6, 10],
  },
  {
    id: "community-health",
    name: "Community Health Awareness Seminar",
    short: "Community Health Seminar",
    detail: "Preventive health and wellness education for the community.",
    frequency: "Quarterly",
    arm: "creative-community",
    months: [1, 4, 7, 10],
  },
  {
    id: "womens-health",
    name: "Women’s Health Awareness Seminar",
    short: "Women’s Health Seminar",
    detail: "Health awareness focused on women and families.",
    frequency: "Thrice a Year",
    arm: "creative-community",
    months: [3, 7, 11],
  },
];
