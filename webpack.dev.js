const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

// If you get deprecation errors or warnings in builds and want to trace where they come from, uncomment these
// process.traceDeprecation = true;
// process.traceWarnings = true;

// Typescript errors will be silenced if we do not add this plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',
	entry: './index.tsx',
	devtool: 'source-map',
	output: {
		filename: 'main.js',
		publicPath: '/',
		path: __dirname + '/dist/build/'
	},
	devServer: {
		compress: true,
		contentBase: ['./', './src', './node_modules']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{
				test: /\.ts|\.tsx$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: path.join(__dirname, 'node_modules'),
				include: __dirname,
			},
			{
				test: /.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000,
							name: '[name].[ext]'
						}
					}
				]
	        },
			{
				test: /\.css$/,
				include: [`${__dirname}/src/assets/styles`],
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							singleton: true
						}
					}
				],
				resolve: {
					symlinks: true
				}
			},
			{
				test: /\.scss$/,
				include: [`${__dirname}/src/assets/styles`],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							singleton: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true
						}
					}
				],
				resolve: {
					symlinks: true
				}
			}
		]
	}
});