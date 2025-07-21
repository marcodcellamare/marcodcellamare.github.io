import path from 'path';

const r = (p: string) => path.resolve(__dirname, p);

export const aliases = {
	'@package': r('package.json'),
	'@config': r('src/config.ts'),
	'@const': r('src/const.ts'),
	'@/app': r('src/app'),
	'@/assets': r('src/assets'),
	'@/hooks': r('src/hooks'),
	'@/contexts': r('src/contexts'),
	'@/styles': r('src/styles'),
	'@/types': r('src/types'),
	'@/utils': r('src/utils'),
};
