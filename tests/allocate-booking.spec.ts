import { test, expect } from "@playwright/test";
import { MOCK_REQUESTS } from "../src/utilities/constants";

test("test", async ({ page }) => {
  await page.route("http://localhost:3001/view-entry", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(MOCK_REQUESTS),
    });
  });
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "BBK Staff" }).click();
  await page.getByRole("button", { name: "All Bookings" }).click();

  const bookingTable = page.locator("#booking");
  if (await bookingTable.isVisible()) {
    await expect(bookingTable.locator("thead > tr > th")).toContainText([
      "request_id",
      "client_id",
      "start_date",
      "start_time",
      "end_time",
      "capacity",
      "booking_status",
    ]);
  } else {
    console.log("Element is not visible, skipping this part of the test.");
  }

  await page.getByLabel("").first().click();
  await page.getByRole("option").first().click();
  await page.getByLabel("").nth(1).click();
  await page.getByRole("option", { name: "Greedy - Earliest Start Time" }).click();
  await page.getByRole("button", { name: "Allocate this Date" }).click();

  const allocatedTable = page.locator("#alloc-table");
  await allocatedTable.waitFor();
  if (await allocatedTable.isVisible()) {
    await expect(allocatedTable.locator("thead > tr > th")).toContainText([
      "request_id",
      "client_id",
      "start_time",
      "end_time",
      "capacity",
      "hall_assigned",
      "space_utilised",
      "profit",
    ]);
  } else {
    console.log("Element is not visible, skipping this part of the test.");
  }

  const failedTable = page.locator("#failed-table");
  if (await failedTable.isVisible()) {
    await expect(failedTable.locator("thead > tr > th")).toContainText([
      "request_id",
      "client_id",
      "start_time",
      "end_time",
      "capacity",
    ]);
  } else {
    console.log("Element is not visible, skipping this part of the test.");
  }
});
