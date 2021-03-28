const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		index: path.resolve(__dirname, 'src', 'index.js')
	},
	output: {
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html')
		})
	]
};