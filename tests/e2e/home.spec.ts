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
});
