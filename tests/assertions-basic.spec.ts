import { test, expect } from '@playwright/test';

test('Assertions 1 - expect co ban', async ({ page }) => {
    await page.setContent(`
    <html>
      <head>
        <title>Assertions Basic</title>
      </head>
      <body>
        <h1 data-testid="page-title">Login Form</h1>

        <input data-testid="email" value="ha@test.com" />

        <button data-testid="submit">Sign in</button>

        <label>
          <input type="checkbox" data-testid="remember" checked />
          Remember me
        </label>

        <ul data-testid="menu">
          <li>Home</li>
          <li>Products</li>
          <li>Contact</li>
        </ul>

        <p data-testid="status" style="display:none">Success</p>
      </body>
    </html>
  `);

    // 1) Generic assertions
    const env = 'staging';
    const menuItems = ['Home', 'Products', 'Contact'];

    expect(env).toBe('staging');
    expect(menuItems).toContain('Products');

    // 2) Page assertion
    await expect(page).toHaveTitle('Assertions Basic');

    // 3) Locator assertions
    await expect(page.getByTestId('page-title')).toHaveText('Login Form');
    await expect(page.getByTestId('submit')).toBeVisible();
    await expect(page.getByTestId('email')).toHaveValue('ha@test.com');
    await expect(page.getByTestId('remember')).toBeChecked();
    await expect(page.locator('[data-testid="menu"] li')).toHaveCount(3);
    await expect(page.getByTestId('status')).not.toBeVisible();
});