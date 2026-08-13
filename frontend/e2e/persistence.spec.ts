import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/board");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("an appendix table edit survives a page reload", async ({ page }) => {
  await page.goto("/roadmap/g");
  await page.getByRole("button", { name: "Open", exact: true }).click();
  const input = page.locator("input");
  await input.fill("Mitigated");
  await input.press("Enter");
  await expect(page.getByRole("button", { name: "Mitigated" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("button", { name: "Mitigated" })).toBeVisible();
});

test("an Appendix H section edit survives a page reload", async ({ page }) => {
  await page.goto("/roadmap/h");
  const textarea = page.getByRole("textbox").first();
  await textarea.fill("PII and sentiment data only.");
  await textarea.blur();

  await page.reload();
  await expect(page.getByRole("textbox").first()).toHaveValue("PII and sentiment data only.");
});

test("Kanban board edits survive a page reload", async ({ page }) => {
  await page.goto("/board");
  await page.getByRole("button", { name: "Add card" }).first().click();
  await page.getByPlaceholder("Title").fill("Persisted task");
  await page.getByPlaceholder("Details").fill("Should still be here after reload");
  await page.getByRole("button", { name: "Add card" }).last().click();
  await expect(page.getByRole("heading", { name: "Persisted task" })).toBeVisible();

  const card = page.locator('[role="button"][aria-roledescription="sortable"]', {
    has: page.locator('h4:text-is("Discovery")'),
  });
  await card.hover();
  await card.getByLabel("Archive card").click();

  await page.reload();

  await expect(page.getByRole("heading", { name: "Persisted task" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Discovery" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Backlog · 5" })).toBeVisible();
});

test("Notes edits survive a page reload", async ({ page }) => {
  await page.goto("/notes/meeting-notes");
  await page.getByRole("button", { name: "Add meeting note" }).click();
  const titleInput = page.getByPlaceholder("Meeting title").first();
  await titleInput.fill("Persisted meeting");
  await titleInput.blur();

  await page.goto("/notes/data-dictionary");
  await page.getByRole("button", { name: "customer_email", exact: true }).click();
  const input = page.locator("input:not([type])");
  await input.fill("customer_phone");
  await input.press("Enter");

  await page.reload();

  await expect(page.getByRole("button", { name: "customer_phone" })).toBeVisible();
  await page.goto("/notes/meeting-notes");
  await expect(page.locator('input[value="Persisted meeting"]')).toBeVisible();
});
