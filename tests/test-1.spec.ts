import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('ex. John', { exact: true }).click();
  await page.getByPlaceholder('ex. John', { exact: true }).fill('John');
  await page.getByPlaceholder('ex. John', { exact: true }).press('Tab');
  await page.getByPlaceholder('ex. Smith').fill('Smith');
  await page.getByPlaceholder('ex. Smith').press('Tab');
  await page.getByPlaceholder('ex. 07711448788').fill('0123456788');
  await page.getByPlaceholder('ex. 07711448788').press('Tab');
  await page.getByPlaceholder('ex. john.smith@gmail.com').fill('johnsmith@gmail.com');
  await page.getByPlaceholder('ex. john.smith@gmail.com').press('Tab');
  await page.getByLabel('Choose Saturday, August 10th,').click();
  await page.getByPlaceholder('Click to select a date').press('Tab');
  await page.getByRole('option', { name: '8:30 AM' }).click();
  await page.getByPlaceholder('Select End Time').click();
  await page.getByRole('option', { name: '10:00 AM' }).click();
  await page.getByPlaceholder('Please enter a value').fill('80');
  await page.getByRole('button', { name: 'Submit Booking' }).click();

  await expect(page.getByTestId('form-confirmation-First Name')).toContainText("John");
  await page.getByRole('button', { name: 'Confirm' }).click();
});