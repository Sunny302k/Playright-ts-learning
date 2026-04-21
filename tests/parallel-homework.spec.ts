import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Open Google', async ({ page }) => {
    await page.goto('https://google.com');
})

test('Open Example', async ({ page }) => {
    await page.goto('https://example.com');
})

test('Open Playwright', async ({ page }) => {
    await page.goto('https://playwright.dev')
})