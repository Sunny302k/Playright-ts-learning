import { test, expect } from '@playwright/test';

test('login success', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.fill('#email', 'tester@example.com');
  await page.fill('#password', '123456');
  await page.click('button[type="submit"]');

  await expect(page.locator('h1')).toHaveText('Dashboard');
});