export const LOCALES = ['en-GB'] as const;

export const GROUPS = ['default', 'about', 'portfolio', 'contacts'] as const;

export const PAGES = {
	about: '/',
	portfolio: '/portfolio',
	portfolio_test: '^/portfolio/test',
	music: '/music',
	contacts: '/contacts',
} as const;

export const THEMES = [
	'light-gray',
	'gray',
	'dark-gray',
	'red',
	'purple',
	'brown',
	'green',
	'yellow',
] as const;

export const TEMPLATES = [
	'full-content',
	'left-content',
	'right-content',
	'full-image',
	'left-content-image',
	'right-content-image',
] as const;

export type LocaleType = (typeof LOCALES)[number];
export type GroupType = (typeof GROUPS)[number];
export type PageIdType = keyof typeof PAGES;
export type ThemeType = (typeof THEMES)[number];
export type TemplateType = (typeof TEMPLATES)[number];
