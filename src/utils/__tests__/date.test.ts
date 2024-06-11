import { add, sub } from "date-fns";
import { formatDistanceToNowInDays } from "../date";

test("formatDistanceToNowInDays", () => {
  // Test case 1: Date is today
  const today = new Date();
  expect(formatDistanceToNowInDays(today)).toBe("today");

  // Test case 2: Date is in the past
  const pastDate = sub(today, { months: 1 });
  expect(formatDistanceToNowInDays(pastDate)).toBe("about 1 month ago");

  // Test case 3: Date is in the future
  const futureDate = add(today, { years: 1, days: 1 });
  expect(formatDistanceToNowInDays(futureDate)).toBe("in about 1 year");
});
