import { test, expect } from "@playwright/test";

test("loads board with five columns and cards", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
  await expect(page.getByTestId("column-col-1")).toBeVisible();
  await expect(page.getByTestId("column-col-5")).toBeVisible();
  await expect(page.getByTestId("card-card-1")).toBeVisible();
});

test("renames a column", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Backlog" }).click();
  const input = page.getByLabel("Column title");
  await input.fill("Ideas");
  await input.press("Enter");

  await expect(page.getByRole("button", { name: "Ideas" })).toBeVisible();
});

test("adds a new card", async ({ page }) => {
  await page.goto("/");

  const column = page.getByTestId("column-col-1");
  await column.getByLabel("Card title").fill("E2E card");
  await column.getByLabel("Card details").fill("Added by Playwright");
  await column.getByRole("button", { name: "Add card" }).click();

  await expect(page.getByText("E2E card")).toBeVisible();
  await expect(page.getByText("Added by Playwright")).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  await page.goto("/");

  const card = page.getByTestId("card-card-1");
  await card.hover();
  await page.getByRole("button", { name: "Delete Design board layout" }).click();

  await expect(page.getByTestId("card-card-1")).toHaveCount(0);
});

test("drags a card to another column", async ({ page }) => {
  await page.goto("/");

  const handle = page.getByRole("button", {
    name: "Drag Design board layout",
  });
  const dropZone = page.getByTestId("column-drop-col-2");

  const handleBox = await handle.boundingBox();
  const dropBox = await dropZone.boundingBox();

  if (!handleBox || !dropBox) {
    throw new Error("Could not resolve drag targets");
  }

  await page.mouse.move(
    handleBox.x + handleBox.width / 2,
    handleBox.y + handleBox.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    handleBox.x + handleBox.width / 2 + 8,
    handleBox.y + handleBox.height / 2 + 8,
    { steps: 4 },
  );
  await page.mouse.move(
    dropBox.x + dropBox.width / 2,
    dropBox.y + dropBox.height / 2,
    { steps: 20 },
  );
  await page.mouse.up();

  await expect(page.getByTestId("column-col-2").getByTestId("card-card-1")).toBeVisible();
  await expect(page.getByTestId("column-col-1").getByTestId("card-card-1")).toHaveCount(0);
});
