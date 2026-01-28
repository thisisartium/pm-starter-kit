import { DateTime } from "luxon";

export function getLastCalendarWeekRange(timeZone: string) {
  const zoneCandidate = DateTime.now().setZone(timeZone);
  const resolvedZone = zoneCandidate.isValid ? timeZone : "UTC";
  const now = DateTime.now().setZone(resolvedZone);
  const startOfThisWeek = now.startOf("week");
  const startOfLastWeek = startOfThisWeek.minus({ weeks: 1 });
  const endOfLastWeek = startOfThisWeek.minus({ milliseconds: 1 });

  return {
    start: startOfLastWeek,
    end: endOfLastWeek,
  };
}

export function getLastCalendarWeekIsoRange(timeZone: string) {
  const range = getLastCalendarWeekRange(timeZone);
  return {
    startIso: range.start.toUTC().toISO(),
    endIso: range.end.toUTC().toISO(),
    display: `${range.start.toFormat("LLL d")}–${range.end.toFormat("LLL d, yyyy")}`,
  };
}
