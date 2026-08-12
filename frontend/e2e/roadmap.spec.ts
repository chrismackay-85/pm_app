import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/roadmap/overview");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("navigates from the board into the roadmap overview", async ({ page }) => {
  await page.goto("/board");
  await page.getByRole("link", { name: "Roadmap" }).click();
  await expect(page).toHaveURL(/\/roadmap\/overview/);

  await expect(
    page.getByRole("heading", { name: "Salesforce CRM Rollout — Ecommerce Brand Managers" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Executive Summary" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Risks to Watch" })).toBeVisible();
});

const appendixLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

for (const letter of appendixLetters) {
  test(`renders Appendix ${letter} with its seeded content`, async ({ page }) => {
    await page.getByRole("combobox", { name: "Jump to appendix" }).selectOption(letter.toLowerCase());
    await expect(page).toHaveURL(new RegExp(`/roadmap/${letter.toLowerCase()}`));
    await expect(page.getByRole("heading", { name: new RegExp(`Appendix ${letter}`) })).toBeVisible();
  });
}

test("edits an appendix table cell and adds a row", async ({ page }) => {
  await page.getByRole("combobox", { name: "Jump to appendix" }).selectOption("g");
  await expect(page.getByRole("heading", { name: /Appendix G/ })).toBeVisible();

  await page.getByRole("button", { name: "Open", exact: true }).click();
  const editInput = page.locator("input").last();
  await editInput.fill("Mitigated");
  await editInput.press("Enter");
  await expect(page.getByRole("button", { name: "Mitigated" })).toBeVisible();

  const rowCountBefore = await page.locator("tbody tr").count();
  await page.getByRole("button", { name: "Add row" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(rowCountBefore + 1);
});

test("edits an Appendix H freeform section", async ({ page }) => {
  await page.getByRole("combobox", { name: "Jump to appendix" }).selectOption("h");
  await expect(page.getByRole("heading", { name: /Data Governance/ })).toBeVisible();

  const textarea = page.getByRole("textbox").first();
  await textarea.fill("PII and sentiment data only.");
  await textarea.blur();
  await expect(textarea).toHaveValue("PII and sentiment data only.");
});
