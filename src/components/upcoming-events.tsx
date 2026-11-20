"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CalendarClock, Repeat } from "lucide-react";
import {
  calendarYear,
  formatDates,
  months,
  ruleLabels,
  scheduledEvents,
  type CalendarArm,
} from "@/lib/events-calendar";
import { Eyebrow, SectionHead, TextLink } from "./ui";

const armNames: Record<CalendarArm, string> = {
  "capacity-development": "Capacity Development",
  "benevolent-childcare": "Benevolent & Childcare",
  "creative-community": "Creative Community",
};

// Today's date in Lagos (YYYY-MM-DD). The static build renders every event;
// the browser then hides the ones that have already passed.
const lagosToday = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(
    new Date(),
  );
const noop = () => () => {};

export function UpcomingEvents() {
  const today = useSyncExternalStore(noop, lagosToday, () => "");
  const thisMonth = today ? today.slice(0, 7) : "";
  const events = scheduledEvents().filter((event) => {
    if (!today) return true;
    if (event.dates.length) return event.dates[event.dates.length - 1] >= today;
    // Undated events stay listed until their month is over.
    return `${calendarYear}-${String(event.month).padStart(2, "0")}` >= thisMonth;
  });
  const next = events.find((event) => event.dates.length);
  const byMonth = months
    .map((name, i) => ({
      name,
      events: events.filter((event) => event.month === i + 1),
    }))
    .filter((group) => group.events.length);

  if (!events.length) {
    return (
      <section className="upcoming-empty">
        <CalendarClock size={40} strokeWidth={1.25} aria-hidden="true" />
        <h2>New dates are on the way.</h2>
        <p>
          The {calendarYear} programme year has ended. Our next calendar will be
          published here soon.
        </p>
        <TextLink href="/contact/">Ask about upcoming programmes</TextLink>
      </section>
    );
  }

  return (
    <>
      {next && (
        <section className="upcoming-next" aria-labelledby="next-event">
          <div className="upcoming-next-date" aria-hidden="true">
            <span>{months[next.month - 1].slice(0, 3)}</span>
            <strong>{Number(next.dates[0].slice(8))}</strong>
            <span>{calendarYear}</span>
          </div>
          <div>
            <Eyebrow>Next on the calendar</Eyebrow>
            <h2 id="next-event">{next.programme.name}</h2>
            <p>{next.programme.detail}</p>
            <p className="upcoming-when">
              <CalendarClock size={18} aria-hidden="true" />
              {formatDates(next.dates)} {calendarYear}
            </p>
            <TextLink href={`/contact/?interest=${encodeURIComponent(next.programme.short)}`}>
              Ask about taking part
            </TextLink>
          </div>
        </section>
      )}

      <section className="content-section upcoming-list" id="upcoming-events">
        <SectionHead
          eyebrow={`Upcoming in ${calendarYear}`}
          title="Dates for your diary."
          href="/calendar/"
          linkLabel="See the full year"
        >
          Programmes are held on set days of the month. Where a date is still
          to be announced, we will share it here and on our social channels.
        </SectionHead>
        {byMonth.map((group) => (
          <div className="upcoming-month" key={group.name}>
            <h3>
              {group.name} {calendarYear}
            </h3>
            <ol>
              {group.events.map((event) => (
                <li
                  className={`upcoming-event ${event.dates.length ? "" : "is-tba"}`}
                  key={event.key}
                >
                  <p className="upcoming-event-date">
                    {formatDates(event.dates)}
                  </p>
                  <div className="upcoming-event-copy">
                    <h4>{event.programme.name}</h4>
                    <p>{event.programme.detail}</p>
                  </div>
                  <div className="upcoming-event-meta">
                    <Link href={`/projects/${event.programme.arm}/`}>
                      <span
                        className={`calendar-dot arm-${event.programme.arm}`}
                        aria-hidden="true"
                      />
                      {armNames[event.programme.arm]}
                    </Link>
                    <span>
                      <Repeat size={14} aria-hidden="true" />
                      {event.programme.frequency}
                      {event.dates.length > 0 &&
                        ` · ${ruleLabels[event.programme.rule]}`}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}
