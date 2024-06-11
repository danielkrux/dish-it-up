import { isValidUrl } from "../url";

test("isValidUrl", () => {
  // Test case 1: Valid URL
  expect(isValidUrl("https://www.example.com")).toBe(true);

  // Test case 2: Invalid URL
  expect(isValidUrl("example.com")).toBe(false);
});
