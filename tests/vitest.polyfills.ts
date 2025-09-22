// ResizeObserver
class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
(global as any).ResizeObserver = ResizeObserver;

// IntersectionObserver
class IntersectionObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
	root = null;
	rootMargin = '';
	thresholds = [];
}
(global as any).IntersectionObserver = IntersectionObserver;

// matchMedia
import { vi } from 'vitest';
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

vi.mock('.*\\.css$', () => ({}));

// getComputedStyle safeguard
if (!global.getComputedStyle) {
	(global as any).getComputedStyle = () => ({
		getPropertyValue: () => '',
	});
}
