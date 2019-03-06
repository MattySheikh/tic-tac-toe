const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Typescript errors will be silenced if we do not add this plugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var babelLoader = {
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
		presets: [
			['@babel/preset-env', {
				targets: {
					ie: '11'
				}
			}]
		]
	}
};

module.exports = {
	mode: 'production',
	entry: [path.resolve(__dirname + '/index.tsx')],
	devtool: 'eval',
	output: {
		globalObject: 'this',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.css$|\.scss$/,
				use: [{
						loader: MiniCssExtractPlugin.loader
					}, {
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true
						}
				}]
			},
      {
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [babelLoader, {
					loader: 'ts-loader',
					options: {
						transpileOnly: true
					}
				}]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [babelLoader]
			},
		]
	},
	plugins: [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new ForkTsCheckerWebpackPlugin()
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
		plugins: [
			new TsConfigPathsPlugin({
				configFile: __dirname + '/tsconfig.json'
			})
		],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	}
};
