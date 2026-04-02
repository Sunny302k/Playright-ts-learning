import { test, expect } from '@playwright/test'; // lấy test để 'tạo 1 bài test', lấy expect để kiểm tra kết quả


/*
    - async: đặt trước function để nói rằng, bên trong function này sẽ có việc phải chờ
    - await: 
 */
test('pass - example page title', async ({ page }) => { // bắt đầu 1 test, tên test là "example page title", page là tab browser mà Playwrighr mở cho test này
    await page.goto('https://example.com'); //đợi việc này xong rồi mới làm tiếp
    await expect(page).toHaveTitle(/Example Domain/);
});


/*
    - Tạo 1 test mới
    - Tên test là: fail - login button should be visible
    - Test này có thao tác cần chờ nên dùng async
    - page là tab browser
*/
test('fail - login button should be visible', async ({ page }) => {
    await page.goto('https://example.com'); // mở trạng https:...

    //page.getByRole('button',...): tìm phần tử trên trang theo role, ở đây role là button => tìm 1 cái button có tên là "Login?
    // toBeVisible: kiểm tra nút đó có đang hiển thị trên màn hình không => mong đợi nhìn thấy
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});



test('pass  - example page has heading', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.getByText('Example Domain')).toBeVisible();
});