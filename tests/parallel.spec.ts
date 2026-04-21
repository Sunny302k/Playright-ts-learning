/*
- Parallel = chạy nhiều test cùng lúc
- Giúp giảm thời gian test rất nhanh
- Playwright dùng workers
- Test phải độc lập 100%
- Không được phụ thuộc data
 */


import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' }); // cho phép test trong block chạy cùng lúc

test('Test Login 1', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});

test('Test Login 2', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});