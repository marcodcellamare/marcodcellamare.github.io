import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e', // Folder for Playwright tests
	testMatch: '**/*.spec.ts',
	timeout: 30 * 1000, // Max test time (30s)
	expect: {
		timeout: 5000, // Assertions timeout
	},
	fullyParallel: true, // Run tests in parallel
	retries: process.env.CI ? 2 : 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:5173', // App URL when running dev server
		headless: true,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'retain-on-failure', // Keep videos on failure
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},

	// For running against your Vite dev server
	webServer: {
		command: 'npm run dev',
		port: 5173,
		reuseExistingServer: !process.env.CI,
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
