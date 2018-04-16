const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    entry: {
        'kickstart-ui.min.js': options.paths.resolve('src/index.js'),
    },

    output: {
        filename: '[name]',
        path: options.paths.output.main,
        library: 'KickstartUI',
        libraryTarget: 'umd'
    },

    module: {
        rules: base.module.rules
    },

    externals: {
        vue: 'vue'
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'kickstart-ui.min.css'
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
        }),

        new webpack.BannerPlugin({
            banner: options.banner,
            raw: true,
            entryOnly: true
        })
    ]
};

module.exports = config;