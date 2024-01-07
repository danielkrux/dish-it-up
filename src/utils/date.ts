import { formatDistanceToNow } from "date-fns";

export function formatDistanceToNowInDays(date: Date): string {
  const oneDay = 1000 * 3600 * 24;
  const distance = Date.now() - date.getTime();
  if (distance < oneDay && distance > 0) {
    return "Today";
  }
  return formatDistanceToNow(date, { addSuffix: true });
}
