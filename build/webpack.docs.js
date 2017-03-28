const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    entry: {
        'docs.bundle.js': options.paths.resolve('docs-src/index.js'),
        'docs.bundle.css': options.paths.resolve('docs-src/app.scss')
    },

	output: {
		filename: '[name]',
		path: options.paths.output.docs
	},

	resolve: base.resolve,

	module: {
    	rules: base.module.rules
	},

	plugins: [
		new ExtractTextPlugin({
			filename: 'docs.bundle.css'
		}),

		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),

		// Set the production environment
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),

		// Minify with dead-code elimination
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],

    stats: base.stats
};

module.exports = config;
