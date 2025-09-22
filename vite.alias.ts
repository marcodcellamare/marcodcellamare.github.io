import path from 'path';

const r = (p: string) => path.resolve(__dirname, p);

export const aliases = {
	'@package': r('package.json'),
	'@config': r('src/config/index.ts'),
	'@const': r('src/config/const.ts'),
	'@/app': r('src/app'),
	'@/assets': r('src/assets'),
	'@/hooks': r('src/hooks'),
	'@/stores': r('src/stores'),
	'@/contexts': r('src/contexts'),
	'@/styles': r('src/styles'),
	'@/types': r('src/types'),
	'@/utils': r('src/utils'),
	'@/tests': r('tests'),
};
