import { test, expect } from '@playwright/test';

test('Assertion 1 - debug with UI mode', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveURL('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/.*docs/);

    // Cố tình viết sai để tạo lỗi debug
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    //await expect(page.getByText('Node.js')).toBeVisible();
})   