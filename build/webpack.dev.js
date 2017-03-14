'use strict';

const merge = require('deep-assign');
const path = require('path');
const options = require('./options');
const base = require('./webpack.base.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const serve = require('./serve');

const config = merge(base, {
	watch: true,
	devtool: '#eval-source-map',

	entry: {
        'docs.bundle.js': options.paths.resolve('docs-src/index.js'),
        'docs.bundle.css': options.paths.resolve('src/styles/app.scss')
	},

	output: {
		filename: '[name]',
		path: options.paths.output.docs
	},

	// proxy: {
	// 	"**": "http://127.0.0.1:9000"
	// },

	devServer: {
		contentBase: options.paths.output.docs,
		host: '127.0.0.1',
		port: 9000,
		historyApiFallback: true,
		noInfo: true,
		setup: serve
	},

    plugins: [
        new ExtractTextPlugin({
        	filename: 'docs.bundle.css'
        })
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
	scss: 'vue-style-loader!css-loader!sass-loader'
};

module.exports = config;
