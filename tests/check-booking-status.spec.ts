import { test, expect } from "@playwright/test";
const CURRENT_YEAR = new Date().getFullYear();
test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Check My Booking" }).click();
  await page.getByPlaceholder("ex. JSabcdefg").fill("Jsfhjsdff");
  await page.getByRole("button", { name: "Check My Booking" }).click();
  await expect(page.locator(".MuiAlert-message")).toBeVisible();
  await page.getByPlaceholder("ex. JSabcdefg").click();
  await page.getByPlaceholder("ex. JSabcdefg").fill("JSP5d4HLhc");
  await page.getByPlaceholder("ex. john_smith@gmail.com").click();
  await page.getByPlaceholder("ex. john_smith@gmail.com").fill("johnsmith@gmail.com");
  await page.getByRole("button", { name: "Check My Booking" }).click();
  await expect(page.getByText("Welcome To Your Bookings")).toBeVisible();
  await page.getByRole("button", { name: "Calendar" }).click();
  await expect(page.locator(".fc-toolbar-title")).toContainText(`${CURRENT_YEAR}`);
  await expect(page.getByRole("button", { name: "today" })).toBeVisible();
  await expect(page.getByTitle("Year view")).toBeVisible();
  await expect(page.getByTitle("Month view")).toBeVisible();
  await page.getByRole("button", { name: "Month" }).click();
  await expect(page.locator(".fc")).toBeVisible();

  await page.getByRole("button", { name: "Card" }).click();
  await expect(page.getByTitle("container-0")).toContainText("Booking ID");
  await expect(page.getByTitle("container-0").locator("div")).toContainText([
    "Booking ID",
    "Current Booking Status",
    "Booking Date",
    "Start Time",
    "End Time",
    "No. of Participants",
    "Hall Reserved",
  ]);

  await page.getByRole("button", { name: "GO BACK" }).click();
  await expect(page.locator(".confirm-container > h3")).toContainText("CHECK BOOKING STATUS");
});
