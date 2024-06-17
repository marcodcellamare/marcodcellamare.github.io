//const WebpackObfuscator = require('webpack-obfuscator');

module.exports = function override(config, env) {
	const development = process.env.PRODUCTION === '0' || process.env.PRODUCTION === 0;

	/*
	config.plugins = [
		...config.plugins,
		!development
			? new WebpackObfuscator({
				rotateStringArray: true
			})
			: false
	];
	*/
	config.performance = {
		...config.performance,
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	};
	config.optimization = {
		...config.optimization,
		runtimeChunk: !development
			? 'single'
			: false,
		splitChunks: !development
			? {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 20000,
				maxSize: 200000,
			}
			: {}
	};
	return config;
}