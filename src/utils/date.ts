import {
  addDays,
  eachDayOfInterval,
  formatDistanceToNow,
  formatRelative,
} from "date-fns";
import { capitalize } from "lodash";

export function formatDistanceToNowInDays(date: Date): string {
  const oneDay = 1000 * 3600 * 24;
  const distance = Date.now() - date.getTime();
  if (distance < oneDay && distance >= 0) {
    return "today";
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatRelativeWithoutTime(date: Date): string {
  const today = new Date();
  const relative = formatRelative(date, today).split(" at")[0];
  return capitalize(relative);
}

export function getNextSevenDays() {
  const today = new Date();
  const weekInterval: Interval = { start: today, end: addDays(today, 6) };
  const nextSevenDays = eachDayOfInterval(weekInterval);

  return nextSevenDays;
}
