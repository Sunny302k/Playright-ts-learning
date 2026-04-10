import { test, expect } from '@playwright/test';

test('homework- completed item should not appear in Active list', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    await newTodoInput.fill('Learn locator');
    await newTodoInput.press('Enter'); // Ở trang todomvc, muốn thêm item vào list thì phải nhấn phím Enter

    await newTodoInput.fill('Learn assertions');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Learn debug');
    await newTodoInput.press('Enter');

    // Giới hạn phạm vi trong danh sách todo
    const todoList = page.locator('.todo-list');
    const todoItems = todoList.getByRole('listitem');

    //Verify đã có đúng 3 item
    await expect(todoItems).toHaveCount(3);

    // Lọc đúng item "Learn locator"
    const learnLocatorItem = todoItems.filter({ hasText: 'Learn locator' });
    await expect(learnLocatorItem).toHaveCount(1);

    // Complete item "Learn locator"
    await learnLocatorItem.getByRole('checkbox').check();

    // Verify item đã completed
    await expect(learnLocatorItem).toHaveClass(/completed/);

    // Click tab Active
    await learnLocatorItem.getByRole('link', { name: 'Active' }).click();

    // Verify trong Active list chỉ còn 2 item
    await expect(learnLocatorItem).toHaveCount(2);

    // Verify item "Learn locator" không còn trong Active list
    const learnLocatorItemActiveList = todoItems.filter({ hasText: 'Learn locator' });
    await expect(learnLocatorItemActiveList).toHaveCount(0);


    //Verify 2 item còn lại đúng là Learn assertions và Learn debug
    await expect(todoItems).toHaveText(['Learn assertions', 'Learn debug']);
});