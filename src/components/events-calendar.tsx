import Link from "next/link";
import { CalendarDays } from "lucide-react";
import {
  calendarProgrammes,
  calendarYear,
  months,
  type CalendarArm,
} from "@/lib/events-calendar";
import { SectionHead, TextLink } from "./ui";

const armNames: Record<CalendarArm, string> = {
  "capacity-development": "Capacity Development",
  "benevolent-childcare": "Benevolent & Childcare",
  "creative-community": "Creative Community",
};

export function EventsCalendar() {
  return (
    <>
      <section className="calendar-overview" id="year-at-a-glance">
        <SectionHead
          eyebrow={`CCDI year calendar ${calendarYear}`}
          title="The year at a glance."
        >
          Our monthly, bi-monthly, quarterly and thrice-a-year programmes.
          Exact dates are fixed by the planning committee and announced ahead
          of each event, usually on a weekend.
        </SectionHead>
        <ul className="calendar-legend" aria-label="Project arms">
          {(Object.keys(armNames) as CalendarArm[]).map((arm) => (
            <li key={arm}>
              <span className={`calendar-dot arm-${arm}`} aria-hidden="true" />
              {armNames[arm]}
            </li>
          ))}
        </ul>
        <div
          className="calendar-table-scroll"
          tabIndex={0}
          role="region"
          aria-label={`CCDI programme schedule ${calendarYear}`}
        >
          <table className="calendar-table">
            <thead>
              <tr>
                <th scope="col">Programme</th>
                <th scope="col">Frequency</th>
                {months.map((m) => (
                  <th scope="col" key={m}>
                    <abbr title={m}>{m.slice(0, 3)}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarProgrammes.map((p, i) => (
                <tr key={p.id}>
                  <th scope="row">
                    <span className="calendar-number">0{i + 1}</span>
                    <strong>{p.name}</strong>
                    <small>{p.detail}</small>
                  </th>
                  <td className="calendar-frequency">{p.frequency}</td>
                  {months.map((m, mi) => (
                    <td key={m}>
                      {p.months.includes(mi + 1) ? (
                        <span
                          className={`calendar-dot arm-${p.arm}`}
                          role="img"
                          aria-label={`Scheduled in ${m}`}
                        />
                      ) : (
                        <span className="sr-only">Not scheduled</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section calendar-months" id="month-by-month">
        <SectionHead eyebrow="Plan ahead" title="Month by month." />
        <ol className="calendar-month-grid">
          {months.map((m, mi) => (
            <li className="calendar-month" key={m}>
              <h3>
                <CalendarDays size={18} aria-hidden="true" />
                {m} {calendarYear}
              </h3>
              <ul>
                {calendarProgrammes
                  .filter((p) => p.months.includes(mi + 1))
                  .map((p) => (
                    <li key={p.id}>
                      <span
                        className={`calendar-dot arm-${p.arm}`}
                        aria-hidden="true"
                      />
                      <Link href={`/projects/${p.arm}/`}>{p.short}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="calendar-note">
          Want to take part, volunteer or partner on a programme?{" "}
          <TextLink href="/contact/">Talk to us</TextLink>
        </p>
      </section>
    </>
  );
}
