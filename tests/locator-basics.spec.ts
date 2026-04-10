import { test, expect } from '@playwright/test'; //test: để viết test , expect: để kiểm tra kết quả

test('locator basics - add todo and complete one item', async ({ page }) => {
    // 1) Mở trang demo
    // page: tab browser, goto: mở URL, await: đợi làm xong rồi mới qua bước tiếp
    await page.goto('https://demo.playwright.dev/todomvc');

    // 2) Tìm ô input bằng placeholder
    // const: tạo biến để giữ locator này lại dùng nhiều lần,   tìm ô input có placeholder đúng bằng "What needs to be done?"
    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    // 3) Nhập todo thứ 1
    // dùng lại locator,  fill(): nhập text,    press('Enter') = nhấn Enter
    await newTodoInput.fill('Learn locator');
    await newTodoInput.press('Enter');

    // 4) Nhập todo thứ 2
    // dùng lại locator,  fill(): nhập text,    press('Enter') = nhấn Enter
    await newTodoInput.fill('Write first Playwright test');
    await newTodoInput.press('Enter');

    // 5) Tìm tất cả item trong danh sách bằng role
    // tìm tất cả item trong list,   mong đợi danh sách có đúng 2 item
    const todoList = page.locator('.todo-list');
    const todoItems = todoList.getByRole('listitem');
    await expect(todoItems).toHaveCount(2);

    // 6) Lọc đúng item có text "Learn locator"
    // hãy giữ lại item nào có text "Learn locator"
    const learnLocatorItem = todoItems.filter({ hasText: 'Learn locator' });
    await expect(learnLocatorItem).toHaveCount(1);

    // 7) Trong item đó, tìm checkbox và check
    // trong đúng item "Learn locator" => tìm checkbox => check nó
    await learnLocatorItem.getByRole('checkbox').check();

    // 8) Verify item đã được completed
    // mong item này có class chứa chữ completed => “chỉ cần chuỗi class có chứa chữ completed là được”
    await expect(learnLocatorItem).toHaveClass(/completed/);

    // 9) Verify text dưới footer còn 1 item
    // trên trang phải nhìn thấy dòng chữ 1 item left
    await expect(page.getByText('1 item left')).toBeVisible();
});