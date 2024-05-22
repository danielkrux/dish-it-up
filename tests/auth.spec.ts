import { test, expect } from "@playwright/test";

test("login flow succeeds", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("danielmartijn@gmail.com");
  await page.locator('input[type="email"]').press("Tab");
  await page.getByRole("link", { name: "Forgot Password?" }).press("Tab");
  await page.locator('input[type="password"]').fill("testpas");
  await page.locator('input[type="password"]').press("Enter");
  await expect(page.locator("#root")).toContainText("Something went wrong");
  await page
    .locator("div")
    .filter({ hasText: /^Confirm$/ })
    .first()
    .click();
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("testpass");
  await page
    .locator("div")
    .filter({ hasText: /^Sign In$/ })
    .first()
    .click();
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await page.getByRole("link", { name: "Settings" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Sign out$/ })
    .first()
    .click();
});
