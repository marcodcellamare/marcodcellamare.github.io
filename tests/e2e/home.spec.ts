import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test('Should display correct title', async ({ page }) => {
		await page.goto('/');

		const heading = page.getByRole('heading', {
			name: /The Portfolio of Marco D\. Cellamare/,
		});
		await heading.waitFor({ state: 'visible' });
		await expect(page).toHaveTitle(/The Portfolio of Marco D\. Cellamare/);
	});

	test('Menu slides in when toggler is clicked', async ({ page }) => {
		await page.goto('/');

		const toggler = page.locator('.nav-toggler');
		const menu = page.locator('nav .nav-menu');

		await expect(toggler).toBeAttached();
		await expect(menu).toBeAttached();

		// Initial hidden state: offscreen to the left
		await expect(menu).toHaveCSS('translate', /-100%/);

		// Click toggler
		await toggler.click();

		// Wait for it to slide into view
		await expect(menu).toHaveCSS('translate', '0px');
	});
});
