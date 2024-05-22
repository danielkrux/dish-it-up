import { expect, test as setup } from "@playwright/test";

const authFile = "tests/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("danielmartijn@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("testpass");
  await page
    .locator("div")
    .filter({ hasText: /^Sign In$/ })
    .first()
    .click();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
