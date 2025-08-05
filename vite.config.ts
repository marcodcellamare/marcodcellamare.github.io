import { defineConfig, loadEnv } from 'vite';
import { aliases } from './vite.alias.ts';

import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

import dotenv from 'dotenv';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), ['VITE_']);
	const firebaseEnv = dotenv.config({ path: '.env.firebase' }).parsed || {};

	return {
		base: mode === 'production' ? '/' : './',
		plugins: [
			react(),
			tailwindcss(),
			tsconfigPaths(),
			VitePWA({
				devOptions: {
					enabled: mode !== 'production',
				},
				registerType: 'autoUpdate',
				workbox: {
					globPatterns: [
						'**/*.{js,css,html,svg,woff2,woff,ttf}',
						'**/optimized/**/*.{jpg,jpeg,png,avif,webp}',
					],
					maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
				},
			}),
			svgr(),
			visualizer({ open: false }),
		],
		define: {
			'process.env': {
				...env,
				...firebaseEnv,
			},
			'import.meta.env': {
				...env,
				...firebaseEnv,
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
			hmr: true,
		},
		resolve: {
			alias: aliases,
		},
		esbuild: {
			target: 'esnext',
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				format: {
					comments: false,
				},
			},
			rollupOptions: {
				output: {
					format: 'es',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('react-dom-server'))
								return 'server';
							if (id.includes('react-dom-client'))
								return 'client';
							if (id.includes('react-router')) return 'router';
							if (id.includes('framer-motion')) return 'motion';
							if (id.includes('firebase')) return 'firebase';
							if (id.includes('i18next')) return 'localization';
							if (id.includes('lucide-react')) return 'icons';
							if (id.includes('react-bootstrap-icons'))
								return 'icons';
							if (id.includes('culori')) return 'utils';

							return 'vendor';
						}
					},
				},
			},
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
	};
});
