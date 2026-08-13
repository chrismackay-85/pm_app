import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/notes/meeting-notes");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("navigates from the top nav into Notes, defaulting to Meeting Notes", async ({ page }) => {
  await page.goto("/board");
  await page.getByRole("link", { name: "Notes" }).click();
  await expect(page).toHaveURL(/\/notes\/meeting-notes/);
  await expect(page.getByRole("heading", { name: "Meeting Notes" })).toBeVisible();
  await expect(page.locator('input[value="Kickoff Sync"]')).toBeVisible();
});

test("switches between the three Notes tabs via the dropdown", async ({ page }) => {
  const dropdown = page.getByRole("combobox", { name: "Jump to notes tab" });

  await dropdown.selectOption("data-dictionary");
  await expect(page).toHaveURL(/\/notes\/data-dictionary/);
  await expect(page.getByRole("heading", { name: "Data Dictionary" })).toBeVisible();

  await dropdown.selectOption("ai-notes");
  await expect(page).toHaveURL(/\/notes\/ai-notes/);
  await expect(page.getByText("AI Notes coming soon")).toBeVisible();

  await dropdown.selectOption("meeting-notes");
  await expect(page).toHaveURL(/\/notes\/meeting-notes/);
});

test("adds, edits, and deletes a meeting note", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Delete meeting note" })).toHaveCount(1);
  await page.getByRole("button", { name: "Add meeting note" }).click();
  await expect(page.getByRole("button", { name: "Delete meeting note" })).toHaveCount(2);

  const newTitleInput = page.getByPlaceholder("Meeting title").first();
  await newTitleInput.fill("Sprint Planning");
  await newTitleInput.blur();
  const newNotesInput = page.getByPlaceholder("Notes…").first();
  await newNotesInput.fill("Discussed backlog priorities.");
  await newNotesInput.blur();

  await expect(newTitleInput).toHaveValue("Sprint Planning");

  await page.getByRole("button", { name: "Delete meeting note" }).first().click();
  await expect(page.getByRole("button", { name: "Delete meeting note" })).toHaveCount(1);
  await expect(page.locator('input[value="Kickoff Sync"]')).toBeVisible();
});

test("edits a data dictionary cell, toggles PII, and adds a row", async ({ page }) => {
  await page.getByRole("combobox", { name: "Jump to notes tab" }).selectOption("data-dictionary");

  await page.getByRole("button", { name: "customer_email", exact: true }).click();
  const editInput = page.locator('input:not([type="checkbox"])');
  await editInput.fill("customer_phone");
  await editInput.press("Enter");
  await expect(page.getByRole("button", { name: "customer_phone" })).toBeVisible();

  const piiCheckbox = page.getByLabel(/PII\/Sensitive for customer_phone/);
  await expect(piiCheckbox).toBeChecked();
  await piiCheckbox.uncheck();
  await expect(piiCheckbox).not.toBeChecked();

  const rowCountBefore = await page.locator("tbody tr").count();
  await page.getByRole("button", { name: "Add row" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(rowCountBefore + 1);
});

test("asks for confirmation before deleting a data dictionary row", async ({ page }) => {
  await page.getByRole("combobox", { name: "Jump to notes tab" }).selectOption("data-dictionary");
  await expect(page.getByRole("heading", { name: "Data Dictionary" })).toBeVisible();

  const rowCountBefore = await page.locator("tbody tr").count();
  await page.getByRole("button", { name: "Delete row" }).first().click();

  const dialog = page.getByRole("dialog", { name: "Delete row" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/customer_email/)).toBeVisible();

  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(rowCountBefore);

  await page.getByRole("button", { name: "Delete row" }).first().click();
  await page.getByRole("dialog", { name: "Delete row" }).getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(rowCountBefore - 1);
  await expect(page.getByRole("button", { name: "customer_email", exact: true })).toHaveCount(0);
});
