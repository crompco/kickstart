const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const ContentRoutePlugin = require('./ContentRoutePlugin');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    entry: {
        'docs.bundle.js': options.paths.resolve('docs-src/index.js')
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
        new MiniCssExtractPlugin({
            filename: 'docs.bundle.css'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BUILD': JSON.stringify('docs')
        }),

        new VueLoaderPlugin(),

        new ContentRoutePlugin()
    ],

    stats: base.stats
};

module.exports = config;