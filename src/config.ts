import { GROUPS, LOCALES, PAGES, TEMPLATES, THEMES } from '!const';
import ConfigType from './types/config.type';

const config = {
	html: {
		whitelist: ['p', 'strong', 'em'],
	},

	locale: {
		allowed: {
			default: 'en-GB',
			list: LOCALES,
		},
		groups: {
			default: 'default',
			list: GROUPS,
		},
	},

	pages: {
		default: 'about',
		hide: '^',
		list: PAGES,
	},

	themes: {
		default: 'red',
		list: THEMES,
	},

	templates: {
		default: 'text:full',
		list: TEMPLATES,
	},

	meta: [
		{
			httpEquiv: 'Content-Security-Policy',
			content: [
				"default-src 'self'",
				"script-src 'self' https://www.googletagmanager.com https://apis.google.com",
				"connect-src 'self' https://firebase.googleapis.com https://region1.google-analytics.com",
				"style-src 'self' 'unsafe-inline'",
				"img-src 'self' data: https://www.googletagmanager.com",
				"font-src 'self'",
				"frame-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'self'",
				'upgrade-insecure-requests',
			],
		},
		{
			httpEquiv: 'X-Content-Type-Options',
			content: 'nosniff',
		},
		{
			httpEquiv: 'Permissions-Policy',
			content: 'geolocation=(), microphone=(), camera=()',
		},
		{
			name: 'referrer',
			content: 'strict-origin-when-cross-origin',
		},
		{
			name: 'robots',
			content: 'index, follow',
		},
	],

	preload: [
		{ rel: 'dns-prefetch', href: 'https://apis.google.com' },
		{ rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
		{ rel: 'dns-prefetch', href: 'https://firebase.googleapis.com' },
		{ rel: 'dns-prefetch', href: 'https://region1.google-analytics.com' },
		{
			rel: 'dns-preconnect',
			href: 'https://apis.google.com',
			crossorigin: 'anonymous',
		},
		{
			rel: 'preconnect',
			href: 'https://www.googletagmanager.com',
			crossorigin: 'anonymous',
		},
		{
			rel: 'preconnect',
			href: 'https://firebase.googleapis.com',
			crossorigin: 'anonymous',
		},
		{
			rel: 'preconnect',
			href: 'https://region1.google-analytics.com',
			crossorigin: 'anonymous',
		},
	],
} satisfies ConfigType;

export default config;
