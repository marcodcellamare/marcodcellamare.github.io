// Add extra DOM matchers from jest-dom
import '@testing-library/jest-dom';

// Cleanup after each test to avoid leaks
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
	cleanup();
});

// Example: Mock fetch globally
import { vi } from 'vitest';
global.fetch = vi.fn();

// Example: Polyfill for matchMedia if your components use it
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
