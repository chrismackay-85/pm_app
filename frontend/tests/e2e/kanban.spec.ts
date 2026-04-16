import { test, expect, Page, Locator } from "@playwright/test";

async function dragCard(page: Page, source: Locator, destination: Locator) {
  const sourceBox = await source.boundingBox();
  const destinationBox = await destination.boundingBox();

  if (!sourceBox || !destinationBox) {
    throw new Error("Could not determine bounding boxes for drag-and-drop");
  }

  const startX = sourceBox.x + sourceBox.width / 2;
  const startY = sourceBox.y + sourceBox.height / 2;
  const endX = destinationBox.x + destinationBox.width / 2;
  const endY = destinationBox.y + destinationBox.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(endX, endY, { steps: 12 });
  await page.mouse.up();
}

test("columns render and can be renamed", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 10_000 });

  const columnBacklog = page.getByTestId("column-col-backlog");
  await expect(columnBacklog).toBeVisible();

  const renameButton = page.getByTestId("rename-button-col-backlog");
  await renameButton.click();

  const newTitle = "Backlog (Updated)";
  const renameInput = page.getByTestId("rename-input-col-backlog");
  await renameInput.fill(newTitle);
  await page.getByTestId("rename-save-col-backlog").click();

  await expect(page.getByTestId("column-title-col-backlog")).toHaveText(newTitle);
});

test("add card, delete card, and move card via drag-and-drop", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 10_000 });

  const doneColumn = page.getByTestId("column-col-done");
  const doneDropZone = page.getByTestId("column-drop-col-done");
  const backlogColumn = page.getByTestId("column-col-backlog");

  // Add to a specific column (pick Testing)
  const addTitle = "New task";
  await page.getByTestId("add-title-col-testing").fill(addTitle);
  await page.getByTestId("add-details-col-testing").fill("Some details");
  await page.getByTestId("add-button-col-testing").click();

  await expect(page.getByTestId("column-col-testing")).toContainText(addTitle);

  // Delete an existing dummy card (card-5 lives in Testing)
  const cardToDelete = page.getByTestId("card-card-5");
  await expect(cardToDelete).toBeVisible();
  await page.getByTestId("delete-card-card-5").click();
  await expect(page.getByTestId("card-card-5")).toHaveCount(0);

  // Drag a known card (card-1) from Backlog to Done.
  const sourceCard = page.getByTestId("card-card-1");
  await expect(sourceCard).toBeVisible();

  await dragCard(page, sourceCard, doneDropZone);

  await expect(doneColumn.getByTestId("card-card-1")).toHaveCount(1);
  await expect(backlogColumn.getByTestId("card-card-1")).toHaveCount(0);
});

