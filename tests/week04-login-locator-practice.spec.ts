import { test, expect, Page } from '@playwright/test';

function getLoginPageLocators(page: Page) {
    return {
        emailInput: page.getByPlaceholder('Enter your email'),
        passwordInput: page.getByLabel('Password'),
        signInButton: page.getByRole('button', { name: 'Sign in' }),
        errorMessage: page.getByRole('alert'),
        successMessage: page.getByText('Welcome back'),
    };
}

test.describe('Week 04 - Locator practice with login', () => {
    test.beforeEach(async ({ page }) => {
        await page.setContent(`
      <main>
        <h1>Login</h1>

        <form aria-label="Login form">
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Sign in</button>

          <p id="error-message" role="alert" hidden></p>
          <h2 id="success-message" hidden>Welcome back</h2>
        </form>

        <script>
          const form = document.querySelector('form');
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const errorMessage = document.getElementById('error-message');
          const successMessage = document.getElementById('success-message');

          form.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;

            errorMessage.hidden = true;
            successMessage.hidden = true;
            errorMessage.textContent = '';

            if (email === 'student@test.com' && password === 'pw123456') {
              successMessage.hidden = false;
              return;
            }

            errorMessage.textContent = 'Invalid email or password';
            errorMessage.hidden = false;
          });
        </script>
      </main>
    `);
    });

    test('should locate login elements correctly', async ({ page }) => {
        const loginPage = getLoginPageLocators(page);

        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.signInButton).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = getLoginPageLocators(page);

        await loginPage.emailInput.fill('student@test.com');
        await loginPage.passwordInput.fill('pw123456');
        await loginPage.signInButton.click();

        await expect(loginPage.successMessage).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        const loginPage = getLoginPageLocators(page);

        await loginPage.emailInput.fill('wrong@test.com');
        await loginPage.passwordInput.fill('wrong-password');
        await loginPage.signInButton.click();

        await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
        await expect(loginPage.errorMessage).toBeVisible();
    });
});