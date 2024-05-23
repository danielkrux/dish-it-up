import test, { expect } from "@playwright/test";

test("create", async ({ page }) => {
  await page.goto("/recipe/add");
  await page.getByPlaceholder("e.g. https://example.com").click();
  await page
    .getByPlaceholder("e.g. https://example.com")
    .fill("https://www.eefkooktzo.nl/makkelijke-moussaka/");
  await page.locator("button").filter({ hasText: "Import Recipe" }).click();
  await page.getByTestId("add-recipe").locator("div").first().click();
  await expect(
    page.getByTestId("recipe-card-0").getByText("Makkelijke Moussaka", {
      exact: true,
    })
  ).toBeVisible();
});

test.describe("edit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("recipe-card-0").click();
    await page.getByTestId("recipe-detail-menu").click();
    await page.getByText("Edit").click();
    expect(page.url()).toContain("/edit");
  });

  test("simple inputs", async ({ page }) => {
    const title = `${Math.random()}`;
    const description = `${Math.random()}`;
    const totalTime = `${Math.random()}`;
    const recipeYield = `${Math.random()}`;

    const nameInput = page.locator('input[id="name"]');
    const descriptionInput = page.locator('textarea[id="description"]');
    const totalTimeInput = page.locator('input[id="total_time"]');
    const recipeYieldInput = page.locator('input[id="recipe_yield"]');

    await nameInput.click();
    await nameInput.fill(title);
    await descriptionInput.click();
    await descriptionInput.fill(description);
    await totalTimeInput.click();
    await totalTimeInput.fill(totalTime);
    await recipeYieldInput.click();
    await recipeYieldInput.fill(recipeYield);
    await page.locator("button").filter({ hasText: "Save" }).click();
    await expect(page.getByTestId("toastAnimatedContainer")).toContainText(
      "Recipe updated!"
    );

    await page.getByTestId("recipe-card-0").click();
    await expect(page.getByTestId("home-recipe-detail")).toContainText(title);
    await expect(page.getByTestId("home-recipe-detail")).toContainText(
      description
    );
    await expect(page.getByTestId("home-recipe-detail")).toContainText(
      totalTime
    );
    await expect(page.getByTestId("home-recipe-detail")).toContainText(
      recipeYield
    );
  });

  test("categories", async ({ page }) => {});
});

test("add grocery list", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("recipe-card-0").click();
  await page.getByTestId("recipe-detail-menu").click();
  await page.getByText("Add to Grocery List").click();
  await page.getByText("Save").click();
  await page.goto("/grocery-list");
});

test("delete", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("recipe-detail-menu").click();
  await page.getByText("Delete").click();
  await page.getByText("Recipe deleted!").waitFor({ state: "hidden" });
});
