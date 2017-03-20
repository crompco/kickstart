'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: {
        KsAutocomplete: ['./src/components/KsAutocomplete.vue']
    },

    output: {
        path: options.paths.output.lib,
        filename: options.isProduction ? '[name].min.js' : '[name].js',
        library: ['KickstartUI', '[name]'],
        libraryTarget: 'umd'
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
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
    scss: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
    })
};

module.exports = config;
