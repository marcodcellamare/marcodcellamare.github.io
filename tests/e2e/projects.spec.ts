import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
	test('Should display correct title', async ({ page }) => {
		await page.goto('/#/projects');

		const heading = page.getByRole('heading', {
			name: /The Portfolio of Marco D\. Cellamare/,
		});
		await heading.waitFor({ state: 'visible' });
		await expect(page).toHaveTitle(/Projects/);
	});
});
