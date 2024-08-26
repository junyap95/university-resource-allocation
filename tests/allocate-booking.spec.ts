import { test, expect } from "@playwright/test";
import { MOCK_REQUESTS, MOCK_RESULTS_TIME } from "../src/utilities/constants";

test("test", async ({ page }) => {
  // route fulfilment has to be at the top
  await page.route("http://localhost:3001/view-entry", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(MOCK_REQUESTS),
    });
  });
  await page.route("http://localhost:3001/execute-algorithm", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(MOCK_RESULTS_TIME),
    });
  });
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "BBK Staff" }).click();
  await page.getByRole("button", { name: "LOG IN" }).click();
  await page.getByRole("button", { name: "All Bookings" }).click();
  const bookingTable = await page.locator("#booking");

  await expect(bookingTable.locator("thead > tr > th")).toContainText([
    "request_id",
    "client_id",
    "start_date",
    "start_time",
    "end_time",
    "capacity",
    "booking_status",
  ]);
  await page.getByLabel("").first().click();
  await page.getByRole("option").first().click();
  await page.getByLabel("").nth(1).click();
  await page.getByRole("option", { name: "Greedy - Earliest Start Time" }).click();
  await page.getByRole("button", { name: "Allocate this Date" }).click();
  const allocatedTable = await page.locator("#alloc-table");
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
  const failedTable = await page.locator("#failed-table");
  await expect(failedTable.locator("thead > tr > th")).toContainText([
    "request_id",
    "client_id",
    "start_time",
    "end_time",
    "capacity",
  ]);
});
