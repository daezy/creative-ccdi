import Link from "next/link";
import { CalendarDays } from "lucide-react";
import {
  calendarProgrammes,
  calendarYear,
  formatDates,
  months,
  scheduledEvents,
  type CalendarArm,
} from "@/lib/events-calendar";
import { SectionHead, TextLink } from "./ui";

const armNames: Record<CalendarArm, string> = {
  "capacity-development": "Capacity Development",
  "benevolent-childcare": "Benevolent & Childcare",
  "creative-community": "Creative Community",
};

export function EventsCalendar() {
  const events = scheduledEvents();
  return (
    <>
      <section className="calendar-overview" id="year-at-a-glance">
        <SectionHead
          eyebrow={`CCDI year calendar ${calendarYear}`}
          title="The year at a glance."
        >
          Our monthly, bi-monthly, quarterly and thrice-a-year programmes, each
          held on a set day of the month. Dates still to be confirmed are
          announced ahead of each event.
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
                {events
                  .filter((e) => e.month === mi + 1)
                  .map(({ key, programme: p, dates }) => (
                    <li key={key}>
                      <span
                        className={`calendar-dot arm-${p.arm}`}
                        aria-hidden="true"
                      />
                      <span className="calendar-month-item">
                        <Link href={`/projects/${p.arm}/`}>{p.short}</Link>
                        <small>{formatDates(dates)}</small>
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="calendar-note">
          Want to take part, volunteer or partner on a programme?{" "}
          <TextLink href="/events/">See upcoming events</TextLink>
        </p>
      </section>
    </>
  );
}
