import { test, expect } from '@playwright/test';

test('User is prevented from replying', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Category 2' }).click();
  await page.waitForURL('**/forum/category-2-5408');
  await page
    .getByRole('link', {
      name: 'Arctic Monkeys tribute act headline Glastonbury',
    })
    .click();
  await page.waitForURL('**/arctic-monkeys-tribute');
  expect(
    page.getByRole('link', { name: 'Sign in to reply to this thread' }),
  ).toBeVisible();
});
