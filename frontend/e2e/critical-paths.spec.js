import { test, expect } from '@playwright/test';

test.describe('Shemsu Critical Paths', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test('Marketplace Home rendering', async ({ page }) => {
    await expect(page).toHaveTitle(/Shemsu/);
    // Verified text from MarketplaceHome.jsx
    await expect(page.locator('h1')).toContainText(/Quality from Global Vendors/i);
  });

  test('Navigation to Login and Signup', async ({ page }) => {
    // Navigate to Login
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('h2')).toContainText(/Welcome Back/i);

    // Navigate to Signup
    await page.goto('/signup');
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('h2')).toContainText(/Create an account/i);
  });

  test('Cart functionality access', async ({ page }) => {
    // Click cart icon in navbar
    await page.locator('header a[href="/app/cart"]').click();
    // Should redirect to login if not authenticated (ProtectedRoute)
    await expect(page).toHaveURL(/.*login/);
  });
});
