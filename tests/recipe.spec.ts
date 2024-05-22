import test, { expect } from "@playwright/test";

test("create recipe", async ({ page }) => {
  await page.goto("/recipe/add");
  await page.getByPlaceholder("e.g. https://example.com").click();
  await page
    .getByPlaceholder("e.g. https://example.com")
    .fill("https://www.eefkooktzo.nl/makkelijke-moussaka/");
  await page
    .locator("div")
    .filter({ hasText: /^Import recipe$/ })
    .first()
    .click();
  await page.getByTestId("add-recipe").locator("div").first().click();
  await expect(
    page.getByTestId("recipe-card-0").getByText("Makkelijke Moussaka", {
      exact: true,
    })
  ).toBeVisible();
});
