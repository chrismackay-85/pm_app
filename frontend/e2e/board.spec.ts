import { test, expect, type Page } from "@playwright/test";

async function resetBoard(page: Page) {
  await page.goto("/board");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function dragCard(page: Page, cardTitle: string, targetTitle: string) {
  const source = page.locator('[role="button"][aria-roledescription="sortable"]', {
    has: page.locator(`h4:text-is("${cardTitle}")`),
  });
  const target = page.locator('[role="button"][aria-roledescription="sortable"]', {
    has: page.locator(`h4:text-is("${targetTitle}")`),
  });
  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();
  if (!sourceBox || !targetBox) throw new Error("Could not locate drag elements");

  await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(sourceBox.x + sourceBox.width / 2 + 10, sourceBox.y + sourceBox.height / 2 + 10, {
    steps: 5,
  });
  await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 15 });
  await page.mouse.up();
}

test.beforeEach(async ({ page }) => {
  await resetBoard(page);
});

test("loads with the seeded columns and cards", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Backlog · 4" })).toBeVisible();
  await expect(page.getByRole("button", { name: "In Progress · 2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Blocked · 2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "In Review · 2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Done · 3" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "API Activation" })).toBeVisible();
});

test("drags a card to a different column", async ({ page }) => {
  await dragCard(page, "API Activation", "Data Migration & Quality Readiness");

  await expect(page.getByRole("button", { name: "Blocked · 1" })).toBeVisible();
  await expect(page.getByRole("button", { name: "In Progress · 3" })).toBeVisible();
});

test("reorders a card within the same column", async ({ page }) => {
  const column = page.locator('[data-column-id="in-review"]');
  await dragCard(page, "UX Mockups (Sentiment & Onboarding Status)", "Field Mapping & API Documentation");

  const titles = column.locator("h4");
  await expect(titles.first()).toHaveText("UX Mockups (Sentiment & Onboarding Status)");
});

test("adds a new card via the dialog", async ({ page }) => {
  await page.getByRole("button", { name: "Add card" }).first().click();
  await page.getByPlaceholder("Title").fill("New rollout task");
  await page.getByPlaceholder("Details").fill("Some extra detail");
  await page.getByRole("button", { name: "Add card" }).last().click();

  await expect(page.getByRole("button", { name: "Backlog · 5" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "New rollout task" })).toBeVisible();
});

test("adds a new column", async ({ page }) => {
  await page.getByRole("button", { name: "Add column" }).click();
  await page.getByPlaceholder("Column name").fill("QA Check");
  await page.getByPlaceholder("Column name").press("Enter");

  await expect(page.getByRole("button", { name: "QA Check · 0" })).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  const card = page.locator('[role="button"][aria-roledescription="sortable"]', {
    has: page.locator('h4:text-is("Discovery")'),
  });
  await card.hover();
  await card.getByLabel("Delete card").click();

  await expect(page.getByRole("heading", { name: "Discovery" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Done · 2" })).toBeVisible();
});

test("renames a column inline", async ({ page }) => {
  const backlogColumn = page.locator('[data-column-id="backlog"]');
  await backlogColumn.getByRole("button", { name: "Backlog · 4" }).click();
  const input = backlogColumn.locator("input");
  await input.fill("Icebox");
  await input.press("Enter");

  await expect(page.getByRole("button", { name: "Icebox · 4" })).toBeVisible();
});

test("archives a card and unarchives it from the archive view", async ({ page }) => {
  const card = page.locator('[role="button"][aria-roledescription="sortable"]', {
    has: page.locator('h4:text-is("Testing & UAT")'),
  });
  await card.hover();
  await card.getByLabel("Archive card").click();

  await expect(page.getByRole("heading", { name: "Testing & UAT" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Blocked · 1" })).toBeVisible();

  await page.getByRole("link", { name: "Archive" }).click();
  await expect(page).toHaveURL(/\/board\/archive/);
  await expect(page.getByRole("heading", { name: "Testing & UAT" })).toBeVisible();

  await page.getByRole("button", { name: "Unarchive" }).click();
  await expect(page.getByText("Testing & UAT")).toHaveCount(0);

  await page.getByRole("link", { name: "Board" }).first().click();
  await expect(page.getByRole("button", { name: "Blocked · 2" })).toBeVisible();
});

test("search filters cards by title and details", async ({ page }) => {
  await page.getByPlaceholder("Search cards").fill("api");
  await expect(page.getByRole("heading", { name: "API Activation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Discovery" })).toHaveCount(0);

  await page.getByPlaceholder("Search cards").fill("");
  await expect(page.getByRole("heading", { name: "Discovery" })).toBeVisible();
});
