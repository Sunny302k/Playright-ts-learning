import { test, expect } from '@playwright/test';

test('Assertion Homework', async ({ page }) => {
  await page.setContent(`
        <html>
      <head>
        <title>Assertions Basic</title>
      </head>
      <body>
        <h1 data-testid="page-title">Login Form</h1>

        <input data-testid="username" value="Sunny" />

        <label>
          <input type="checkbox" data-testid="remember" checked />
          Remember me
        </label>

        <ul data-testid="menu">
          <li>Home</li>
          <li>Products</li>
          <li>Contact</li>
          <li>Notification</li>
        </ul>

        <p data-testid="status" style="display:none">This text is hidden under menu</p>
      </body>
    </html>
    `);

  // Generic assertions
  const env = 'staging';
  const menuItems = ['Home', 'Products', 'Contact', 'Notification'];

  expect(env).toBe('staging');
  expect(menuItems).toContain('Notification');

  // Page assertion
  await expect(page).toHaveTitle('Assertions Basic');

  // Location assertions
  await expect(page.getByTestId('page-title')).toHaveText('Login Form');
  await expect(page.getByTestId('username')).toHaveValue('Sunny');
  await expect(page.getByTestId('remember')).toBeChecked();
  await expect(page.getByTestId('menu')).toHaveCount(4);
  await expect(page.getByTestId('status')).toBeVisible();
})

