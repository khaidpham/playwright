import { test, expect } from '@playwright/test';

test.describe('Home page no auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('check sign in link', async ({ page }) => {
    // Check Sing In link is present
    await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
  });

  test('check page title', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('content grid loads 9 items', async ({ page }) => {
    // Check the count of items on the page
    const productGrid = page.locator('.col-md-9');
    await expect(productGrid.getByRole('link')).toHaveCount(9);
  });

  test('check search results', async ({ page }) => {
    // Search for Thor Hammer
    await page.getByTestId('search-query').fill('Thor Hammer');
    await page.getByTestId('search-submit').click();
    await expect(page.getByTestId('search-caption')).toHaveText('Searched for: Thor Hammer');
    // Visual test search results, with an allow different pixel ratio
    await expect(page).toHaveScreenshot('thorHammer.png', { maxDiffPixelRatio: 0.2 });
  });

  // Home page visual test is flaky due to load time
  // test('visual test', async ({ page }) => {
  //   // Verify screenshot
  //   await expect(page).toHaveScreenshot('homepage.png');
  // });
});
test.describe('Home page customer 01 auth', () => {
  test.use({ storageState: '.auth/customer01.json'  });
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('check signed in customer info', async ({ page }) => {
    // Check Signed in customer info
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe')
  });
});