import { test, expect } from '@playwright/test';

test('Sign in banner appears when not authenticated', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByText('You are not signed in. Please log in or register'),
  ).toBeVisible();
});

test('Sign in banner does not appear when authenticated', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('input[name="emailOrUsername"]').click();
  await page.locator('input[name="emailOrUsername"]').fill('charlie');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForURL('**/');
  await expect(
    page.getByText('You are not signed in. Please log in or register'),
  ).not.toBeVisible();
});
