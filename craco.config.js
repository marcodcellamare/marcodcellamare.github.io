const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig = {
				...webpackConfig,
				mode: env,
				resolve: {
					...webpackConfig.resolve,
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				},
				performance: {
					...webpackConfig.performance,
					hints: false,
					maxEntrypointSize: 512000,
					maxAssetSize: 512000
				},
				optimization: {
					...webpackConfig.optimization,
					minimize: true,
					runtimeChunk: env === 'production'
						? 'single'
						: false,
					splitChunks: env === 'production'
						? {
							...webpackConfig.splitChunks,
							chunks: 'all',
							maxInitialRequests: Infinity,
							minSize: 20000,
							maxSize: 200000,
							cacheGroups: {
								styles: {
									test: /\.scss$/,
									chunks: 'all',
									name: 'styles',
									enforce: true
								}
							}
						}
						: {}
				},
				plugins: [
					...webpackConfig.plugins,
					new PurgeCSSPlugin({
						paths: [
							paths.appHtml,
							...glob.sync(`${paths.appSrc}/**/*`,
								{ nodir: true })
						]
					})
				]
			}
			return webpackConfig;
		}
	}
};