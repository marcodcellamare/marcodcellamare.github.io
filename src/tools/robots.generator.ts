import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import pkg from '@package';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = '../../';
const publicDir = path.join(__dirname, rootDir, 'public');

const robots = [
	'# https://www.robotstxt.org/robotstxt.html',
	'User-agent: *',
	'Disallow:',
	`Sitemap: ${pkg.homepage}/sitemap.xml`,
].join('\n');

writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log('✅ robots.txt generated');
