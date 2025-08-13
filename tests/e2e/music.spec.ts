import { test, expect } from '@playwright/test';

test.describe('Music Page', () => {
	test('Should display correct title', async ({ page }) => {
		await page.goto('/#/music');

		const heading = page.getByRole('heading', {
			name: /The Portfolio of Marco D\. Cellamare/,
		});
		await heading.waitFor({ state: 'visible' });
		await expect(page).toHaveTitle(/Music/);
	});
});
