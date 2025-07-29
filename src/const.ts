import { PaletteType } from './types/config.const';

export const CHARACTERS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as const;
export const LOCALES = ['en-GB'] as const;
export const GROUPS = [
	'default',
	'demo',
	'about',
	'portfolio',
	'music',
	'contacts',
] as const;

export const PAGES = {
	about: '/',
	demo: '^/demo',
	portfolio: '/portfolio',
	portfolio_test: '^/portfolio/test',
	music: '/music',
	contacts: '/contacts',
} as const;

export const PALETTE = [
	'white',
	'light-gray',
	'light-gray2',
	'light-gray3',
	'gray',
	'dark-gray',
	'darker-gray',
	'red',
	'purple',
	'blue',
	'brown',
	'green',
	'yellow',
] as const;

export const THEMES: PaletteType[] = [
	'white',
	'light-gray',
	'light-gray2',
	'light-gray3',
	'gray',
	'dark-gray',
	'red',
	'purple',
	'blue',
	'brown',
	'green',
	'yellow',
] as const;

export const TEMPLATES = ['default', 'carousel'] as const;
