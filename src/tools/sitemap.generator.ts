import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { PAGES } from '@const';
import pkg from '@package';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = '../../';
const publicDir = path.join(__dirname, rootDir, 'public');
const date = new Date();

const sitemapEntries = Object.values(PAGES)
	.map(
		(path) =>
			`<url>` +
			`<loc lastmod="${
				date.toISOString().split('T')[0]
			}" priority="0.8">` +
			`${pkg.homepage}/#${path.replace('^', '')}` +
			`</loc>` +
			`</url>`
	)
	.join('');

const sitemap =
	`<?xml version="1.0" encoding="UTF-8"?>` +
	`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
	`${sitemapEntries}` +
	`</urlset>`;

writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

console.log('✅ sitemap.xml generated');
