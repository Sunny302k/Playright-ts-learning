import { test, expect } from '@playwright/test';

test('demo trace viewer', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/.*wrong-url/);
});